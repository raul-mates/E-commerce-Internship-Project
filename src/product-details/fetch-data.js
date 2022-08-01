import {renderProductDetails} from "./renderers/render-product-details.js";
import {addToCart} from "./input-handlers/add-to-cart.js";
import {selectImageInput} from "./input-handlers/select-image-input.js";
import {similarProductSelected} from "./input-handlers/similar-product-input.js";

(async () => {
    try {
        const response = await fetch("/products.json")
        const data = await response.json();
        const productId = localStorage.getItem('productId');
        const product = data.products.filter(product => product.id === parseInt(productId));
        renderProductDetails(product, data.products);
        selectImageInput();
        similarProductSelected()
    } catch (err) {
        console.warn(err);
    }
    addToCart();
})()
