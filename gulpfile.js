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
var s3 = require("gulp-s3-deploy");

require('dotenv').load();

var config = {
  dest: './dest'
};

gulp.task('js', function () {
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

gulp.task('css', function () {
  return gulp.src('./src/application.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [
        path.join(__dirname, 'node_modules', 'bootstrap', 'less'),
        path.join(__dirname, 'node_modules', 'font-awesome', 'less')
      ]
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: true
    }))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest));
});

gulp.task('fonts', function () {
  return gulp.src(['node_modules/bootstrap/dist/fonts/*', 'node_modules/font-awesome/fonts/*'])
    .pipe(gulp.dest(config.dest + '/fonts'))
});

gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest(config.dest));
});

gulp.task('serve', ['fonts', 'css', 'js', 'html'], function () {
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

gulp.task('clean', function (callback) {
  del([config.dest + '/**/*']).then(function (deletedFiles) {
    gutil.log('Files deleted:\n', deletedFiles.join('\n'));
  }).then(function () { callback()});
});

var s3Credentials = {
  "key": process.env.AWS_ACCESS_KEY_ID,
  "secret": process.env.AWS_SECRET_ACCESS_KEY,
  "bucket": process.env.AWS_S3_BUCKET,
  "region": process.env.AWS_S3_REGION
};

gulp.task('build', ['fonts', 'css', 'js', 'html']);

gulp.task('deploy', ['build'], function () {
  var version = require('./package.json').version;
  var buildNumber = (process.env.CI_COMMIT_ID && process.env.CI_COMMIT_ID.slice(0,7)) || '0';
  return gulp.src([config.dest + '/**/*'])
    .pipe(s3(s3Credentials, {
      uploadPath: '/' + version + '.' + buildNumber + '/assets/',
      headers: { 'Cache-Control': 'max-age=315360000, no-transform, public' }
    }));
});

gulp.task('default', ['serve']);
