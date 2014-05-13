"use strict";

var path       = require('path'),
    es         = require('event-stream'),
    express    = require('express'),
    bodyParser = require('body-parser'),
    tinylr     = require('tiny-lr'),
    gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    concat     = require("gulp-concat"),
    partials   = require('gulp-partial-to-script'),
    livereload = require('gulp-livereload'),
    server     = tinylr(),
    openBrowser = require('./tasks/open');

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

        watchThemAll(["./src/js/**/*"], ["scripts"],true);
        watchThemAll("./src/styles/*", ["styles"],true);
        watchThemAll("./i18n/**/*.yml", ["i18n"],true);
        watchThemAll(["./src/layout/**/*","./src/partials/**/*"], ["templates"]);
    });

});

// Concatenate your partials and append them to index.html
// We cannot put this inside a file yet :/ Fuckig watch task, it doesn't work...
gulp.task('templates', function() {
  // Thanks to https://github.com/gulpjs/gulp/issues/82. Without es.concat, we have to do CTRL S two times to have the valid view.
    return es.merge(
        gulp.src([
        './src/layout/header.html',
        './src/layout/body.html'
        ]),
        gulp.src('./src/partials/**/*.html').pipe(partials()),
        gulp.src([
        './src/layout/footer.html',
        ])
    )
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./build'))
    .pipe(livereload(server));
});

// Build my css
gulp.task('styles', require('./tasks/styles'));

// Build our assets
gulp.task('assets',require('./tasks/assets'));

// Build your vendors
gulp.task('vendor', require("./tasks/vendor"));

// Concatenate your app and build an app.js
gulp.task('scripts', require('./tasks/app'));

// Create i18n file for the app
gulp.task("i18n",require("./tasks/i18n"));

// Generate your documentation using docker
gulp.task('doc', function(){
  var spawn = require('child_process').spawn;
  spawn('docker', ['-i','./src','-x','vendor','-n'], {stdio: 'inherit'});
});