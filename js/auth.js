async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const res = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    console.log("Login response:", data);
    localStorage.setItem("user", JSON.stringify({
    name: email,   
    role: data.role
}));
    if (data.role === "admin") {
        window.location.href = "admin.html";
    } else if (data.role === "user") {
        window.location.href = "../index.html";
    } else {
        alert("Invalid login");
    }
}
async function register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const res = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    alert("Registered Successfully");
    window.location.href = "login.html";
}
function togglePassword() {
    const input = document.getElementById("password");
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}
