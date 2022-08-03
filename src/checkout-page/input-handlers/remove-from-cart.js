export const removeFromCart = () => {
    const containerCheckout = document.querySelector('.checkout-container');
    const containerProductsInCart = document.querySelector('.container__products-in-cart');
    const productsInCart = document.querySelector('.products-in-cart');

    containerCheckout.addEventListener('click', (event) => {
        let currentProductId = event.target.dataset.id;
        console.log(event.target)
        console.log(currentProductId);
        if (currentProductId) {
            let idArr = localStorage.getItem("productsIdArray");

            idArr === null ? idArr = [] : idArr = JSON.parse(idArr);

            if(idArr.includes(currentProductId)) {
                const parsedCart = JSON.parse(localStorage.getItem('productsIdArray'));
                parsedCart.splice(parsedCart.indexOf(currentProductId), 1)
                localStorage.setItem('productsIdArray', JSON.stringify(parsedCart));
            }

            productsInCart.innerHTML = JSON.parse(localStorage.getItem("productsIdArray")).length;

            if(JSON.parse(localStorage.getItem('productsIdArray')).length === 0) {
                containerProductsInCart.classList.add('hidden')
            }
        }
    })
    if (JSON.parse(localStorage.getItem('productsIdArray')) && JSON.parse(localStorage.getItem('productsIdArray')).length > 0) {
        containerProductsInCart.classList.remove('hidden');
        productsInCart.innerHTML = JSON.parse(localStorage.getItem("productsIdArray")).length;
    }
}
