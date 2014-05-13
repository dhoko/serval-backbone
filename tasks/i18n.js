var path    = require("path"),
    gulp    = require('gulp'),
    concat  = require("gulp-concat"),
    convert = require('gulp-convert'),
    tap     = require('gulp-tap');

/**
 * Build a languages.json from our Yaml files from
 * the directory i18n
 *
 * Each file must respect this convetion
 * i18n/lang-LANG.yml
 *
 * Than just a file with key value
 */
module.exports = function() {

    "use strict";
    gulp.src('./i18n/*.yml')
        .pipe(tap(function (file) {
            // Create a yaml beggining with the language to have an object lang-Lang: {key;value}
            file.contents = new Buffer(path.basename(file.path,".yml") + ":\n" +String(file.contents).replace(/^/gm,"  "));
        }))
        .pipe(concat('languages.yml'))
        .pipe(convert({
            from: "yml",
            to: "json"
        }))
        .pipe(concat('languages.json'))
        .pipe(gulp.dest("./i18n/"));
};