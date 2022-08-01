export const renderProductDetails = (product) => {
    const sectionProductDetails = document.querySelector('.section__product-details');

    let getImages = product[0].images.map((image, i) => {
        return `
        <div class="container__side-images--image-${i}">
            <img src="${image}" alt="" class="image-${i}">
        </div>
        `
    })

    sectionProductDetails.insertAdjacentHTML('beforeend', `
        <div class="container__images">
            <div class="container__side-images">
                ${getImages.join('')}
            </div>
            <div class="container__main-image">
                <img src="${product[0].images[0]}" alt="" class="main-image">
            </div>
        </div>
    
        <div class="container__details">
            <h2>${product[0].title}</h2>
            <p>${product[0].brand}</p>
            <p>Category: ${product[0].category}</p>
            <p>Sold by: ${product[0].seller}</p>
            <p>Description: ${product[0].description}</p>
            <p>Stock: ${product[0].stock}</p>
            <p>${product[0].rating}</p>
            <p>${product[0].price}</p>
            <button>Add to cart</button>
        </div>
    `)
}
