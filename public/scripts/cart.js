// Get cart button element
const cartButtonElement = document.getElementById("cart-button");

// Get cart text element
const cartTextElement = document.querySelector("main p");

// Get buy button element
const buyButtonElement = document.querySelector("main > a");

// Get cart list and template
const cartListElement = document.getElementById("cart-list");
const cartItemTemplate = document.getElementById("cart-item");

// Fetch cart list from server
const cartList = await (await fetch("/cart/items")).json();

// Create cart counter variable
let cartCount = cartList.length;

// Create total cart price variable
let totalCartPrice = 0;

// Iterate through cart list to get cart items
for (const cartItem of cartList) {
  // Clone cart item template
  let cartItemElement = cartItemTemplate.content.cloneNode(true);

  // Sum up cart item prices
  totalCartPrice += cartItem.Price;

  // Set link to plant detail page
  cartItemElement.querySelector("a").href =
    `/plant.html?id=${cartItem.PlantID}`;

  // Set plant name, size and price
  cartItemElement.querySelector("h2").textContent = cartItem.PlantName;
  cartItemElement.querySelector("p").textContent =
    `In size ${cartItem.PlantSize.toLowerCase()} for $${cartItem.Price}`;

  // Set plant image
  const cartImageElement = cartItemElement.querySelector("img");
  cartImageElement.src = cartItem.ImageURL;
  cartImageElement.alt = `${cartItem.PlantName} plant`;

  // Add form submission event listener to delete item
  cartItemElement
    .querySelector("form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      // Call delete cart endpoint
      await fetch(`/cart/items/${cartItem.CartItemID}`, {
        method: "DELETE",
      });

      // Update and set new cart count
      cartButtonElement.querySelector("span").textContent = --cartCount;

      // Hide buy button if cart is empty
      if (cartCount === 0) {
        buyButtonElement.style.display = "none";
      }

      // Update and set new total cart price
      totalCartPrice -= cartItem.Price;
      cartTextElement.textContent = `With a total of $${totalCartPrice}`;

      // Remove cart item from list
      cartListElement.removeChild(cartItemElement);
    });

  // Append plant item to list
  cartListElement.appendChild(cartItemElement);
  cartItemElement = cartListElement.lastElementChild;
}

// Set cart text with total cart price
cartTextElement.textContent = `With a total of $${totalCartPrice}`;

// Hide buy button if cart is empty
if (cartCount === 0) {
  buyButtonElement.style.display = "none";
}
