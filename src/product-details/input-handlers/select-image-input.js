export const selectImageInput = () => {
    const sideImages = document.querySelectorAll('.side-image');
    const mainImage = document.querySelector('.main-image');

    sideImages.forEach(image => {
        image.addEventListener('click', (event) => {
            sideImages.forEach(img => img.classList.remove('selected-img'))
            mainImage.src = event.target.src;
            event.target.classList.add('selected-img')
        })
    })
}
