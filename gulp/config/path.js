import * as nodePath from "node:path";

const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = "./dist";
const srcFolder = "./src";

export const path = {
    build: {
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
        html: `${buildFolder}/`,
        files: `${buildFolder}/files/`,
    },
    src: {
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        sass: `${srcFolder}/sass/style.sass`,
        html: `${srcFolder}/*.html`,
        files: `${srcFolder}/files/**/*.*`,
        svgicons: `${srcFolder}/svgicons/*.svg`
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
        sass: `${srcFolder}/sass/**/*.sass`,
        html: `${srcFolder}/**/*.html`,
        files: `${srcFolder}/files/**/*.*`,
        svgicons: `${srcFolder}/svgicons/**/*.svg`
    },
    clean: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ``
};