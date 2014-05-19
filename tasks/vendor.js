var fs     = require('fs'),
    gulp   = require('gulp'),
    es     = require('event-stream'),
    concat = require('gulp-concat');

/**
 * Build vendor, Concat and build our dependencies
 */
module.exports = function() {

    "use strict";

    var bowerDep = './node_modules';

    return es.concat(
      gulp.src([
        bowerDep + '/jquery/dist/jquery.js',
        bowerDep + '/lodash/dist/lodash.js',
        bowerDep + '/backbone/backbone.js',
        bowerDep + '/moment/moment.js',
        bowerDep + '/swiftclick/js/libs/swiftclick.js'
      ])
        .pipe(concat("vendor.min.js"))
        .pipe(gulp.dest('build/js')),
      gulp.src(bowerDep + '/normalize-css/normalize.css')
        .pipe(gulp.dest('build/styles'))
    );
};