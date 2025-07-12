import { burgerSelector, toggleMobileMenu } from "./common.js";

export function enableMobileMenu() {
    document.addEventListener("click", event => {
        const burger = event.target.closest(burgerSelector);
        if (burger !== null && burger !== undefined) {
            toggleMobileMenu();
        }
    });
}