import { plugins, path } from "../config/index.js";
export const server = (done) => {
    plugins.browserSync.init({
        server: `${path.build.html}`,
        notify: false,
        port: 3000
    });
}