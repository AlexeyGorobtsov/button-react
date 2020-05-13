export function getRect(rect) {
    return {
        offsetY: rect.top + window.scrollY,
        offsetX: rect.left + window.scrollX,
    };
}