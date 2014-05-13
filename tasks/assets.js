var gulp = require('gulp');

/**
 * Move assets to build
 */
module.exports = function() {
    "use strict";

    gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./build/assets/'));
};