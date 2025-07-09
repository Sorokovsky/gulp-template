import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import webcss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const styles = () => {
    return app.gulp.src(app.path.src.sass, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "Styles",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.replace(/@img\//g, "../img/"))
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
        .pipe(app.plugins.if(app.isBuild, webcss({
            webpClass: ".webp",
            noWebpClass: ".no-webp"
        })))
        .pipe(app.plugins.if(app.isBuild, autoprefixer({
            grid: true,
            overrideBrowserslists: ["last 3 versions"],
            cascade: true
        })))
        .pipe(app.gulp.dest(app.path.build.css)) 
        .pipe(app.plugins.if(app.isBuild, cleanCss()))
        .pipe(rename({
            extname: ".min.css",
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browserSync.stream());
};