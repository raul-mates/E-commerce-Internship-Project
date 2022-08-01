import {renderProductDetails} from "./renderers/render-product-details.js";

(async () => {
    try {
        const response = await fetch("/products.json")
        const data = await response.json();
        const productId = localStorage.getItem('productId');
        const product = data.products.filter(product => product.id === parseInt(productId));
        console.log(product[0].images);
        renderProductDetails(product);
    } catch (err) {
        console.warn(err);
    }
})()
