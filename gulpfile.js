var gulp = require('gulp'),
    mochaPhantomJS = require('gulp-mocha-phantomjs'),
    uglify = require('gulp-uglify-es').default,
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
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

gulp.task('build', ['js']);

gulp.task('default', ['js']);

