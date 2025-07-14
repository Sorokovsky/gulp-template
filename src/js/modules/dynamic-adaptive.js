const dynamicSelector = "[data-dynamic]";
let items = document.querySelectorAll(dynamicSelector);
let moved = [];
export function enablDynamicAdaptive() {
    items = document.querySelectorAll(dynamicSelector);
    if (items.length > 0) {
        dynamicAdaptive()
    }
}

function dynamicAdaptive() {
    items.forEach(onResize);
    moved.forEach(tryUnMove);
    window.addEventListener("resize", () => {
        items.forEach(onResize);
        moved.forEach(tryUnMove);
    });
} 

function onResize(element) {
    const [breakPoint, comparing, selector, position] = element.dataset.dynamic.split(",");
    const block = document.querySelector(selector);
    const numberBreakPoint = Number(breakPoint);
    const windowWidth = window.innerWidth;
    const parent = element.parentElement;
    const index = Array.prototype.indexOf.call(parent.children, element);
    if (canMove(windowWidth, numberBreakPoint, comparing)) {
        move(block, position, element);
        moved.push({
            parent,
            element,
            index,
            numberBreakPoint,
            comparing
        });
        items = [...items].filter(item => item !== element);
    }
}

function tryUnMove({ parent, element, index, numberBreakPoint, comparing }) {
    if (canMove(window.innerWidth, numberBreakPoint, comparing) === false) {
        move(parent, `${index}`, element);
        moved = [...moved].filter(item => item.element !== element);
        items.push(element);
    }
}

function canMove(windowWidth, breakPoint, comparing) {
    switch (comparing) {
        case ">":
            return windowWidth > breakPoint;
        case ">=":
            return windowWidth >= breakPoint;
        case "<":
            return windowWidth < breakPoint;
        case "<=":
            return windowWidth <= breakPoint;
        case "=":
            return windowWidth === breakPoint;
        default:
            break;
    }
}

function move(block, position, element) {
    const parent = element.parentElement;
    if (block) {
        const order = getOrder(position, block.children);
        parent.removeChild(element);
        let reference = null;
        if (order < block.children.length) {
            reference = block.children[order];
            block.insertBefore(element, reference);
        } else {
            block.appendChild(element);
        }
    }
}

function getOrder(position, list) {
    if (position === "first") return 0;
    else if (position === "last") return list.length;
    else return Number(position);
}