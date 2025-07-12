import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { styles } from "./gulp/tasks/styles.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { fontsStyle, otfToTtf, ttfToWoff } from "./gulp/tasks/fonts.js";
import { zip } from "./gulp/tasks/zip.js";
import { path, gulp } from "./gulp/config/index.js";

function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.sass, styles);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, styles, js, images));

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

const build = gulp.series(reset, mainTasks);

const deployZip = gulp.series(reset, mainTasks, zip);

export { svgSprive };

export { build };
    
export { dev };
    
export { deployZip };

gulp.task("default", dev);                                                        