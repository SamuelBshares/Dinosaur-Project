function DinoData() {
  const dinos = [
    {
      species: "Triceratops",
      weight: 13000,
      height: 114,
      diet: "herbavor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "First discovered in 1889 by Othniel Charles Marsh",
    },
    {
      species: "Tyrannosaurus Rex",
      weight: 11905,
      height: 144,
      diet: "carnivor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "The largest known skull measures in at 5 feet long.",
    },
    {
      species: "Anklyosaurus",
      weight: 10500,
      height: 55,
      diet: "herbavor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "Anklyosaurus survived for approximately 135 million years.",
    },
    {
      species: "Brachiosaurus",
      weight: 70000,
      height: "372",
      diet: "herbavor",
      where: "North America",
      when: "Late Jurasic",
      fact: "An asteroid was named 9954 Brachiosaurus in 1991.",
    },
    {
      species: "Stegosaurus",
      weight: 11600,
      height: 79,
      diet: "herbavor",
      where: "North America, Europe, Asia",
      when: "Late Jurasic to Early Cretaceous",
      fact: "The Stegosaurus had between 17 and 22 seperate places and flat spines.",
    },
    {
      species: "Elasmosaurus",
      weight: 16000,
      height: 59,
      diet: "carnivor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "Elasmosaurus was a marine reptile first discovered in Kansas.",
    },
    {
      species: "Pteranodon",
      weight: 44,
      height: 20,
      diet: "carnivor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "Actually a flying reptile, the Pteranodon is not a dinosaur.",
    },
    {
      species: "Pigeon",
      weight: 0.5,
      height: 9,
      diet: "herbavor",
      where: "World Wide",
      when: "Holocene",
      fact: "All birds are living dinosaurs.",
    },
  ];
  return dinos;
}

const form = document.getElementById("dino-compare");
const grid = document.getElementById("grid");

// Create Dino Constructor
class Dino {
  constructor(species, diet, where, when, fact, image) {
    this.species = species;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.image = image;
  }
}

// Create Dino Objects
function getDinoObject() {
  dinoArray = new Array();
  const dinos = DinoData();
  dinos.forEach((dino) => {
    dinoArray.push(
      new Dino(
        dino.species,
        dino.diet,
        dino.where,
        dino.when,
        dino.fact,
        dino.image
      )
    );
  });
  //Placeholder for human so it's in center
  dinoArray.splice(4, 0, "");
  return dinoArray;
}

// Create Human Object

class Human {
  constructor(name, height, weight, diet) {
    this.species = name;
    this.height = height;
    this.weight = weight;
    this.diet = diet;
  }
}

const human = new Human();

// Use IIFE to get human data from form

const getHumanData = (function () {
  function humanData() {
    human.name = document.getElementById("name").value;
    human.height =
      parseInt(document.getElementById("feet").value) * 12 +
      parseInt(document.getElementById("inches").value);
    human.weight = parseInt(document.getElementById("weight").value);
    human.diet = parseInt(document.getElementById("diet").value);
  }
  return { human: humanData };
})();
// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

function weightCompare(dinosaur) {
  const difference = Math.round(dinosaur.weight - human.weight);

  if (dinosaur.weight > human.weight) {
    return `${dinosaur} is ${difference}lbs heavier than you`;
  } else if ((dinosaur.weight = human.weight)) {
    return `You are as heavy as ${dinosaur.species}`;
  } else {
    return `You are ${difference}lbs heavier than a ${dinosaur.species}`;
  }
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function heightCompare(dinosaur) {
  const InchesDifference = Math.floor((dinosaur.height - human.height) % 12);

  if (dinosaur.height > human.height) {
    return `${dinosaur.species} is ${InchesDifference} Inches taller than you`;
  } else if ((dinosaur.height = human.height)) {
    return `You are as tall as ${dinosaur.species}`;
  } else {
    return `You are ${InchesDifference} Inches taller than a ${dinosaur.species}`;
  }
}
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function dietCompare(dinosaur) {
  if (dinosaur.diet === human.diet.toLowerCase()) {
    return `You and ${dinosaur.species} share the same diet as a ${dinosaur.diet}`;
  } else {
    return `${dinosaur.species} is a ${dinosaur.diet}`;
  }
}
function factWhere(dinosaur) {
  return `The ${dinosaur.species} lived in ${dinosaur.where}.`;
}

function factWhen(dinosaur) {
  return `The ${dinosaur.species} lived in the ${dinosaur.when} period.`;
}
// Generate Tiles for each Dino in Array
function generateTiles(object) {
  let fact;
  // Returns one random fact, except Pigeon (same fact output)
  const numberGenerator = Math.round(Math.random() * 5);

  switch (numberGenerator) {
    case 0:
      fact = object.fact;
      break;
    case 1:
      fact = factWhere(object);
      break;
    case 2:
      fact = factWhen(object);
      break;
    case 3:
      fact = heightCompare(object);
      break;
    case 4:
      fact = weightCompare(object);
      break;
    case 5:
      fact = dietCompare(object);
      break;
    default:
      fact = "Dinosaurs are extinct";

      const tile = document.createElement("div");
      tile.classList.add("grid-item");
      tile.innterHTML = `<h3>${
        object.species
      }</h3><img src="images/${object.species.toLowerCase()}.png" alt="${
        object.species
      }"><p>${fact}</p>`;
      return tile;
  }
}
// Creating grid for the human object
function generateHumanTile(human) {
  const humanTile = document.createElement("div");
  humanTile.classList.add("grid-item");
  humanTile.innerHTML = `<h3>${human.name}</h3><img src="images/human.png" alt="${human.species}"><p>`;
  return humanTile;
}

//Add tiles to DOM
function addTiles() {
  // Creating framgment to attach
  getHumanData.human();
  const grid = document.getElementById("grid");
  const array = getDinoObject();

  for (let i = 0; i < 9; i++) {
    if (i === 4) {
      grid.appendChild(generateHumanTile(human));
    }
    grid.appendChild(generateTiles(array[i]));
    //attach grid elemts to the DOM
    return grid;
  }
}
// Remove form from screen

function remove() {
  form.style.display = "none";
}

//On button click, prepare and display infographic
function click(e) {
  e.preventDefault();
  remove();
  addTiles();
}

(function () {
  document.getElementById("btn").addEventListener("click", click);
})();
