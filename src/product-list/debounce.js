export const debounce = (func, time) => {
    let timeout;

    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args)
        }, time)
    }
}
