import {renderProducts} from "./renderers/render-products.js";
import {sortByCondition} from "./utils/sort-by-condition.js";
import {debounce} from "./debounce.js";
import {getProductDetailsId} from "./input-handlers/product-details-input.js";
import {addToCart} from "./input-handlers/add-to-cart.js";

(async () => {
    try {
        const request = await fetch('./products.json')
        const data = await request.json();
        const dataInitialState = data.products;
        let clonedArr;
        let currentSortingState = 'Ascending';
        const sortButton = document.querySelector('#sort-by');
        const searchInput = document.querySelector('.search-bar');

        sortByCondition(dataInitialState, currentSortingState);
        clonedArr = [...dataInitialState];

        renderProducts(dataInitialState);

        currentSortingState = sortButton.value;
        sortButton.addEventListener('change', (e) => {
            currentSortingState = e.target.value;
            sortByCondition(dataInitialState, currentSortingState);
            sortByCondition(clonedArr, currentSortingState);
            renderProducts(clonedArr);
        })

        searchInput.addEventListener('input', debounce((e) => {
            let userInputValue = e.target.value;
            console.log(userInputValue)

            clonedArr = dataInitialState.filter(product => product.title.toLowerCase().includes(userInputValue.toLowerCase()))
            renderProducts(clonedArr);

            if(userInputValue === '') {
                sortByCondition(dataInitialState, currentSortingState);
                clonedArr = dataInitialState;
                renderProducts(clonedArr);
            }
        }, 500))
    } catch (err) {
        console.warn(err);
    }
    getProductDetailsId();
    addToCart();
})();
