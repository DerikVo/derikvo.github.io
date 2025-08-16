const bingoContent = [
  { type: "text", text: "Has a dog" },
  { type: "text", text: "Has a cat" },
  { type: "text", text: "Wearing glasses today" },
  { type: "text", text: "Has blue eyes" },
  { type: "text", text: "Has brown eyes" },
  { type: "text", text: "Curtains are visible" },
  { type: "text", text: "Has a water bottle" },
  { type: "text", text: "Is sitting on the floor" },
  { type: "text", text: "Has a pillow" },
  { type: "text", text: "Has pink nail polish" },
  { type: "text", text: "Has white nail polish" },
  { type: "text", text: "Has a nose piercing" },
  { type: "text", text: "Has earrings on" },
  { type: "text", text: "Has a microphone" },
  { type: "text", text: "Is biting their nails" },
  { type: "text", text: "Is wearing a necklace" },
  { type: "text", text: "Has coffee or tea" },
  { type: "text", text: "Is working from bed" },
  { type: "text", text: "Is wearing blue" },
  { type: "text", text: "Uses a virtual background" },
  { type: "text", text: "Has no background" },
  { type: "text", text: "Has a pony tail" },
  { type: "text", text: "A plant is visible" },
  { type: "text", text: "Has a blurred background" },
  { type: "text", text: "Is eating" },
  { type: "text", text: "Is drinking" },
  { type: "text", text: "Has posters on their wall" },
  { type: "text", text: "Has blonde hair" },
  { type: "text", text: "Has black hair" },
  { type: "text", text: "Has brown hair" },
  { type: "text", text: "Is wearing white" },
  { type: "text", text: "Is wearing black" },
  { type: "text", text: "Is wearing pajamas" },
  { type: "text", text: "Is wearing glasses" },
  { type: "text", text: "Is in an office" },
  { type: "text", text: "Has long hair" },
  { type: "text", text: "Has short hair" },
  { type: "text", text: "Teaches at the same district" },
  { type: "text", text: "Teaches at the same school" },
  { type: "text", text: "Earning the same credential" },
  { type: "text", text: "Wearing Glasses" },
  { type: "text", text: "Is wearing a watch" },
  { type: "text", text: "Is wearing a ring" },
  { type: "text", text: "Has clips in their hair" },
  { type: "text", text: "Another person is visible" },
];

function generateBingoCard(contentList, size = 5) {
  if (size * size > contentList.length) {
    throw new Error(
      `Not enough content to fill the bingo card of size ${size}x${size}.`
    );
  }

  const selectedContent = contentList
    .sort(() => Math.random() - 0.5)
    .slice(0, size * size);
  const card = [];

  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      const cellContent = selectedContent[i * size + j];
      if (i === Math.floor(size / 2) && j === Math.floor(size / 2)) {
        row.push({ type: "text", text: "FREE SPACE" });
      } else {
        row.push(cellContent);
      }
    }
    card.push(row);
  }

  return card;
}

function createBingoButton(cellContent, i, j) {
  const button = document.createElement("button");
  button.textContent = cellContent.text;
  button.style.width = "200px";
  button.style.height = "200px";
  button.style.border = "2px solid white";
  button.style.margin = "2px";
  button.style.fontSize = "12px";
  button.style.fontWeight = "bold";
  button.style.backgroundColor = "black";
  button.style.color = "white";

  button.addEventListener("click", () => {
    if (button.style.backgroundColor === "green") {
      button.style.backgroundColor = "black";
    } else {
      button.style.backgroundColor = "green";
    }
  });

  return button;
}

function renderBingoCard(card, size) {
  const gridContainer = document.getElementById("bingo-grid");
  gridContainer.innerHTML = ""; // Clear previous grid

  card.forEach((row, i) => {
    const rowElement = document.createElement("div");
    rowElement.style.display = "flex";

    row.forEach((cell, j) => {
      const button = createBingoButton(cell, i, j);
      rowElement.appendChild(button);
    });

    gridContainer.appendChild(rowElement);
  });
}

function initBingo() {
  const card = generateBingoCard(bingoContent, 5);
  renderBingoCard(card, 5);
}

document.addEventListener("DOMContentLoaded", () => {
  initBingo();
});
