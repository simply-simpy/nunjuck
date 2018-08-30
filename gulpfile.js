const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const connect = require('gulp-connect');

gulp.task('nunjuckTask', function () {
  return gulp.src('src/templates/*.html')
    .pipe(nunjucksRender({
      path: ['src/templates/']
    }))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('child/dist'))
    .pipe(connect.reload())
});

gulp.task('moveSourceTask', function () {
  return gulp.src('src/**/**')
    .pipe(gulp.dest('child/src'));
});

gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 8000
  });
});

gulp.task('watch', function(){
  return gulp.watch('src/templates/**/*', gulp.series('nunjuckTask', 'moveSourceTask'));
});

gulp.task('default', gulp.parallel('connect','nunjuckTask', 'moveSourceTask', 'watch', function (done) {
  done();
}));

