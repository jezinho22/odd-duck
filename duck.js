console.log("Script linked");

let toyContainer = document.querySelector(".toyContainer");
let image1 = document.querySelector(".toyContainer img:first-child");
let image2 = document.querySelector(".toyContainer img:nth-child(2)");
let image3 = document.querySelector(".toyContainer img:nth-child(3)");

console.log(image1);

let totalClicks = 0;
let clicksAllowed = 5;

const state = {
	allToys: [],
};

function Toy(name, src) {
	this.name = name;
	this.src = src;
	this.views = 5;
	this.clicks = 1;
	// console.log(this.name + " created");
}
Toy.prototype.perCentLiked = function () {
	console.log(this.views);
	return Math.round((this.clicks / this.views) * 100) + "%";
};

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

function comparePic(imgIndex) {
	console.log("comparePic firing");
	if (
		image1.alt === state.allToys[imgIndex].name ||
		image2.alt === state.allToys[imgIndex].name ||
		image3.alt === state.allToys[imgIndex].name
	) {
		return true;
	}
}
function displayImages() {
	let imgIndex1 = randomNumber();
	let imgIndex2 = randomNumber();
	let imgIndex3 = randomNumber();

	while (
		comparePic(imgIndex1) ||
		comparePic(imgIndex2) ||
		comparePic(imgIndex3)
	) {
		imgIndex1 = randomNumber();
		imgIndex2 = randomNumber();
		imgIndex3 = randomNumber();
		while (
			imgIndex1 === imgIndex2 ||
			imgIndex2 === imgIndex3 ||
			imgIndex3 === imgIndex1
		) {
			imgIndex1 = randomNumber();
			imgIndex2 = randomNumber();
			imgIndex3 = randomNumber();
		}
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

function displayResults() {
	let ul = document.querySelector("#results");

	for (i = 0; i < state.allToys.length; i++) {
		let li = document.createElement("li");
		li.textContent = `${state.allToys[i].name}: ${
			state.allToys[i].views
		} views and ${state.allToys[i].clicks} likes = ${state.allToys[
			i
		].perCentLiked()}`;
		ul.appendChild(li);
	}
}

function displayChart() {
	const toyNames = [];
	const toyViews = [];
	const toyClicks = [];
	for (i = 0; i < state.allToys.length; i++) {
		let toy = state.allToys[i];

		toyNames.push(toy.name);
		toyViews.push(toy.views);
		toyClicks.push(toy.clicks);
	}
	const data = {
		labels: toyNames,
		datasets: [
			{
				label: "Times viewed",
				data: toyViews,
				backgroundColor: ["lightblue"],
				borderColor: ["darkblue"],
				borderWidth: 1,
			},
			{
				label: "Times chosen",
				data: toyClicks,
				backgroundColor: ["lightred"],
				borderColor: ["darkred"],
				borderWidth: 1,
			},
		],
	};
	const config = {
		type: "bar",
		data: data,
		options: {
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		},
	};
	let chartSpace = document.querySelector("#myChart");
	new Chart(chartSpace, config);
}

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
		displayResults();
		displayChart();
		// toyContainer.className += " not-clickable";
	} else {
		displayImages();
	}
}

toyContainer.addEventListener("click", picClick);
