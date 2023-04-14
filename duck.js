console.log("Script linked");

let toyContainer = document.querySelector(".toyContainer");
let image1 = document.querySelector(".toyContainer img:first-child");
let image2 = document.querySelector(".toyContainer img:nth-child(2)");
let image3 = document.querySelector(".toyContainer img:nth-child(3)");

let resetButton = document.querySelector("#resetSurvey");
let clearData = document.querySelector("#clearData");

const state = {
	allToys: [],
};
//
//check if there are locally stored results
if (localStorage.getItem("state")) {
	console.log("local storage exists!");
	recreateState(retrieveState());
} else {
	console.log("no local storage");
	createState();
}

let totalClicks = 0;
let clicksAllowed = 25;

function Toy(name, src, views, clicks) {
	this.name = name;
	this.src = src;
	this.views = views;
	this.clicks = clicks;
	// console.log(this.name + " created");
}
Toy.prototype.perCentLiked = function () {
	console.log(this.views);
	return Math.round((this.clicks / this.views) * 100) + "%";
};
function createState() {
	let bag = new Toy("bag", "./images/bag.jpg", 0, 0);
	let banana = new Toy("banana", "./images/banana.jpg", 0, 0);
	let bathroom = new Toy("bathroom", "./images/bathroom.jpg", 0, 0);
	let boots = new Toy("boots", "./images/boots.jpg", 0, 0);
	let breakfast = new Toy("breakfast", "./images/breakfast.jpg", 0, 0);
	let bubblegum = new Toy("bubblegum", "./images/bubblegum.jpg", 0, 0);
	let chair = new Toy("chair", "./images/chair.jpg", 0, 0);
	let cthulhu = new Toy("cthulhu", "./images/cthulhu.jpg", 0, 0);
	let dogduck = new Toy("dog-duck", "./images/dog-duck.jpg", 0, 0);
	let dragon = new Toy("dragon", "./images/dragon.jpg", 0, 0);
	let pen = new Toy("pen", "./images/pen.jpg", 0, 0);
	let petsweep = new Toy("pet-sweep", "./images/pet-sweep.jpg", 0, 0);
	let scissors = new Toy("scissors", "./images/scissors.jpg", 0, 0);
	let shark = new Toy("shark", "./images/shark.jpg", 0, 0);
	let sweep = new Toy("sweep", "./images/sweep.jpg", 0, 0);
	let tauntaun = new Toy("tauntaun", "./images/tauntaun.jpg", 0, 0);
	let unicorn = new Toy("unicorn", "./images/unicorn.jpg", 0, 0);
	let watercan = new Toy("water-can", "./images/water-can.jpg", 0, 0);
	let wineglass = new Toy("wine-glass", "./images/wine-glass.jpg", 0, 0);
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
}

function randomNumber(array) {
	return Math.floor(Math.random() * array.length);
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

let viewingArray = [];
function makeViewingArray() {
	return Array.from(Array(19).keys());
}
viewingArray = makeViewingArray();

// let lastViewing = [];
function displayImages() {
	let randomIndex;
	let imgIndex1;
	let imgIndex2;
	let imgIndex3;

	randomIndex = randomNumber(viewingArray);
	imgIndex1 = viewingArray[randomIndex];
	// remove index1 replenish list if needed
	viewingArray.splice(randomIndex, 1);
	if (viewingArray.length == 0) {
		viewingArray = makeViewingArray();
	}

	do {
		randomIndex = randomNumber(viewingArray);
		imgIndex2 = viewingArray[randomIndex];
	} while (imgIndex2 === imgIndex1);
	//remove index2 and replenish if needed
	viewingArray.splice(randomIndex, 1);
	if (viewingArray.length == 0) {
		viewingArray = makeViewingArray();
	}

	// get index3 from list, and make sure it is different
	// from index1 and index2
	do {
		randomIndex = randomNumber(viewingArray);
		imgIndex3 = viewingArray[randomIndex];
	} while (imgIndex3 === imgIndex1 || imgIndex3 === imgIndex1);
	// remove index3 from list and replenish if needed
	viewingArray.splice(randomIndex, 1);
	if (viewingArray.length == 0) {
		viewingArray = makeViewingArray();
	}

	console.log(imgIndex1, imgIndex2, imgIndex3);

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
	saveState();
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

function saveState() {
	let stateStringified = JSON.stringify(state);
	localStorage.setItem("state", stateStringified);
}
function retrieveState() {
	if (localStorage.getItem("state")) {
		console.log(localStorage.getItem("state"));
		return JSON.parse(localStorage.getItem("state"));
	}
}

function recreateState(parsedState) {
	state.allToys = [];
	for (i = 0; i < parsedState.allToys.length; i++) {
		let newToy = new Toy(
			parsedState.allToys[i].name,
			parsedState.allToys[i].src,
			parsedState.allToys[i].views,
			parsedState.allToys[i].clicks
		);
		state.allToys.push(newToy);
	}
	console.table(state.allToys);
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

resetButton.addEventListener("click", function () {
	alert("Em obras - Not yet working");
	//restart pics
	//reset click count
	//remove graph and results
});

clearData.addEventListener("click", function () {
	alert("Em obras - Currently only clearing local storage");
	localStorage.clear();
	//restart pics
	//reset click count
	//remove graph
});

// let retrieved = retrieveState();
// recreateState(retrieved);
// localStorage.clear();
