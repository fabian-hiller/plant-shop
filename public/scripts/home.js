// Get plant list and template
const plantListElement = document.getElementById("plant-list");
const plantItemTemplate = document.getElementById("plant-item");

// Fetch plant list from server
const plantList = await (await fetch("/plants")).json();

// Add items to plant list
for (const plant of plantList) {
  // Clone plant item template
  const plantItemElement = plantItemTemplate.content.cloneNode(true);

  // Set link to plant detail page
  plantItemElement.querySelector("a").href = `/plant.html?id=${plant.PlantID}`;

  // Set plant name and start price
  plantItemElement.querySelector("h2").textContent = plant.PlantName;
  plantItemElement.querySelector("p").textContent =
    `Available from $${plant.StartPrice}`;

  // Set plant image
  plantItemElement.querySelector("img").src = plant.ImageURL;
  plantItemElement.querySelector("img").alt = `${plant.PlantName} plant`;

  // Append plant item to list
  plantListElement.appendChild(plantItemElement);
}
