import { deleteAsync } from "del";
import zipPlugin from "gulp-zip";
import { gulp, path, plugins } from "../config/index.js";

export const zip = () => {
    deleteAsync([`./${path.rootFolder}.zip`])
    return gulp.src(`${path.clean}/**/*.*`, {})
        .pipe(plugins.plumber(
            plugins.notify.onError({
                title: "Zip",
                message: "Error: <% error.message %>"
            })
        ))
        .pipe(zipPlugin(`${path.rootFolder}.zip`))
        .pipe(gulp.dest("./"));
};