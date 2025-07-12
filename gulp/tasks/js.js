import webpack from "webpack-stream";
import { gulp, isDev, path, plugins } from "../config/index.js";

export const js = () => {
    return gulp.src(path.src.js, { sourcemaps: isDev })
        .pipe(plugins.plumber(
            plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(webpack({
            mode: isDev ? "development" : "production",
            output: {
                filename: "min.js"
            },
        }))
        .pipe(gulp.dest(path.build.js))
        .pipe(plugins.browserSync.stream());
};