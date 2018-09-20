const gulp = require('gulp');
const eslint = require('gulp-eslint');
const eslintIfFixed = require('gulp-eslint-if-fixed');

const GLOB_APP = './src/**/*.js';
const GLOB_FIXED_DEST = './src';

const isFixed = (file) => {
  return file.eslint != null && file.eslint.fixed;
};

gulp.task('eslint', () => {
  const hasFixFlag = (process.argv.slice(2).indexOf('--fix') >= 0);

  return gulp.src(GLOB_APP)
    .pipe(eslint({
      fix: hasFixFlag
    }))
    .pipe(eslint.format())
    .pipe(eslintIfFixed(GLOB_FIXED_DEST))
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['eslint']);
