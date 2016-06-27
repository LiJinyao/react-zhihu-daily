var gulp       = require("gulp");
var babel      = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");

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

gulp.task('babel', babelIt);
