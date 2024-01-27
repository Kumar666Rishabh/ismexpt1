const productsEl = document.getElementById('products');
const cartBtnEl = document.getElementById('cartBtn');

let cartArr;
let productsArr = [];

// loads previous cart arr
function getCartArr() {
    const temp = localStorage.getItem('cartArr');
    const temp2 = JSON.parse(temp);
    if (temp2 === null || temp2 === undefined) {
        cartArr = [];
        localStorage.setItem('cartArr', JSON.stringify(cartArr));
    } else {
        cartArr = temp2;
    }
}

// Dummy products data
const dummyProducts = [
    {
        _id: '1',
        product_name: 'Dummy Product 1',
        product_price: 20,
        product_image_md: 'dummy_image1_md.jpg',
        product_image_sm: 'dummy_image1_sm.jpg',
        product_ratings: 4.5,
    },
    {
        _id: '2',
        product_name: 'Dummy Product 2',
        product_price: 25,
        product_image_md: 'dummy_image2_md.jpg',
        product_image_sm: 'dummy_image2_sm.jpg',
        product_ratings: 3.8,
    },
    // Add more dummy products as needed
];

// Load dummy products
const loadDummyProducts = () => {
    productsArr = dummyProducts;
    displayProductsDOM(dummyProducts);
};

// renders products list on DOM
function displayProductsDOM(products) {
    productsEl.innerHTML = products
        .map(
            (product) => `
        <div class="product">
            <div class="product-info">
                <img src="${product.product_image_md}" alt="product-image">
                <h4>${product.product_name}</h4>
                <h5>Price: $ ${product.product_price}</h5>
                <h5>Rating: ${product.product_ratings}</h5>
                <button id="${product._id}" class="addBtn">add to cart</button>
            </div>
        </div>
    `
        )
        .join('');

    // add to cart button clicked
    $(".addBtn").on('click', addToCart);
}

// checks if item is already present in the cart
function isItemInCart(currId) {
    for (const product of cartArr) {
        if (currId === product._id) {
            product['qty'] += 1;
            return true;
        }
    }
    return false;
}

// add to cart function
function addToCart(e) {
    const currId = this.id;
    let item = {};

    // check if item is already in cart
    if (!isItemInCart(currId)) {
        for (const product of productsArr) {
            if (product._id === currId) {
                item['name'] = product.product_name;
                item['price'] = product.product_price;
                item['img'] = product.product_image_sm;
                item['_id'] = product._id;
                item['qty'] = 1;
                cartArr.push(item);
            }
        }
    }
    alert('Item Added to cart');
}

// display cart
function displayCart() {
    saveCartToLocal();
    window.location.href = "./cart.html";
}

// save user cart to local storage
function saveCartToLocal() {
    localStorage.setItem('cartArr', JSON.stringify(cartArr));
}

cartBtnEl.addEventListener('click', displayCart);

// Replace the call to loadProducts with loadDummyProducts
loadDummyProducts();
getCartArr();
