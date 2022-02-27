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
  dinoArray.splice(4, 0, humanData);
  return dinoArray;
}

const dino = new Dino();
// Create Human Object

class Human {
  constructor(species, height, weight, diet) {
    this.species = species;
    this.height = height;
    this.weight = weight;
    this.diet = diet;
  }
}

// Use IIFE to get human data from form

const humanData = (function () {
  const species = document.getElementById("name").value;
  const height =
    Number(document.getElementById("feet").value) * 12 +
    Number(document.getElementById("inches").value);
  const weight = Number(document.getElementById("weight").value);
  const diet = document.getElementById("diet").value;

  let human = new Human(species, height, weight, diet);

  return human;
})();
let human = humanData;

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
// Comparing the weights
Dino.prototype.weightCompare = function () {
  const difference = Math.round(this.weight - human.weight);

  if (this.weight > human.weight) {
    return `${this.species} is ${difference}lbs heavier than you`;
  } else if ((this.weight = human.weight)) {
    return `You are as heavy as ${this.species}`;
  } else {
    return `You are ${difference}lbs heavier than a ${this.species}`;
  }
};

//Comparing the heights
Dino.prototype.heightCompare = function () {
  //InchesDifference converted in inches with the modulo
  const InchesDifference = Math.floor((this.height - human.weight) % 12);

  if (this.height > human.height) {
    return `${this.species} is ${InchesDifference} Inches taller than you`;
  } else if ((this.height = human.height)) {
    return `You are as tall as ${this.species}`;
  } else {
    return `You are ${InchesDifference} Inches taller than a ${this.species}`;
  }
};
//Comparing the diets
Dino.prototype.dietCompare = function () {
  if (this.diet === human.diet.toLowerCase()) {
    return `You and ${this.species} share the same diet as a ${this.diet}`;
  } else {
    return `${this.species} is a ${this.diet}`;
  }
};
//Facts where the dinosaurs lived
Dino.prototype.factWhere = function () {
  return `The ${this.species} lived in ${this.where}.`;
};

//Facts when the dinosaurs lived
Dino.prototype.factWhen = function () {
  return `The ${this.species} lived in the ${this.when} period.`;
};

//Generating a function to randomly pick a fact function out of 5
Dino.prototype.factGenerator = function () {
  //generates a number between 0 and 5
  const numberGenerator = Math.round(Math.random() * 5);
  // Random number equals the case number
  switch (numberGenerator) {
    case 0:
      return this.fact;
    case 1:
      return this.factWhere();
    case 2:
      return this.factWhen();
    case 3:
      return this.heightCompare();
    case 4:
      return this.weightCompare();
    case 5:
      return this.dietCompare();
  }
};

//Creates the grid
function gridCreation() {
  //removes the form table
  (function remove() {
    form.style.display = "none";
  })();

  //Creates the dinosaur tiles
  (function addTiles() {
    // Array of Dino Objets
    let dinos = getDinoObject();

    dinos.forEach((dinosaur) => {
      const tile = document.createElement("div");
      tile.classList.add("grid-item");
      const name = document.createElement("h3");
      const image = document.createElement("img");
      const fact = document.createElement("p");

      dino.species = dinosaur.species;
      dino.height = dinosaur.height;
      dino.weight = dinosaur.weight;
      dino.diet = dinosaur.diet;
      dino.fact = dinosaur.fact;
      dino.where = dinosaur.where;
      dino.when = dinosaur.when;

      // Excpetions for Pigeon fact and adds the human into grid
      if (dino.species === "Pigeon") {
        fact.innerHTML = dinosaur.fact;
        image.setAttribute(
          "src",
          `images/${dinosaur.species.toLowerCase()}.png`
        );
      } else if (dinosaur instanceof Human) {
        fact.innerHTML = `${human.species}`;
        image.setAttribute("src", "/images/human.png");
      } else {
        fact.innerHTML = dinosaur.factGenerator();
        image.setAttribute(
          "src",
          `images/${dinosaur.species.toLowerCase()}.png`
        );
      }
      name.innerHTML = dinosaur.species;

      tile.appendChild(name);
      tile.appendChild(fact);
      tile.appendChild(image);
      grid.appendChild(tile);
    });
  })();
}

//On button click, prepare and display infographic
function click(e) {
  e.preventDefault();
  gridCreation();
}

(function () {
  document.getElementById("btn").addEventListener("click", click);
})();
