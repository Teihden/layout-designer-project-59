const { src, dest, parallel, series, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const pug = require("gulp-pug");
const browserSync = require("browser-sync").create();

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
    .pipe(sass())
    .pipe(dest("build/styles/"))
    .pipe(browserSync.stream());
};

const buildPug = () => {
  console.log("Компиляция Pug");

  return src("app/pug/pages/*.pug")
    .pipe(pug({
      pretty: true
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
exports.build = parallel(buildSass, buildPug);
exports.copy = parallel(copyBootstrapJS, copyBootstrapIcons);
exports.default = series(parallel(buildSass, buildPug), parallel(copyBootstrapJS, copyBootstrapIcons), browserSyncJob);
