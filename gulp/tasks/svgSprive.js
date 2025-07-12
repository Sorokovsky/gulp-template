import svgSprite from "gulp-svg-sprite";
import { path, plugins, gulp } from "../config/index.js";

export const svgSprive = () => {
    return gulp.src(path.src.svgicons, {})
        .pipe(plugins.plumber(
            plugins.notify.onError({
                title: "SVG",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../icons/icons.svg",
                    example: true
                }
            }
        }))
        .pipe(gulp.dest(path.build.images));
};