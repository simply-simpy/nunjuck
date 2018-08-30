const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const connect = require('gulp-connect');
const sass = require('gulp-sass');

gulp.task('nunjuckTask', function () {
  return gulp.src(['src/templates/*.html', '!src/templates/_*.html'])
    .pipe(nunjucksRender({
      path: ['src/templates/']
    }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
});

gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 8000
  });
});

gulp.task('sass', function () {
  return gulp.src('./src/templates/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});


gulp.task('js', function() {
  return gulp.src('src/templates/js/**/**')
    .pipe(gulp.dest('dist/js'))
});

gulp.task('watch', function(){
  return gulp.watch('src/templates/**/*', gulp.series('nunjuckTask'));
});

gulp.task('sass:watch', function () {
  return gulp.watch('src/templates/scss/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.parallel('connect','nunjuckTask', 'sass', 'js', 'watch', 'sass:watch'), function (done) {
  done();
});

