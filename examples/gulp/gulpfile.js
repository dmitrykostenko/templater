var gulp = require('gulp'),
    templater = require('../../src/templater.gulp.js'),
    rename = require('gulp-rename');

gulp.task('template-build', function() {
    gulp.src('./demo.html')
        .pipe(templater({
            templates: {
                'panel': '<div class="panel"><customBtn></customBtn><div class="panel-heading">{{heading}}</div><div class="panel-body">{{html}}</div></div>',
                'customBtn': '<a href="#">Link</a>'
            }
        }))
        .pipe(rename({suffix: '-build'}))
        .pipe(gulp.dest(''));
});

gulp.task('default', ['template-build']);