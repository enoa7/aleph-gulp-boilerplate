import { src, dest, series, parallel } from "gulp";
import sass from "gulp-sass";
import babel from "gulp-babel";
import del from "del";
import pug from "gulp-pug";

/** ------ CONFIG ------ */
const GET_ENV = process.env.NODE_ENV; // production || development
const SRC = "./src";
const BUILD = "./build";

const DEV_PATH = {
	view: `${SRC}/pug/*.pug`,
	style: `${SRC}/scss/main.scss`,
	script: `${SRC}/scripts/main.js`,
};

const BUILD_PATH = {
	view: `${BUILD}`,
	style: `${BUILD}/assets/css`,
	script: `${BUILD}/assets/js`,
};
/** ------ END CONFIG ------ */

/**
 * @name Clean
 * @description delete build folder
 */
function clean() {
	return del("./build", { force: true });
}

/**
 * @name CompilePug
 * @description Compiles Pug files to HTML
 */
function compilePug() {
	return src(DEV_PATH.view)
		.pipe(pug({ pretty: true }))
		.pipe(dest('./build'));
}

/**
 * @name CompileSass
 * @description Compiles SCSS files to CSS
 */
function compileSass() {
	return src(DEV_PATH.style)
		.pipe(sass().on("error", sass.logError))
		.pipe(dest(BUILD_PATH.style));
}

/**
 * @name CompileJS
 * @description Compiles ES6 files to ES5 (javascripts)
 */
function compileJs() {
	return src(DEV_PATH.script)
		.pipe(babel({ presets: ["@babel/env"] }))
		.pipe(dest(BUILD_PATH.script));
}

exports.default = series(clean, parallel(compileSass, compileJs), compilePug);

// how to: run gulp in terminal