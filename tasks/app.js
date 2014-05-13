var gulp   = require('gulp'),
    concat = require("gulp-concat");

/**
 * Create a single file app.js
 */
module.exports = function() {
    "use strict";

    return gulp.src([
        './src/js/bootstrap.js',
        './src/js/models/**/*.js',
        './src/js/collections/**/*.js',
        './src/js/views/**/*.js',
        './src/js/routers/*.js',
        './src/js/app.js',
        './src/js/events/**/*.js',
      ])
      .pipe(concat('app.js'))
      .pipe(gulp.dest('./build/js'));
};