import {localStorageGet} from "../../utils/localstorage-util.js";

export const emptyProductId = () => {
    const productId = localStorageGet('productId');
    if (!productId) {
        window.location.replace('/index.html');
    }
};

emptyProductId();
