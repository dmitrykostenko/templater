var gulp = require('gulp'),
    mochaPhantomJS = require('gulp-mocha-phantomjs'),
    uglify = require('gulp-uglify-es').default,
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    templater = require('./templater.gulp.js'),
    amountOfStages = 10;

for (var i = 1; i < amountOfStages; i++) {
    (function () {
        var j = i;
        gulp.task('test-stage-' + j, function () {
            return gulp
                .src('spec/stage-' + j + '/index.html')
                .pipe(mochaPhantomJS());
        });
    })();
}

var path = {
    build: {
        js: 'build/',
    },
    src: {
        js: 'src/templater.js',
    },
    demo: {
        html: 'src/demo.html',
    }
};

gulp.task('js', function () {
    gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
});

gulp.task('tmpl-build', function() {
    gulp.src('./demo/src/template.html')
        .pipe(templater({
            tags: {
                'panel': '<div class="panel"><customBtn></customBtn><div class="panel-heading">{{heading}}</div><div class="panel-body">{{html}}</div></div>',
                'customBtn': '<a href="#">Link</a>'
            }
        }))
        .pipe(rename({suffix: '-build'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['js', 'tmpl-build']);

gulp.task('default', ['js', 'tmpl-build']);

