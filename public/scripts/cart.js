// Get cart list and template
const cartListElement = document.getElementById("cart-list");
const cartItemTemplate = document.getElementById("cart-item");

// Get cart button element
const cartButtonElement = document.getElementById("cart-button");

// Get cart header
const totalCartItemElement = document.querySelector("main p");

// Fetch cart list from server
const cartList = await (await fetch("/cart/items")).json();

// cart counter for the cart button
let cartCount = cartList.length;

// counter to add up the total items in the cart
let totalCartPrice = 0;

// Iterate through the cart list to get the cart items
for (const cartItem of cartList) {
  // Clone cart item template
  let cartItemElement = cartItemTemplate.content.cloneNode(true);

  // Sum cart prices in the cartlist
  totalCartPrice += cartItem.Price;

  // Navigate to the plant.html page
  cartItemElement.querySelector("a").href =
    `/plant.html?id=${cartItem.PlantID}`;

  // Set plant name, size and  price
  cartItemElement.querySelector("h2").textContent = cartItem.PlantName;
  cartItemElement.querySelector("p").textContent =
    `In size ${cartItem.PlantSize.toLowerCase()} for $${cartItem.Price}`;

  // Set plant image
  const cartImageElement = cartItemElement.querySelector("img");
  cartImageElement.src = cartItem.ImageURL;
  cartImageElement.alt = `${cartItem.PlantName} plant`;

  // delete cart item from the cart list
  cartItemElement
    .querySelector("form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      // call delete cart endpoint
      await fetch(`/cart/items/${cartItem.CartItemID}`, {
        method: "DELETE",
      });
      cartListElement.removeChild(cartItemElement);

      // decrement the cart counter and total cart price
      cartCount--;
      totalCartPrice -= cartItem.Price;

      // set the new cart counter and total cart price
      totalCartItemElement.textContent = `With a total of $${totalCartPrice}`;
      cartButtonElement.querySelector("span").textContent = cartCount;
    });

  // Append plant item to list
  cartListElement.appendChild(cartItemElement);
  cartItemElement = cartListElement.lastElementChild;
}

// Displays the total cart price from the cart list
totalCartItemElement.textContent = `With a total of $${totalCartPrice}`;

