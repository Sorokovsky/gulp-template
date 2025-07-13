import fs from "node:fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";
import { gulp, path, plugins } from "../config/index.js";

export const otfToTtf = () => {
    return gulp.src(`${path.srcFolder}/fonts/*.otf`, {encoding: false})
        .pipe(plugins.plumber(
            plugins.notify.onError({
                title: "Fonts",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fonter({
            formats: ["ttf"]
        }))
        .pipe(gulp.dest(`${path.srcFolder}/fonts/`));
};

export const ttfToWoff = () => {
    return gulp.src(`${path.srcFolder}/fonts/*.ttf`, {encoding: false})
        .pipe(plugins.plumber(
            plugins.notify.onError({
                title: "Fonts",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fonter({
            formats: ["woff"]
        }))
        .pipe(gulp.dest(path.build.fonts))
        .on('end', () => {
            gulp.src(`${path.srcFolder}/fonts/*.ttf`, {encoding: false})
                .pipe(ttf2woff2())
                .pipe(gulp.dest(path.build.fonts));
        });
};

export const fontsStyle = () => {
    let fontsFile = `${path.srcFolder}/sass/fonts.sass`
    fs.readdir(path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            if (!fs.existsSync(fontsFile)) {
                fs.writeFile(fontsFile, "@use 'mixins/index' as *", cb);
                let newFileOnly;
                for (let i = 0; i < fontsFiles.length; i++) {
                    let fontFileName = fontsFiles[i].split(".")[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split("-")[0] ? fontFileName.split("-")[0] : fontFileName;
                        let fontWeight = (fontFileName.split("-")[1] ? fontFileName.split("-")[1] : fontFileName).toLowerCase();
                        let italic = "italic";
                        let normal = "normal";
                        let fontStyle = fontWeight.includes(italic) ? italic : normal;
                        fontWeight.replace(italic, "");
                        switch (fontWeight) {
                            case "thin":
                                fontWeight = 100;
                                break;
                            case "extralight":
                                fontWeight = 200;
                                break;
                            case "light":
                                fontWeight = 300;
                                break;
                            case "medium":
                                fontWeight = 500;
                                break;
                            case "semibold":
                                fontWeight = 600;
                                break;
                            case "bold":
                                fontWeight = 700;
                                break;
                            case "extrabold":
                            case "heavy":
                                fontWeight = 800;
                                break;
                            case "black":
                                fontWeight = 900;
                                break;
                            default:
                                fontWeight = 400;
                                break;
                        }
                        fs.appendFile(fontsFile, `\n@include font("${fontName}", "${fontFileName}", ${fontWeight}, ${fontStyle})`, cb);
                        newFileOnly = fontFileName;
                    } else {
                        console.log("fonts.sass already exits.");
                    }
                }
            }
        } else {
            fs.appendFile(fontsFile, "", cb);
        }
    });

    return gulp.src(path.srcFolder);
    function cb() { };
};