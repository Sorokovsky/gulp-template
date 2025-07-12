export const burgerSelector = ".burger";
export const menuSelector = ".menu";
export const activeClass = "_active";
export const lockClass = "_lock";

export const openMobileMenu = () => setIsOpenMobileMenu(true);

export const closeMobileMenu = () => setIsOpenMobileMenu(true);

export function toggleMobileMenu() {
    const burger = document.querySelector(burgerSelector);
    if (burger !== null && burger !== undefined) {
        setIsOpenMobileMenu(burger.classList.contains(activeClass) === false);
    }
}

function setIsOpenMobileMenu(condition) {
    const burger = document.querySelector(burgerSelector);
    const menus = document.querySelectorAll(menuSelector);
    if (burger !== null && burger !== undefined) {
        if (condition) {
            burger.classList.add(activeClass);
            document.body.classList.add(lockClass);
            menus.forEach(item => item.classList.add(activeClass));
        } else {
            burger.classList.remove(activeClass);
            document.body.classList.remove(lockClass);
            menus.forEach(item => item.classList.remove(activeClass));
        }
    }
}