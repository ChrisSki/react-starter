var gulp = require('gulp');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var filter = require('gulp-filter');
var sass = require('gulp-sass');
var source = require("vinyl-source-stream");
var sourcemaps = require("gulp-sourcemaps");
var reactify = require('reactify');
var watchify = require('watchify');

gulp.task('sync', function () {
  return browserSync({
    server: {
      baseDir: './'
    }
  })
});

gulp.task('browserify', function(){
  var b = browserify();
  b.transform(reactify); // use the reactify transform
  b.add('./index.js');
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('css', function () {
  return gulp.src('./src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: false,
      sourceComment: 'normal',
      onError: function(err) {
        console.log(err);
      }
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'))
    .pipe(filter('**/*.css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('run', ['browserify', 'css', 'sync'], function () {
  gulp.watch('./src/js/*.jsx', ['browserify']);
  gulp.watch('./src/scss/*.scss', ['css']);
});

