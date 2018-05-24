var gulp = require('gulp'),
    mochaPhantomJS = require('gulp-mocha-phantomjs'),
    uglify = require('gulp-uglify'),
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
    },
    production: {
        production: 'production'
    }
};

/* build js*/

gulp.task('js', function () {
    gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        //.pipe(browserSync.stream());
});

/* task */

gulp.task('build', ['js']);

/* production */

gulp.task('production', ['sassProduction', 'cleanProduction'], function() {
    gulp.src(['./**/*',
        '!src/**/*',
        '!src/',
        '!bower/',
        '!bower/**/*',
        '!node_modules/**/*',
        '!node_modules/',
        '!build/**.map',
        '!.bowerrc',
        '!bower.json',
        '!.gitignore',
        '!gulpfile.js',
        '!LICENSE',
        '!package.json',
        '!production',
        '!README.md'
    ])
        .pipe(gulp.dest('production'));
});

gulp.task('cleanProduction', function() {
    return gulp.src('production', { read: false })
        .pipe(rimraf());
});

gulp.task('default', ['js']);

