export const renderProducts = (products) => {
    const productsContainer = document.querySelector('.section__product-list');
    productsContainer.innerHTML = '';
    let productsCart = JSON.parse(localStorage.getItem('productsIdArray'));

    products.forEach(product => {
        let discount = product.discountPercentage / 100;
        let productId = String(product.id);
        let isProductInCart = productsCart && productsCart.includes(productId);
        const fixedProductTitle = product.title.replace(/[^a-z0-9A-Z]/gi, ' ').trim().replace(product.title[0], product.title[0].toUpperCase());
        product.title = fixedProductTitle;

        productsContainer.insertAdjacentHTML('beforeend', `
        <div class="container__product-details" data-price="${product.price - (product.price * discount)}">
            <a href="./product-details.html" class="product__details--link" data-id="${productId}">
                <div class="container__image">
                    <img src="${product.thumbnail}" alt="Photo of ${product.title}" class="container__product-details--image">
                </div>
                <div class="wrapper__products-details">
                    <h3 class="container__product-details--title" data-title="${product.title.toLowerCase()}">${(product.title.length > 25) ? product.title.substr(0, 24) + '&hellip;' : product.title}</h3>
                    <p><span class="product-default-text">category:</span> ${product.category.replace(product.category[0], product.category[0].toUpperCase())}</p>
                    <div class="container__product-info">
                        <p class="product__brand-type"><span class="product-default-text">brand:</span> ${product.brand}</p>
                    </div>                
                       <div class="container__product-price">
                           <span class="product-default-text">price:</span>
                           <p class="container__product-price--after-discount"><strong>${(product.price - (product.price * discount)).toFixed(2)} &dollar;</strong></p>
                           <p class="container__product-price--before-discount">${product.price.toLocaleString('en-US')} &dollar;</p>
                           <p class="container__product-price--discount">(${product.discountPercentage}% off)</p>
                       </div>                
                    <p><span class="product-default-text">seller:</span> ${product.seller}</p>
                </div>
                <div class="container__atc-button">
                    <a class="btn__add-to-cart ${isProductInCart && 'remove'}" data-id="${productId}">${isProductInCart ? 'Remove from cart' : 'Add to cart'}</a>
                </div>
            </a>
        </div>
        `)
    })
    checkIfContainerEmpty(productsContainer);
}

const checkIfContainerEmpty = (container) => {
    const searchInput = document.querySelector('.search-bar');
    if(container.innerHTML === '') container.insertAdjacentHTML('beforeend', `
    <div class="not-found-message">
        <h1>No matching product found for: ${searchInput.value}</h1>
    </div>
   `)
}
