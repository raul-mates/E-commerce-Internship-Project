import {renderCart} from "./renderers/render-cart.js";
import {removeFromCart} from "./input-handlers/remove-from-cart.js";

(async () => {
    try {
        const response = await fetch('/products.json');
        const data = await response.json();
        let filteredProductsThatAreInCart;

        if(JSON.parse(localStorage.getItem('productsIdArray'))) {
            const getLocalCartArr = JSON.parse(localStorage.getItem('productsIdArray')).map(id => parseInt(id))
            filteredProductsThatAreInCart = data.products.filter((product) => getLocalCartArr.some(id => id === product.id))
        }

        renderCart(filteredProductsThatAreInCart);
        removeFromCart();
    } catch (err) {
        console.warn(err);
    }
})()
