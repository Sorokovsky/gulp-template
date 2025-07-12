import { path as internalPath } from "./path.js";
import gulpPlugin from "gulp";
import { plugins as internalPlugins } from "./plugins.js";

const buildFlag = "--build";

export const gulp = gulpPlugin;
export const plugins = internalPlugins;
export const path = internalPath;
export const isBuild = process.argv.includes(buildFlag);
export const isDev = !isBuild;