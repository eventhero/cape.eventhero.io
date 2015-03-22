var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var del = require('del');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function(callback) {
    del(['./public/**/*'], function (err, deletedFiles) {
        console.log('Files deleted:', deletedFiles.join(', '));
        callback();
    });
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

gulp.task('build', ['css']);
gulp.task('watch', function(){

});
gulp.task('default', ['build']);

// TODO: integrate https://github.com/darcyclarke/DSS to generate styleguide
