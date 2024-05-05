// Get plant ID from URL search parameters
const searchParams = new URLSearchParams(window.location.search);
const plantId = parseInt(searchParams.get("id"));

// Fetch plant item from server
const plantItem = await (await fetch(`/plants/${plantId}`)).json();

// Get HTML main element
const mainElement = document.querySelector("main");

// Set plant name and start price
mainElement.querySelector("h1").textContent = plantItem.PlantName;
mainElement.querySelector("p").textContent =
  `Available from $${plantItem.Sizes[0].Price}`;

// Set plant image
const plantImageElement = mainElement.querySelector("img");
plantImageElement.src = plantItem.ImageURL;
plantImageElement.alt = `${plantItem.PlantName} plant`;

// Get HTML form element
const formElement = mainElement.querySelector("form");

// Set value of hidden plant ID input
formElement.querySelector("input").value = plantItem.PlantID;

// Get HTML select element
const selectElement = mainElement.querySelector("select");

// Add options to select element
for (const sizeItem of plantItem.Sizes) {
  const optionElement = document.createElement("option");
  optionElement.value = sizeItem.PlantSizeID;
  optionElement.textContent = `${sizeItem.PlantSize} ($${sizeItem.Price})`;
  selectElement.appendChild(optionElement);
}

// Add form submission event listener
formElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Create form data object
  const formData = new FormData(formElement);

  // Send form data to server
  await fetch("/cart/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  // Redirect to cart page
  window.location.href = "/cart.html";
});
