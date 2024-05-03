// Get plant list and template
const plantListElement = document.getElementById("plant-list");
const plantItemTemplate = document.getElementById("plant-item");

// Fetch plant list from server
const plantList = await (await fetch("/plants")).json();

// Add items to plant list
for (const plantItem of plantList) {
  // Clone plant item template
  const plantItemElement = plantItemTemplate.content.cloneNode(true);

  // Set link to plant detail page
  plantItemElement.querySelector("a").href =
    `/plant.html?id=${plantItem.PlantID}`;

  // Set plant name and start price
  plantItemElement.querySelector("h2").textContent = plantItem.PlantName;
  plantItemElement.querySelector("p").textContent =
    `Available from $${plantItem.StartPrice}`;

  // Set plant image
  const plantImageElement = plantItemElement.querySelector("img");
  plantImageElement.src = plantItem.ImageURL;
  plantImageElement.alt = `${plantItem.PlantName} plant`;

  // Append plant item to list
  plantListElement.appendChild(plantItemElement);
}
