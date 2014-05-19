var path        = require('path'),
    express     = require('express'),
    bodyParser  = require('body-parser'),
    tinylr      = require('tiny-lr'),
    gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    concat      = require("gulp-concat"),
    partials    = require('gulp-partial-to-script'),
    livereload  = require('gulp-livereload'),
    server      = tinylr(),
    openBrowser = require('./tasks/open'),
    streamqueue = require('streamqueue'),
    watchify    = require("watchify"),
    source      = require('vinyl-source-stream');

/**
 * Create a watcher for a glob it can activate livereload too
 * @param  {Glob} path
 * @param  {Array} task  Task to launch
 * @param  {Boolean} watch Activate a watch for livereloadq
 */
function watchThemAll(path, task, watch) {
    var watcher = gulp.watch(path,task);
    if(watch) {
        watcher.on("change", function(file) {
            gutil.log('File updated', gutil.colors.yellow(file.path));
            livereload(server).changed(file.path);
        });
    }
}

// Default task : Open url, lauch server, livereaload
gulp.task('default',['assets','vendor','templates','scripts','styles','i18n'], function() {

  // Open Google Chrome @ localhost:8080
    openBrowser();

    var app = express();

    app.use(bodyParser());
    app.use(express.static(path.resolve('./')));
    app.listen(8080, function() {
      gutil.log('Listening on', 8080);
    });

    // Proxy for our request
    app.all("/apitest", function(req,res) {
        console.log();
        console.log(req.body);
        console.log();
        res.send(201);
    });

    // Livereload listener
    server.listen(35729, function (err) {
        if (err) {
            throw err;
        }

        watchThemAll("./src/styles/*", ["styles"],true);
        watchThemAll("./i18n/**/*.yml", ["i18n"],true);
        watchThemAll(["./src/layout/**/*","./src/partials/**/*"], ["templates"]);
    });

});

// Concatenate your partials and append them to index.html
gulp.task('templates', function() {

    var stream = streamqueue({objectMode: true});

    stream.queue(gulp.src([
        './src/layout/header.html',
        './src/layout/body.html'
    ]));
    stream.queue(gulp.src('./src/partials/**/*.html').pipe(partials()));
    stream.queue(gulp.src('./src/layout/footer.html'));

    return stream.done()
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./build'))
        .pipe(livereload(server));
});

// Concatenate your app and build an app.js
gulp.task('scripts', function() {
    var bundler = watchify('./src/js/app.js');

    bundler.on('update',rebundle);

    function rebundle(file) {

        if(file) {
            file.map(function (fileName) {
                gutil.log('File updated', gutil.colors.yellow(fileName));
            });
        }

        // Create sourceMap for dev
        return bundler
            .bundle({
                debug: (gutil.env.type !== 'prod')
            })
            .pipe(source("app.js"))
            .pipe(gulp.dest('./build/js'))
            .pipe(livereload(server));
    }

    return rebundle();
});

// Build my css
gulp.task('styles', require('./tasks/styles'));

// Build our assets
gulp.task('assets',require('./tasks/assets'));

// Build your vendors
gulp.task('vendor', require("./tasks/vendor"));

// Create i18n file for the app
gulp.task("i18n",require("./tasks/i18n"));

// Generate your documentation using docker
gulp.task('doc', function(){
  var spawn = require('child_process').spawn;
  spawn('docker', ['-i','./src','-x','vendor','-n'], {stdio: 'inherit'});
});


// Set our env to production
gulp.task('env', function(){
    gutil.env.type = 'prod';
});
// Prod all the things !
gulp.task('prod',['env','assets','vendor','templates','scripts','styles','manifest','i18n'], function() {
    gulp.start("doc");
});