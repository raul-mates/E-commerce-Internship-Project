export const getProductDetailsId = () => {
    const productsSection = document.querySelector('.section__product-list');
    productsSection.addEventListener('click', (event) => {
        if(event.target.closest('.product__details--link')) {
            localStorage.setItem('productId', event.target.closest('.product__details--link').dataset.id)
        }
    })
}
