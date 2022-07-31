export const sortByCondition = (arr, sortingState = undefined) => {
    if (sortingState) {
        arr.sort((a, b) => {
            const priceAscending = a.price - (a.price * a.discountPercentage) / 100;
            const priceDescending = b.price - (b.price * b.discountPercentage) / 100;
            return sortingState === 'Ascending' ? priceAscending - priceDescending : priceDescending - priceAscending;
        });
    }
}
