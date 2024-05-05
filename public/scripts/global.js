// Get cart button element
const cartButtonElement = document.getElementById("cart-button");

// Fetch cart items count from server
const cartCount = await (await fetch("/cart/items/count")).json();

// Set count of cart button
cartButtonElement.querySelector("span").textContent = cartCount;
