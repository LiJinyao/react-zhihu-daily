var gulp             = require("gulp");
var babel            = require("gulp-babel");
var sourcemaps       = require("gulp-sourcemaps");
var eslint           = require("gulp-eslint");
var webpack          = require("webpack");
var productionConfig = require("./webpack.production.config");
/*
* compile server code to ES5
*/
function buildServer(cb) {
  return gulp.src('server/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/zhihuDaily'));
}

function lintServerCode(cb) {
  return gulp.src('server/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
}

function lintFrontendCode(cb) {
  return gulp.src('src/**/*.jsx')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
}

function buildFrontend(cb) {
  return webpack(productionConfig).run((err, stats) => {
    err && console.log('Error', err);
    stats && console.log(stats.toString({ colors: true, chunks: false, children: false}));
    cb && cb();
  });
}

gulp.task('buildServer', buildServer);
gulp.task('lint', lintServerCode);
gulp.task('lintapp', lintFrontendCode);
gulp.task('buildFrontend', buildFrontend);
gulp.task('build', ['buildServer', 'buildFrontend']);
