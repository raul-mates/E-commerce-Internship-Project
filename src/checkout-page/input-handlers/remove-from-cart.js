import {localStorageGet, localStorageSetJson} from "../../utils/localstorage-util.js";

export const removeFromCart = () => {
    const containerCheckout = document.querySelector('.checkout-container');
    const containerProductsInCart = document.querySelector('.container__products-in-cart');
    const productsInCart = document.querySelector('.products-in-cart');

    containerCheckout.addEventListener('click', (event) => {
        let currentProductId = event.target.dataset.id;
        if (currentProductId) {
            let idArr = localStorageGet('productsIdArray');

            idArr = idArr ?? [];

            if(idArr.includes(currentProductId)) {
                const parsedCart = localStorageGet('productsIdArray');
                parsedCart.splice(parsedCart.indexOf(currentProductId), 1)
                localStorageSetJson('productsIdArray', parsedCart);
            }

            productsInCart.innerHTML = localStorageGet('productsIdArray').length;

            if(localStorageGet('productsIdArray').length === 0) {
                containerProductsInCart.classList.add('hidden')
            }
        }
    })
    if (localStorageGet('productsIdArray') && localStorageGet('productsIdArray').length > 0) {
        containerProductsInCart.classList.remove('hidden');
        productsInCart.innerHTML = localStorageGet('productsIdArray').length;
    }
}


