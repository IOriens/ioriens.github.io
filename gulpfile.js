const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const browserSync = require('browser-sync').create()
const jsonminify = require('gulp-jsonminify')
const img64Html = require('gulp-img64-html')

const commonTasks = ['html', 'json', 'assets']

gulp.task('html', function () {
  return gulp
    .src('src/index.html')
    .pipe(
      img64Html({
        ignoreExternal: true // will skip http & https
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: { compress: true }
      })
    )
    .pipe(gulp.dest('.', { overwrite: true }))
    .pipe(browserSync.stream())
})

gulp.task('json', function () {
  return gulp
    .src('./src/*.json')
    .pipe(jsonminify())
    .pipe(gulp.dest('.'))
    .pipe(browserSync.stream())
})

gulp.task('assets', function () {
  gulp.src('./src/assets/**').pipe(gulp.dest('assets'))
})

gulp.task('dev', commonTasks, function () {
  browserSync.init({
    server: './'
  })
  gulp.watch('src/*.html', ['html'])
  gulp.watch('src/*.json', ['json'])
})

gulp.task('build', commonTasks)

gulp.task('default', ['build'])
