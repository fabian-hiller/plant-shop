// get plant item
const plantItem = document.getElementById("plant-item");
// get size of the plants through selecting the size
const smallButton = document.getElementById("small-button");
const mediumButton = document.getElementById("medium-button");
const largeButton = document.getElementById("large-button");
const cancel = document.getElementById("cancel-button");

function onClickSmallSize() {
  mediumButton.disabled = true;
  largeButton.disabled = true;
}

function onClickMediumSize() {
  smallButton.disabled = true;
  largeButton.disabled = true;
}

function onClickLargeSize() {
  smallButton.disabled = true;
  mediumButton.disabled = true;
}

function onClickCancel() {
  smallButton.disabled = false;
  mediumButton.disabled = false;
  largeButton.disabled = false;
}

function onAddToCart() {
  //replace - post cartItems database
  const cartButtonElement = document.getElementById("cart-button");
  const cartCount = 1;
  cartButtonElement.querySelector("span").textContent = cartCount;
}

// TODO: Replace code and fetch list from server
const plantList = [
  {
    PlantId: 1,
    PlantName: "Pianola",
    ImageURL: "/images/pianola.jpg",
    StartPrice: 43,
  },
  {
    PlantId: 2,
    PlantName: "Aragoda",
    ImageURL: "/images/aragoda.jpg",
    StartPrice: 36,
  },
  {
    PlantId: 3,
    PlantName: "Unosao",
    ImageURL: "/images/unosao.jpg",
    StartPrice: 68,
  },
  {
    PlantId: 4,
    PlantName: "Wonabu",
    ImageURL: "/images/wonabu.jpg",
    StartPrice: 52,
  },
];

// Get PlantId from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const plantId = parseInt(urlParams.get("id"));
console.log(urlParams);
console.log(plantId);

// if plantid is same as the plant id in the platlist
const desiredPlant = plantList.find((plant) => plant.PlantId === plantId);
// get
if (desiredPlant) {
  console.log(desiredPlant.PlantName);

  // Set plant name and start price
  plantItem.querySelector("h2").textContent = desiredPlant.PlantName;
  plantItem.querySelector("p").textContent =
    `Available from $${desiredPlant.StartPrice}`;
  // Set plant image
  plantItem.querySelector("img").src = desiredPlant.ImageURL;
  plantItem.querySelector("img").alt = `${desiredPlant.PlantName} plant`;
} else {
  console.log(`Plant with PlantId ${plantId} not found.`);
}
