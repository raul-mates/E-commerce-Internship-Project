export const addToCart = () => {
    const productsSection = document.querySelector('.section__product-list');
    const containerProductsInCart = document.querySelector('.container__products-in-cart');
    const productsInCart = document.querySelector('.products-in-cart');

    productsSection.addEventListener('click', (event) => {
        let currentProductId = event.target.dataset.id;
        if (currentProductId) {
            let isInCart = event.target.classList.contains('remove');
            let idArr = localStorage.getItem("productsIdArray");

            idArr === null ? idArr = [] : idArr = JSON.parse(idArr);

            if (!isInCart) {
                event.target.classList.add('remove');
                event.target.innerText = 'Remove from cart';
                containerProductsInCart.classList.remove('hidden');
                if (!idArr.includes(currentProductId)) {
                    idArr.push(currentProductId);
                }
            } else {
                event.target.classList.remove('remove')
                event.target.innerText = 'Add to cart';
                if (idArr.includes(currentProductId)) {
                    idArr.splice(idArr.indexOf(currentProductId), 1);
                }
            }

            idArr = JSON.stringify(idArr);
            localStorage.setItem("productsIdArray", idArr);

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
