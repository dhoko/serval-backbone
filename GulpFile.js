"use strict";

var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    express    = require('express'),
    path       = require('path'),
    tinylr     = require('tiny-lr'),
    gopen      = require("gulp-open"),
    concat     = require("gulp-concat"),
    partials   = require('gulp-partial-to-script'),
    fs         = require('fs'),
    es         = require('event-stream'),
    livereload = require('gulp-livereload'),
    archiver   = require('archiver'),
    server     = tinylr(),
    convert    = require('gulp-convert'),
    jeditor    = require("gulp-json-editor");

// Open a file and return a JSON
var readJson = function(file) {
  var src = fs.readFileSync(file, 'utf8', function (err,data) {
    if (err) {
      throw err;
    }
    return data;
  });
  return JSON.parse(src);
};

// Default task : Open url, lauch server, livereaload
gulp.task('default',['assets','vendor','templates','scripts','styles','i18n'], function() {

  // Open Google Chrome @ localhost:8080
  gulp.src('./build/index.html')
    .pipe(gopen("",{
      // app:"google-chrome",
      app:"/usr/lib/chromium/chromium",
      url: "http://localhost:8080/build/"
   }));

    var app = express();
    app.use(express.static(path.resolve('./')));
    app.listen(8080, function() {
      gutil.log('Listening on', 8080);
    });

    server.listen(35729, function (err) {
        if (err) {
            throw err;
        }

        gulp.watch(["./src/js/**/*","./i18n/*"], ["scripts"]);
        gulp.watch(["./src/layout/**/*","./src/partials/**/*"], ["templates"]);
        gulp.watch("./src/styles/*", ["styles"]);
        gulp.watch("./src/vendor/**/*", ["vendor"]);
        gulp.watch("./i18n/**/*.yml", ["i18n"]);

    });

});

// Build my css
gulp.task('styles', function() {
  gulp.src('./src/styles/*.css')
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./build/styles/'))
    .pipe(livereload(server));
});

// Build my css
gulp.task('assets', function() {
  gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./build/assets/'));
});

// Concatenate your partials and append them to index.html
gulp.task('templates', function() {
  // Thanks to https://github.com/gulpjs/gulp/issues/82. Without es.concat, we have to do CTRL S to times to have the valid view.
  return es.concat(
    gulp.src('./src/partials/**/*.html')
      .pipe(partials())
      .pipe(concat('templates.html'))
      .pipe(gulp.dest('./build'))
  ).on("end", function() {
    gulp.src([
      './src/layout/header.html',
      './src/layout/body.html',
      './build/templates.html',
      './src/layout/footer.html',
    ])
      .pipe(concat('index.html'))
      .pipe(gulp.dest('./build'))
      .pipe(livereload(server));
  });
});
// Build your vendors
gulp.task('vendor', function(){

  var bowerDep = './' + readJson('./.bowerrc').directory;

  return es.concat(
    gulp.src([
      bowerDep + '/jquery/dist/jquery.js',
      bowerDep + '/lodash/dist/lodash.js',
      bowerDep + '/backbone/backbone.js',
      bowerDep + '/momentjs/moment.js',
      bowerDep + '/swiftclick/js/libs/swiftclick.js'
    ])
      .pipe(concat("vendor.min.js"))
      .pipe(gulp.dest('build/js')),
    gulp.src(bowerDep + '/normalize-css/normalize.css')
      .pipe(gulp.dest('build/styles'))
  );

});

// Concatenate your app and build an app.js
gulp.task('scripts', function(){
  gulp.src([
      './src/js/bootstrap.js',
      './src/js/events/**/*.js',
      './src/js/models/**/*.js',
      './src/js/collections/**/*.js',
      './src/js/views/**/*.js',
      './src/js/routers/*.js',
      './src/js/app.js',
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe(livereload(server));
});

// Create i18n file for the app
gulp.task("i18n", function() {
    gulp.src('./i18n/*.yml')
        .pipe(concat('languages.yml'))
        .pipe(convert({
            from: "yml",
            to: "json"
        }))
        .pipe(concat('languages.json'))
        .pipe(gulp.dest("./i18n/"))
        .pipe(livereload(server));
});

// Generate your documentation using docker
gulp.task('doc', function(){
  var spawn = require('child_process').spawn;
  spawn('docker', ['-i','./src','-x','vendor','-n'], {stdio: 'inherit'});
});
