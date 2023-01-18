const { src, dest, parallel, series, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const pug = require("gulp-pug");
const browserSync = require("browser-sync").create();
const purgecss = require('gulp-purgecss');

const browserSyncJob = () => {
  browserSync.init({
    server: "build/",
    open: false
  });

  watch("app/scss/**/*.scss", buildSass);
  watch("app/pug/**/*.pug", buildPug);
  watch("node_modules/bootstrap/dist/js/bootstrap.min.js", copyBootstrapJS);
  watch(["node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff", "node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2"], copyBootstrapIcons);
};

const buildSass = () => {
  console.log("Компиляция SASS");

  return src("app/scss/*.scss")
    .pipe(sass({
      outputStyle: "expanded"
    }))
    .pipe(dest("app/css/"))
    .pipe(browserSync.stream());
};

const purgeCSS = () => {
  console.log("запуск PurgeCSS");

  return src("app/css/*.css")
  .pipe(purgecss({
    content: ["build/*.html"],
    variables: true
}))
.pipe(dest('build/css'))
};

const buildPug = () => {
  console.log("Компиляция Pug");

  return src("app/pug/pages/*.pug")
    .pipe(pug({
      pretty: true,
      doctype: "html"
    }))
    .pipe(dest("build/"))
    .pipe(browserSync.stream());
};

const copyBootstrapJS = () => {
  return src("node_modules/bootstrap/dist/js/bootstrap.min.js")
    .pipe(dest("build/js/"));
};

const copyBootstrapIcons = () => {
  return src(["node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff", "node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2"])
    .pipe(dest("build/fonts/"));
};

exports.server = browserSyncJob;
exports.build = parallel(series(buildSass, purgeCSS), buildPug);
exports.copy = parallel(copyBootstrapJS, copyBootstrapIcons);
exports.default = series(parallel(series(buildSass, purgeCSS), buildPug), parallel(copyBootstrapJS, copyBootstrapIcons), browserSyncJob);
