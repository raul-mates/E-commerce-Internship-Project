export const localStorageGet = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (err) {
        return null;
    }
};

export const localStorageSet = (key, data) => {
    localStorage.setItem(key, data);
};

export const localStorageSetJson = (key, data) => {
    if (data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
};
