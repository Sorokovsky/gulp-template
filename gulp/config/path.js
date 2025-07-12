import * as nodePath from "node:path";

const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = "./docs";
const srcFolder = "./src";

export const path = {
    build: {
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
        html: `${buildFolder}/`,
    },
    src: {
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,mp4,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        sass: `${srcFolder}/sass/style.sass`,
        html: `${srcFolder}/*.html`,
        svgicons: `${srcFolder}/svgicons/*.svg`
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,mp4,webp,svg}`,
        sass: `${srcFolder}/sass/**/*.sass`,
        html: `${srcFolder}/**/*.html`,
        svgicons: `${srcFolder}/svgicons/**/*.svg`
    },
    clean: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ``
};