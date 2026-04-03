let cart = JSON.parse(localStorage.getItem("cart")) || [];
function displayCart() {
    let cartDiv = document.getElementById("cart-items");
    let totalBox = document.querySelector(".cart-right");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        cartDiv.innerHTML = `
            <div style="text-align:center; padding:50px;">
                <h2>Your cart is empty 🛒</h2>
                <p>Add some products to see them here</p>
            </div>
        `;
        totalBox.style.display = "none";
        return;
    }
    totalBox.style.display = "block";
    let total = 0;
    cartDiv.innerHTML = "";
    cart.forEach((item, index) => {
        total += Number(item.price) * (item.quantity || 1);
        cartDiv.innerHTML += `
            <div class="cart-item">
                <img src="http://localhost:5000/uploads/${item.image}">
                <div class="details">
                    <h3>${item.name}</h3>
                    <div class="qty-box">
                        <button onclick="decreaseQty(${index})">-</button>
                        <span>${item.quantity || 1}</span>
                        <button onclick="increaseQty(${index})">+</button>
                    </div>
                    <button type="button" class="remove-btn" onclick="removeItem(${index})">
                     Remove
                    </button>
                </div>
                <div class="price">₹${item.price}</div>
            </div>
        `;
    });
    document.getElementById("total").innerText = total;
}
function increaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart[index].quantity) {
        cart[index].quantity = 1;
    }
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
function decreaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart[index].quantity) {
        cart[index].quantity = 1;
    }
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
displayCart();
function checkout() {
    let user = JSON.parse(localStorage.getItem("user"));
    let popup = document.getElementById("popup");
    let msg = document.getElementById("popup-msg");
    let icon = document.getElementById("popup-icon");
    popup.style.display = "flex";
    if (user) {
        icon.innerText = "✔";
        icon.style.color = "green";
        msg.innerText = "Your order is accepted! Move to payment 💳";
    } else {
        icon.innerText = "✖";
        icon.style.color = "red";
        msg.innerText = "Please login to proceed 🚫";
    }
}
function closePopup() {
    document.getElementById("popup").style.display = "none";
}