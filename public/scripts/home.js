// Get plant list and template
const plantListElement = document.getElementById("plant-list");
const plantItemTemplate = document.getElementById("plant-item");

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

// Add items to plant list
for (const plant of plantList) {
  // Clone plant item template
  const plantItemElement = plantItemTemplate.content.cloneNode(true);

  // Set link to plant detail page
  plantItemElement.querySelector("a").href = `/plant.html?id=${plant.PlantId}`;

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
