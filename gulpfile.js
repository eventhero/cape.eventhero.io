var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var del = require('del');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('clean', function(callback) {
    del(['./public/**/*'], function(err, deletedFiles) {
        console.log('Files deleted:', deletedFiles.join(', '));
        callback();
    });
});

gulp.task('js', function() {
    return gulp.src([
        path.join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.js'),
        path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js', 'bootstrap.js'),
        path.join(__dirname, 'src', 'application.js')
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('application.js'))
        .pipe(gulp.dest('./public'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/min'));
});

gulp.task('css', function() {
    return gulp.src('./src/application.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [path.join(__dirname, 'node_modules', 'bootstrap', 'less')]
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('./public'))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/min'));
});

gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./public'));
});

gulp.task('build', ['css', 'js', 'html']);
gulp.task('watch', function() {

});
gulp.task('default', ['build']);

// TODO: integrate https://github.com/darcyclarke/DSS to generate styleguide
