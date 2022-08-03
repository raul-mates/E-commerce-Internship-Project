import {renderCart} from "./renderers/render-cart.js";
import {removeFromCart} from "./input-handlers/remove-from-cart.js";
import {checkQuantity} from "./input-handlers/quantity-input.js";
import {localStorageGet} from "../utils/localstorage-util.js";

(async () => {
    try {
        const response = await fetch('/products.json');
        const data = await response.json();
        let filteredProductsThatAreInCart;

        if(localStorageGet('productsIdArray')) {
            const getLocalCartArr = localStorageGet('productsIdArray').map(id => parseInt(id))
            filteredProductsThatAreInCart = data.products.filter((product) => getLocalCartArr.some(id => id === product.id))
        }

        renderCart(filteredProductsThatAreInCart);
        removeFromCart();
        checkQuantity();
    } catch (err) {
        console.warn(err);
    }
})()
