export const server = (done) => {
    app.plugins.browserSync.init({
        server: `${app.path.build.html}`,
        notify: false,
        port: 3000
    });
}