var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');

var $ = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss'
];

// Scripts
gulp.task('scripts', function(cb) {
  return gulp.src(['./js'])
  pump([
        gulp.src('js/*.js'),
        uglify(),
        gulp.dest('js')
    ],
    cb
  );
  return gulp.src(['./js/jquery.min.js', './js/foundation.min.js', './js/main.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./js'));
});

// Styles
gulp.task('sass', function() {
  return gulp.src('_scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass','scripts'], function() {
  gulp.watch(['_scss/**/*.scss'], ['sass']);
});
