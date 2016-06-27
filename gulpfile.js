var gulp       = require("gulp");
var babel      = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var eslint     = require("gulp-eslint");

/*
* compile server code to ES5
*/
function babelIt(cb) {
  return gulp.src('server/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/server'));
}

function lintServerCode(cb) {
  return gulp.src('server/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());

}

gulp.task('babel', babelIt);
gulp.task('lint', lintServerCode);
