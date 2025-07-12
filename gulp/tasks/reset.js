import { deleteAsync } from "del";
import { path } from "../config/index.js";

export const reset = () => {
    return deleteAsync([path.clean]);
};