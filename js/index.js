let products = [];
let selectedCategory = "";
let searchText = "";
async function loadProducts() {
    const res = await fetch("http://localhost:5000/products");
    products = await res.json();
    displayProducts(products); 
}
loadProducts();
document.getElementById("search").addEventListener("input", function () {
    searchText = this.value.toLowerCase();
    applyFilters();
});
function addToCart(product) {
    console.log("Clicked:", product);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let exists = cart.find(item => item._id === product._id);
    if (exists) {
        alert("Already in cart");
        return;
    }
    cart.push({
    _id: product._id,
    name: product.name,
    price: product.price,
    image: product.image
        });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(product.name + " added to cart 🛒");
}
function filterCategory(category) {
    selectedCategory = category;
    applyFilters();
}
function displayProducts(data) {
    const container = document.getElementById("product-container");
    container.innerHTML = "";
    data.forEach(p => {
        let div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
            <img src="${p.image ? 'http://localhost:5000/uploads/' + p.image : 'https://via.placeholder.com/150'}" class="product-img">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <p>${p.category}</p>
            <p>Status: 
                <span style="color:${p.quantity > 0 ? 'green' : 'red'}">
                    ${p.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
            </p>
            ${
                p.quantity > 0
                ? `<button class="cart-btn">Add to Cart</button>`
                : `<button class="cart-btn" disabled>Out of Stock</button>`
            }
        `;
        let btn = div.querySelector(".cart-btn");
        if (p.quantity > 0) {
            btn.addEventListener("click", () => addToCart(p));
        }
        container.appendChild(div);
    });
}
document.getElementById("sort").addEventListener("change", function () {
    sortOrder = this.value;
    applyFilters();
});
function applyFilters() {
    let filtered = products.filter(p => {
        let matchCategory = selectedCategory
            ? p.category && p.category.toLowerCase().includes(selectedCategory.toLowerCase())
            : true;
        let matchSearch = p.name.toLowerCase().includes(searchText);
        return matchCategory && matchSearch;
    });
    if (sortOrder === "low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }
    displayProducts(filtered);
}
function loadUser() {
    let user = JSON.parse(localStorage.getItem("user"));
    let nav = document.getElementById("nav-user");
    if (user) {
        nav.innerHTML = `
            <button onclick="logout()" class="logout-btn">Sign Out</button>
        `;
    } else {
        nav.innerHTML = `
            <a href="pages/login.html" class="login-btn">Login</a>
        `;
    }
}
loadUser();
function logout() {
    localStorage.removeItem("user");
    location.reload();
}
