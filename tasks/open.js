var gulp  = require('gulp'),
    opn = require("gulp-open");

/**
 * Update the manifest for an app
 * It will generate a new codename and also set our env for the prod zip
 */
module.exports = function() {
    "use strict";

    // Open Google Chrome @ localhost:8080
    gulp.src('./build/index.html')
      .pipe(opn("",{
        // app:"google-chrome",
        app:"/usr/lib/chromium/chromium",
        url: "http://localhost:8080/build/"
     }));
};