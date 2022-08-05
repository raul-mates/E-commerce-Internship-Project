export const checkQuantity = () => {
    const quantityInputs = document.querySelectorAll('.quantity');
    const totalPriceElement = document.querySelector('.total-price');

    quantityInputs.forEach(qtyInput => {
        checkSingleInputQuantity(qtyInput, totalPriceElement);
    })
}

const checkSingleInputQuantity = (qtyInput, totalPriceElement) => {
    let minQty = +qtyInput.getAttribute('min');
    let maxQty = +qtyInput.getAttribute('max');
    let previousQty = minQty;
    qtyInput.addEventListener('change', (event) => {
        let input = event.currentTarget;
        let qty = +input.value;

        if (qty >= maxQty) {
            input.value = maxQty;
            qty = maxQty;
        }

        if (qty < minQty) {
            input.value = minQty;
            qty = minQty;
        }

        const basePrice = +input.dataset.basePrice;
        const oldPrice = basePrice * previousQty;
        const totalPrice = +totalPriceElement.dataset.totalPrice;
        const newTotal = ((totalPrice + (basePrice * qty)) - oldPrice);

        totalPriceElement.innerText = `${newTotal.toFixed(2)}$`;
        totalPriceElement.dataset.totalPrice = newTotal;
        previousQty = qty;
    });
}
