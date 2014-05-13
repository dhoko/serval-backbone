var gulp   = require('gulp'),
    concat = require("gulp-concat");

/**
 * Concat our CSS
 */
module.exports = function() {

    "use strict";

    gulp.src('./src/styles/*.css')
      .pipe(concat('main.css'))
      .pipe(gulp.dest('./build/styles/'));
};