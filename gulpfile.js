var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var del = require('del');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var config = {
    dest: './versions/latest'
};

gulp.task('js', function() {
    return gulp.src([
        path.join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.js'),
        path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js', 'bootstrap.js'),
        path.join(__dirname, 'src', 'application.js')
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('application.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest));
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
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest));
});

gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest(config.dest));
});

gulp.task('serve', ['css', 'js', 'html'], function() {
    // watch for sources and recompile
    gulp.watch('./src/*.js', ['js']);
    gulp.watch('./src/*.less', ['css']);
    gulp.watch('./src/*.html', ['html']);

    // start development web server
    browserSync({
        server: {
            baseDir: config.dest + '/'
        },
        files: config.dest + '/**.+(html|js|css|png|jpeg)',
        online: false, // no online features needed, but improve startup time
        logFileChanges: true
    });
    // watch for compiled files and reload browser
    gulp.watch(config.dist + '/*.*').on('change', reload);
});

gulp.task('clean', function(callback) {
    del([config.dest + '/**/*'], function(err, deletedFiles) {
        gutil.log('Files deleted:\n', deletedFiles.join('\n'));
        callback();
    });
});

gulp.task('build', ['clean', 'css', 'js', 'html'], function(callback) {
    var pkg = require('./package.json');
    var version = pkg.version;
    // copy versions/latest to versions/{version} or fail if target dir already exists
    return gulp.src([config.dest + '/**/*'])
        .pipe(gulp.dest('./versions/' + version));
});

gulp.task('default', ['serve']);
