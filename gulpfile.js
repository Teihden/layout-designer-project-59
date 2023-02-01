const { src, dest, parallel, series, watch } = require("gulp");
const stylelint = require("gulp-stylelint");
const sass = require("gulp-sass")(require("sass"));
const pugLinter = require('gulp-pug-linter');
const pug = require("gulp-pug");
const browserSync = require("browser-sync").create();
const purgecss = require("gulp-purgecss");
const surge = require("gulp-surge");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");

const browserSyncJob = () => {
  browserSync.init({
    server: "build/",
    open: false
  });

  watch("app/scss/**/*.scss", series(lintSass, buildSass, purgeCSS, postCSS));
  watch("app/pug/**/*.pug", series(lintPug, buildPug));
  watch("node_modules/bootstrap/dist/js/bootstrap.min.js", copyBootstrapJS);
  watch("node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2", copyBootstrapIcons);
};

const lintSass = () => {
  console.log("Проверка линтером Sass");

  return src("app/scss/*.scss")
    .pipe(stylelint({
      failAfterError: true,
      reporters: [
        { formatter: 'string', console: true }
      ],
      fix: true
    }))
    .pipe(dest("app/scss/"));;
};

const buildSass = () => {
  console.log("Компиляция SASS");

  return src("app/scss/*.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .pipe(dest("build/css/"));
};

const purgeCSS = () => {
  console.log("запуск PurgeCSS");

  return src("build/css/*.css")
    .pipe(purgecss({
      content: ["build/*.html"],
      variables: true
    }))
    .pipe(dest("build/css"))
};

const postCSS = () => {
  console.log("запуск Autoprefixer");

  return src("build/css/*.css")
    .pipe(postcss([autoprefixer()]))
    .pipe(dest("build/css"));
};

const lintPug = () => {
  console.log("Проверка линтером Pug");

  return src("app/pug/pages/*.pug")
    .pipe(pugLinter({
      reporter: 'puglint-stylish',
      failAfterError: true
    }));
};

const buildPug = () => {
  console.log("Компиляция Pug");

  return src("app/pug/pages/*.pug")
    .pipe(pug({
      pretty: null,
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
  return src("node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2")
    .pipe(dest("build/fonts/"));
};

const deploySurge = () => {
  console.log("Развертывание сайта на Surge");

  return surge({
    project: "./build",
    domain: "https://hex-chat.surge.sh"
  });
};

exports.server = browserSyncJob;
exports.build = parallel(series(lintPug, buildPug), series(lintSass, buildSass, purgeCSS, postCSS));
exports.copy = parallel(copyBootstrapJS, copyBootstrapIcons);
exports.deploy = deploySurge;
exports.default = series(parallel(series(lintPug, buildPug), series(lintSass, buildSass, purgeCSS, postCSS)), parallel(copyBootstrapJS, copyBootstrapIcons), browserSyncJob);
