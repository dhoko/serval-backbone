var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    watchify   = require("watchify"),
    source     = require('vinyl-source-stream');
    livereload = require('gulp-livereload');

/**
 * Create a single file app.js
 */
module.exports = function(server) {

    // Concatenate your app and build an app.js
    var bundler = watchify('./src/js/app.js');

    bundler.on('update',rebundle);

    function rebundle(file) {

        if(file) {
            file.map(function (fileName) {
                gutil.log('File updated', gutil.colors.yellow(fileName));
            });
        }

        return bundler
            .bundle({
                debug: (gutil.env.type !== 'prod')
            })
            .pipe(source("app.js"))
            .pipe(gulp.dest('./build/js'))
            .pipe(livereload(server));
    }

    return rebundle();
};