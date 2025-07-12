import fileinclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import { gulp, path, isBuild, plugins } from "../config/index.js";
import pug from "gulp-pug";

export const html = () => {
    return gulp.src(path.src.html)
        .pipe(plugins.plumber(
            plugins.notify.onError({
                title: "Html",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fileinclude())
        .pipe(pug({
            pretty: "\t"
        }))
        .pipe(plugins.replace(/@img\//g, "img/"))
        .pipe(plugins.if(isBuild, webpHtmlNosvg()))
        .pipe(
            plugins.if(
                isBuild,
                versionNumber({
                    value: '%DT%',
                    append: {
                        "key": "_v",
                        "cover": 0,
                        "to": ["css", "js"]
                    },
                    "output": {
                        "file": "gulp/version.json"
                    }
                })))
        .pipe(gulp.dest(path.build.html))
        .pipe(plugins.browserSync.stream());
};