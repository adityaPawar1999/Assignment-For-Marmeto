function showProducts(category) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            const categories = data?.categories || [];
            let products = [];
            for (const cat of categories) {
                if (cat.category_name === category) {
                    products = cat.category_products || [];
                    break;
                }
            }
            if (!Array.isArray(products) || products.length === 0) {
                console.error('Invalid data format or empty array. Unable to retrieve products.');
                return;
            }
            renderProducts(products);
        })
        .catch(error => console.error('Error fetching data:', error));
}



function renderProducts(products) {
    const productContainer = document.getElementById('product-container');

    products.forEach((product, index) => {
        const discountPercentage = calculateDiscount(product.price, product.compare_at_price);

        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.id = `product-card-${index}`;

        productCard.innerHTML = `
            <img class="img" id="product-image-${index}" src="${product.image}" alt="${product.title}">
            <p class="badge" id="product-badge-${index}">${product.badge_text || ''}</p>
            <span class="titleBar">
            <h3 class="title" id="product-title-${index}">${product.title}</h3>
            <span class="vendor" id="product-vendor-${index}"> ${product.vendor}</span>
            </span>
            <p class"prize">
            <span class="realPrize" id="product-price-${index}">RS  ${product.price}.00</span>
            <span class="comparePrize" id="product-compare-price-${index}">${product.compare_at_price}.00</span>
            <span class="discount" id="product-discount-${index}"> ${discountPercentage}% off</span>
            </p>
            <button class="addCart" id="add-to-cart-btn-${index}" class="add-to-cart-btn">Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
    });
}
function calculateDiscount(price, compareAtPrice) {
    if (compareAtPrice && price < compareAtPrice) {
        const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
        return Math.round(discount);
    }
    return 0;
}
document.addEventListener('DOMContentLoaded', function () {
    showProducts('Men');
});
