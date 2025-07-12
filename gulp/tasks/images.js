import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
import { gulp, isBuild, path, plugins } from "../config/index.js";

export const images = async () => {
    return gulp.src(path.src.images, { encoding: false })
        .pipe(plugins.plumber(
            plugins.notify.onError({
                title: "Images",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(plugins.newer(path.build.images))
        .pipe(plugins.if(isBuild, webp()))
        .pipe(plugins.if(isBuild, gulp.dest(path.build.images)))
        .pipe(plugins.if(isBuild, gulp.src(path.src.images, { encoding: false })))
        .pipe(plugins.if(isBuild, plugins.newer(path.build.images)))
        .pipe(plugins.if(isBuild, imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3,
        })))
        .pipe(gulp.dest(path.build.images))
        .pipe(gulp.src(path.src.svg, { encoding: false }))
        .pipe(gulp.dest(path.build.images))
        .pipe(plugins.browserSync.stream());
};