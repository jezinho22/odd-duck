console.log("Script linked");

let toyContainer = document.querySelector(".images");
let image1 = document.querySelector(".images img:first-child");
let image2 = document.querySelector(".images img:nth-child(2)");
let image3 = document.querySelector(".images img:nth-child(3)");

console.log(image1);

let totalClicks = 0;
let clicksAllowed = 5;

const state = {
	allToys: [],
};

function Toy(name, src) {
	this.name = name;
	this.src = src;
	views = 0;
	clicks = 0;
	// console.log(this.name + " created");
}
let bag = new Toy("bag", "./images/bag.jpg");
let banana = new Toy("banana", "./images/banana.jpg");
let bathroom = new Toy("bathroom", "./images/bathroom.jpg");
let boots = new Toy("boots", "./images/boots.jpg");
let breakfast = new Toy("breakfast", "./images/breakfast.jpg");
let bubblegum = new Toy("bubblegum", "./images/bubblegum.jpg");
let chair = new Toy("chair", "./images/chair.jpg");
let cthulhu = new Toy("cthulhu", "./images/cthulhu.jpg");
let dogduck = new Toy("dog-duck", "./images/dog-duck.jpg");
let dragon = new Toy("dragon", "./images/dragon.jpg");
let pen = new Toy("pen", "./images/pen.jpg");
let petsweep = new Toy("pet-sweep", "./images/pet-sweep.jpg");
let scissors = new Toy("scissors", "./images/scissors.jpg");
let shark = new Toy("shark", "./images/shark.jpg");
let sweep = new Toy("sweep", "./images/sweep.jpg");
let tauntaun = new Toy("tauntaun", "./images/tauntaun.jpg");
let unicorn = new Toy("unicorn", "./images/unicorn.jpg");
let watercan = new Toy("water-can", "./images/water-can.jpg");
let wineglass = new Toy("wine-glass", "./images/wine-glass.jpg");
state.allToys.push(
	bag,
	banana,
	bathroom,
	boots,
	breakfast,
	bubblegum,
	chair,
	cthulhu,
	dogduck,
	dragon,
	pen,
	petsweep,
	scissors,
	shark,
	sweep,
	tauntaun,
	unicorn,
	watercan,
	wineglass
);

function randomNumber() {
	return Math.floor(Math.random() * state.allToys.length);
}

function displayImages() {
	let imgIndex1;
	let imgIndex2;
	let imgIndex3;
	while (
		imgIndex1 === imgIndex2 ||
		imgIndex2 === imgIndex3 ||
		imgIndex3 === imgIndex1
	) {
		imgIndex1 = randomNumber();
		imgIndex2 = randomNumber();
		imgIndex3 = randomNumber();
	}
	image1.src = state.allToys[imgIndex1].src;
	image1.alt = state.allToys[imgIndex1].name;
	image1.title = state.allToys[imgIndex1].name;
	state.allToys[imgIndex1].views++;

	image2.src = state.allToys[imgIndex2].src;
	image2.alt = state.allToys[imgIndex2].name;
	image2.title = state.allToys[imgIndex2].name;
	state.allToys[imgIndex2].views++;

	image3.src = state.allToys[imgIndex3].src;
	image3.alt = state.allToys[imgIndex3].name;
	image3.title = state.allToys[imgIndex3].name;
	state.allToys[imgIndex3].views++;
}

displayImages();

function picClick(event) {
	console.log("picClick is firing");
	let toyName = event.target.alt;
	for (i = 0; i < state.allToys.length; i++) {
		if (toyName === state.allToys[i].name) {
			state.allToys[i].clicks++;
			totalClicks++;
			break;
		}
	}
	if (totalClicks == clicksAllowed) {
		toyContainer.removeEventListener("click", picClick);
		// toyContainer.className += " not-clickable";
	} else {
		displayImages();
	}
}

toyContainer.addEventListener("click", picClick);