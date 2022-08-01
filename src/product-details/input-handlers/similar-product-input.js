export const similarProductSelected = () => {
    const similarProductsContainer = document.querySelector('.container__similar-products');

    similarProductsContainer.addEventListener('click', (event) => {
        localStorage.setItem('productId', event.target.closest('.product-card').dataset.id);
    })
}
