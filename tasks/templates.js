var gulp     = require('gulp'),
    concat   = require("gulp-concat")
    es       = require('event-stream')
    partials = require('gulp-partial-to-script')
    streamqueue = require('streamqueue');

module.exports = function() {
    "use strict";

    // Thanks to https://github.com/gulpjs/gulp/issues/82. Without es.concat, we have to do CTRL S to times to have the valid view.
    // return es.merge(
    //     gulp.src([
    //       './src/layout/header.html',
    //       './src/layout/body.html'
    //     ]),
    //     gulp.src('./src/partials/**/*.html').pipe(partials()),
    //     gulp.src([
    //       './src/layout/footer.html',
    //     ])
    // )
    //     .pipe(concat('index.html'))
    //     .pipe(gulp.dest('./build'));

    // return es.merge(
    //     gulp.src([
    //       './src/layout/header.html',
    //       './src/layout/body.html'
    //     ]),
    //     gulp.src('./src/partials/**/*.html').pipe(partials()),
    //     gulp.src([
    //       './src/layout/footer.html',
    //     ])
    // )
    //     .pipe(concat('index.html'))
    //     .pipe(gulp.dest('./build'));


    return gulp.src([
        './src/layout/header.html',
        './src/layout/body.html',
        './build/templates.html',
        './src/layout/footer.html'
      ])
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./build'));
        // .pipe(livereload(server));

};