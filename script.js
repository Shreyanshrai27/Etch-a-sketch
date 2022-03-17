const styles = document.styleSheets[1];
const container = document.querySelector('.container');
const reset = document.querySelector('.reset');
const random = document.querySelector('.random');
let cells = [];
let newSize;

// initial conditions, 16x16 grid

container.style.gridTemplateColumns = 'repeat(16, auto)';
container.style.gridTemplateRows = 'repeat(16, auto)';

createCells(16);

// main functions 

function createCells(size) {
	for(let i = 0; i < size; i++){
		for(let j = 0; j < size; j++){
			cell = document.createElement('div');
			cell.classList.add('cell');
			container.appendChild(cell);
		}
	}
	cells = Array.from(document.querySelectorAll('.cell'));
	cells.forEach(cell => cell.addEventListener('mouseenter', fill));
}

function deleteCells() {
	cells.forEach(cell => container.removeChild(cell));
	cells = [];
}

function fill(e) {
	e.target.style.backgroundColor = 'black';
}

function validateInput(size) {
	while(size < 1 || size > 100){
		size = Number(prompt('New size has to be between 1px and 100px:'))
	}
	return size
}

// button functions

function resetAndResize() {
	newSize = Number(prompt('Specify the new grid size (Limit: 100px):'))
	if(newSize < 1 || newSize > 100){
		newSize = validateInput(newSize);
	}
	deleteCells();
	container.style.gridTemplateColumns = `repeat(${newSize}, auto)`;
	container.style.gridTemplateRows = `repeat(${newSize}, auto)`;
	createCells(newSize);
}

function getRandomColor() {
	let hexValues = '0123456789ABCDEF';
	let color = '#';
	for(let i = 0; i < 6; i++){
		color += hexValues[Math.floor(Math.random() * 16)];
	}
	return color
}

function setRandomColor(e) {
	e.target.style.backgroundColor = getRandomColor();
}

function changeColors() {
	cells.forEach(cell => {
		cell.removeEventListener('mouseenter', fill);
		cell.addEventListener('mouseenter', setRandomColor);
	});
}

// button events

reset.addEventListener('click', resetAndResize);
random.addEventListener('click', changeColors);