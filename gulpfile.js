var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var del = require('del');

gulp.task('clean', function(callback) {
    del(['./public/**/*'], function (err, deletedFiles) {
        console.log('Files deleted:', deletedFiles.join(', '));
        callback();
    });
});

gulp.task('default', function() {
    return gulp.src('./src/application.less')
        .pipe(less({
            paths: [path.join(__dirname, 'node_modules', 'bootstrap', 'less')]
        }))
        .pipe(gulp.dest('./public'));
});
