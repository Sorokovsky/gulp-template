import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import webcss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";
import { gulp, isBuild, isDev, path, plugins } from "../config/index.js";

const sass = gulpSass(dartSass);

export const styles = () => {
    return gulp.src(path.src.sass, { sourcemaps: isDev })
        .pipe(plugins.plumber(
            plugins.notify.onError({
                title: "Styles",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(plugins.replace(/@img\//g, "../img/"))
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(plugins.if(isBuild, groupCssMediaQueries()))
        .pipe(plugins.if(isBuild, webcss({
            webpClass: ".webp",
            noWebpClass: ".no-webp"
        })))
        .pipe(plugins.if(isBuild, autoprefixer({
            grid: true,
            overrideBrowserslists: ["last 3 versions"],
            cascade: true
        })))
        .pipe(gulp.dest(path.build.css)) 
        .pipe(plugins.if(isBuild, cleanCss()))
        .pipe(rename({
            extname: ".min.css",
        }))
        .pipe(gulp.dest(path.build.css))
        .pipe(plugins.browserSync.stream());
};