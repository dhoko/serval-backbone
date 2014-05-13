var fs     = require('fs'),
    gulp   = require('gulp'),
    es     = require('event-stream'),
    concat = require('gulp-concat');


/**
 * Read a file and convert it to JSON
 * @param  {String} file FileName
 * @return {Object}      JSON
 */
var readJson = function(file) {
    var src = fs.readFileSync(file, 'utf8', function (err,data) {
        if (err) {
            throw err;
        }
        return data;
    });
    return JSON.parse(src);
};

/**
 * Build vendor, Concat and build our dependencies
 */
module.exports = function() {

    "use strict";

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
};