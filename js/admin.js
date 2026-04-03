let products = [];
async function addProduct() {
    const formData = new FormData();
    formData.append("name", document.getElementById("pname").value);
    formData.append("price", document.getElementById("price").value);
    formData.append("category", document.getElementById("category").value);
    formData.append("quantity", document.getElementById("quantity").value);
    const imageFile = document.getElementById("image").files[0];
    formData.append("image", imageFile);
    await fetch("http://localhost:5000/products", {
        method: "POST",
        body: formData
    });
    alert("Product Added");
    loadProducts();
}
async function loadProducts() {
    const res = await fetch("http://localhost:5000/products");
    products = await res.json();   
    displayProducts();            
}
function displayProducts() {
    const list = document.getElementById("product-list");
    list.innerHTML = "";
    products.forEach((p, index) => {
        let item = document.createElement("div");
        item.className = "product-item";
        item.innerHTML = `
            <img src="http://localhost:5000/uploads/${p.image}" width="100">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <p>Category: ${p.category}</p>
            <p>Qty: ${p.quantity}</p>
            <p>Status: <b>${p.status}</b></p>
            <button onclick="deleteProduct('${p._id}')">Delete</button>
        `;
        list.appendChild(item);
    });
    document.getElementById("product-count").innerText = products.length;
}
function clearForm() {
    document.getElementById("pname").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";
    document.getElementById("quantity").value = "";
}
loadProducts();
async function deleteProduct(id) {

    await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE"
    });

    alert("Product Deleted");

    loadProducts();
}