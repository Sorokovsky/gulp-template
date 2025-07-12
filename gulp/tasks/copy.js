import { gulp, path, plugins } from "../config/index.js";
export const copy = () => {
    return gulp.src(path.src.files)
        .pipe(gulp.dest(path.build.files))
        .pipe(plugins.browserSync.stream());
};