var gulp        = require('gulp'),
    concat      = require("gulp-concat"),
    partials    = require('gulp-partial-to-script'),
    streamqueue = require('streamqueue'),
    livereload  = require('gulp-livereload');

module.exports = function(server) {
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
};