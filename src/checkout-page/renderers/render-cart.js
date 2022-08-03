export const renderCart = (productsArr) => {
    const checkoutContainer = document.querySelector('.main-content-wrapper');

    if (!productsArr || productsArr.length < 1) {
        const totalContainer = document.querySelector('.total-price__wrapper');
        totalContainer.classList.add('hidden')
        checkoutContainer.insertAdjacentHTML('beforeend', `
            <h1 style="position: absolute; top: 45%; left: 50%; transform: translate(-50%, -50%); text-align: center; font-size: 2.8rem; opacity: 0.6">There are no products in your cart!</h1>
        `)
        return;
    }

    if (productsArr) {
        productsArr.forEach(product => {
            const fixedProductTitle = product.title.replace(/[^a-z0-9A-Z]/gi, ' ').trim().replace(product.title[0], product.title[0].toUpperCase());
            checkoutContainer.insertAdjacentHTML('afterbegin', `
        <div class="container__in-cart-product" data-id="${product.id}">
            <div class="container__product-image">
                <img src="${product.thumbnail}" alt="" class="in-cart__img">
            </div>
            <div class="container__product-details">
                <div>
                    <h3 class="product-title">${fixedProductTitle}</h3>
                    <div class="price-container default-text-container">
                        <p class="default-text">price: </p>
                        <p class="price-after-discount" style="display: inline-block; margin-right: 1rem;">${(product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)}&dollar;</p>
                        <p class="price-before-discount" style="display: inline-block; margin-right: 1rem; text-decoration: line-through; opacity: 0.7;">${product.price}&dollar;</p>
                        <p class="discount-percentage" style="display: inline-block; margin-right: 1rem; color: #0A8200;">(${product.discountPercentage}% off)</p>
                    </div>
                </div>
                <div class="container__remove-quantity">
                    <a href="/checkout-page.html" class="link">
                        <ion-icon name="trash-outline" class="remove-from-cart-icon" data-id="${product.id}"></ion-icon>
                    </a>
                    <input type="number" min="1" max="${product.stock}" value="1" class="quantity">
                </div>
            </div>
            </div>
        </div>
    `)
        })

        const calculateTotalPrice = (products) => {
            const totalPriceElement = document.querySelector('.total-price');

            if (products.length > 1) {
                const productPricesArray = products.map(productPrice => (productPrice.price - (productPrice.price * (productPrice.discountPercentage / 100))).toFixed(2))
                const total = productPricesArray.reduce((acc, val) => +acc + +val)
                totalPriceElement.innerHTML = `${total.toFixed(2)}$`;
            } else {
                totalPriceElement.innerHTML = `${(products[0].price - (products[0].price * (products[0].discountPercentage / 100))).toFixed(2)}$`;
            }
        }
        calculateTotalPrice(productsArr)
    }
}
