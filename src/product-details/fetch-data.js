(async () => {
    try {
        const response = await fetch("/products.json")
        const data = await response.json();
        const productId = localStorage.getItem('productId');
        if (productId) {
            const result = data.products.filter(product => product.id = +productId);
            if (result.length) {
                console.log(result[0]);
            }
        }
    } catch (err) {
        console.warn(err);
    }
})()
