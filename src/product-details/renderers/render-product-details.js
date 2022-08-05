export const renderProductDetails = (product, fullProductsArray) => {
    const sectionProductDetails = document.querySelector('.section__product-details');
    const sectionSimilarProducts = document.querySelector('.section__similar-products');
    const fixedProductTitle = product[0].title.replace(/[^a-z0-9A-Z]/gi, ' ').trim().replace(product[0].title[0], product[0].title[0].toUpperCase());

    let getImages = product[0].images.map((image, i) => {
        return `
        <div class="container__side-images--image-${i}">
            <img src="${image}" alt="" class="image-${i} side-image ${i === 0 ? 'selected-img' : ''}">
        </div>
        `
    })


    const insertStars = (product) => {
        const productRating = Math.round(parseFloat(product[0].rating));
        const ratingStars = document.querySelectorAll('.rating-star');
        ratingStars.forEach((star, i) => {
            if(i < productRating) {
                ratingStars[i].name = 'star';
            }
        })
    }

    sectionProductDetails.insertAdjacentHTML('beforeend', `
        <div class="container__images">
            <div class="container__side-images">
                ${getImages.join('')}
            </div>
            <div class="container__main-image" data-id="${product[0].id}">
                <img src="${product[0].images[0]}" alt="Image of ${fixedProductTitle}" class="main-image">
            </div>
        </div>
    
        <div class="container__details">
            <h2>${fixedProductTitle}</h2>
            <div class="default-text-container">
                <p class="default-text">brand:</p>
                <p class="brand">${product[0].brand}</p>
            </div>
            <div class="default-text-container">
                <p class="default-text">category:</p>
                <p class="category">${product[0].category.replace(product[0].category[0], product[0].category[0].toUpperCase())}</p>
            </div>
            <div class="default-text-container">
                <p class="default-text">seller:</p>
                <p class="seller">${product[0].seller}</p>
            </div>
            <div class="default-text-container">
                <p class="default-text">description:</p>
                <p class="description" style="display: inline;">${product[0].description}</p>
            </div>
            <div class="default-text-container">
                <p class="default-text">stock:</p>
                <p class="stock">${Number(product[0].stock) > 1 ? `${product[0].stock} ` + 'pcs.' : `${product[0].stock} ` + 'pc.' }</p>
            </div>
            <div class="default-text-container rating-container">
                <p class="default-text">rating:</p>
                <ion-icon name="star-outline" class="rating-star"></ion-icon>
                <ion-icon name="star-outline" class="rating-star"></ion-icon>
                <ion-icon name="star-outline" class="rating-star"></ion-icon>
                <ion-icon name="star-outline" class="rating-star"></ion-icon>
                <ion-icon name="star-outline" class="rating-star"></ion-icon>
                <p class="rating">${product[0].rating}</p>
            </div>
            <div class="price-container default-text-container">
                <p class="default-text">price: </p>
                <p class="price-after-discount">${(product[0].price - (product[0].price * (product[0].discountPercentage / 100))).toLocaleString('en-US', {maximumFractionDigits: 2})}&dollar;</p>
                <p class="price-before-discount" style="text-decoration: line-through; opacity: 0.7;">${product[0].price.toLocaleString('en-US', {maximumFractionDigits: 2})}&dollar;</p>
                <p class="discount-percentage" style="color: #0A8200;">(${product[0].discountPercentage}% off)</p>
            </div>
            <button class="atc-button" data-id="${product[0].id}">Add to cart</button>
        </div>
    `)
    insertStars(product);

    let getSimilarProducts = (product, fullProductsArray) => {
        const productInViewId = document.querySelector('.container__main-image').dataset.id;
        const productCategory = product[0].category;
        const filteredByCategory = fullProductsArray.filter((product) => {
            if(product.category.includes(productCategory) && product.id !== parseInt(productInViewId)) {
                return product;
            }
        });

        return filteredByCategory.map((similarProduct, i) => {
            return i < 5 ? `
                <div class="product-card" data-id="${similarProduct.id}">
                    <a href="/product-details.html" class="link">
                        <div class="similar-product-image__container">
                            <img class="similar-product-image" src="${similarProduct.thumbnail}" alt="${similarProduct.title}">
                        </div>
                        <div class="similar-product-info__container">
                            <h3 class="similar-product-title">${(similarProduct.title.length > 20) ? similarProduct.title.substr(0, 20) + '&hellip;' : similarProduct.title}</h3>
                            <div class="default-text-container">
                                <p class="default-text">brand:</p>
                                <p>${similarProduct.brand}</p>
                            </div>
                            <div class="default-text-container">
                                <p class="default-text">rating:</p>
                                <p>${similarProduct.rating} <ion-icon name="star"></ion-icon></p>
                            </div>
                            <div class="price-container default-text-container">
                                <p class="default-text">price: </p>
                                <p class="price-after-discount">${(product[0].price - (product[0].price * (product[0].discountPercentage / 100))).toLocaleString('en-US', {maximumFractionDigits: 2})}&dollar;</p>
                                <p class="price-before-discount" style="text-decoration: line-through; opacity: 0.7;">${product[0].price.toLocaleString('en-US', {maximumFractionDigits: 2})}&dollar;</p>
                                <p class="discount-percentage" style="color: #0A8200;">(${product[0].discountPercentage}% off)</p>
                            </div>
                        </div>
                    </a>
                </div>
            ` : ''
        })

    }

    sectionSimilarProducts.insertAdjacentHTML('beforeend', `
        <div class="container__similar-products">
            ${getSimilarProducts(product, fullProductsArray).join('')}
        </div>
    `)

    const checkIfProductIsInCart = () => {
        const productsIdArr = JSON.parse(localStorage.getItem('productsIdArray'));
        const addToCartButton = document.querySelector('.atc-button');

        if (productsIdArr === null) {
            localStorage.setItem('productsIdArray', JSON.stringify([]))
            return
        }

        if(productsIdArr.includes(String(product[0].id))) {
            addToCartButton.innerHTML = 'Remove from cart';
            addToCartButton.classList.add('remove');
        }
    }
    checkIfProductIsInCart();
}
