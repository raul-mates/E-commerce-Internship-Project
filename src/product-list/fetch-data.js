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
        let defaultSorting = 'Ascending';
        const sortButton = document.querySelector('#sort-by');
        const searchInput = document.querySelector('.search-bar');

        sortByCondition(dataInitialState, defaultSorting);
        clonedArr = [...dataInitialState];

        renderProducts(dataInitialState);

        //SORTING LOGIC
        sortButton.value = defaultSorting;
        sortButton.addEventListener('change', (event) => {
            defaultSorting = event.target.value;
            sortByCondition(clonedArr, event.target.value);
            renderProducts(clonedArr);
        })

        //SEARCH LOGIC
        searchInput.addEventListener('input', debounce((event) => {
            let inputValue = event.target.value;

            if(inputValue === '') {
                sortByCondition(dataInitialState, defaultSorting);
                clonedArr = dataInitialState;
                renderProducts(clonedArr);
                return;
            }

            clonedArr = dataInitialState.filter(product => product.title.toLowerCase().includes(inputValue.toLowerCase()));
            renderProducts(clonedArr);
        }, 500));
    } catch (err) {
        console.warn(err);
    }
    getProductDetailsId();
    addToCart();
})();
