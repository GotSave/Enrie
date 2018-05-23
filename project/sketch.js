let total = 150;

let leftCars = [];
let bottomCars = [];

let savedLeftCars = [];
let savedBottomCars = [];

let parking;
let nbParkingSpot = 10;

let startTime, endTime;
let elapsedTime = 0;

let nbGeneration = 0;
let nbLastParked = 0;
let nbParked = 0;

let inputTotal;
let inputSpots;

function setup()
{    
    createCanvas(windowWidth - 20, windowHeight - 50);
    
    inputTotal = createInput(150);
    inputSpots = createInput(10);
    
    resetSketch();
    
    let button = createButton('restart');
    button.mousePressed(resetSketch);
}

function draw()
{		
    iterate();
    
    background(55);
	
    drawSprites();
    
    fill(255);
    textSize(64);
    text("Generations: " + nbGeneration, -width / textDescent() * 10, textAscent());
    text("Voitures gares: " + nbLastParked, -width / textDescent() * 10, textAscent() * 3);	
}

function resetSketch()
{    
    total = inputTotal.value();
    nbParkingSpot = inputSpots.value();
    
    for(let i = 0; i < leftCars.length; i++)
        leftCars[i].sprite.remove();
    
    for(let i = 0; i < bottomCars.length; i++)
        bottomCars[i].sprite.remove();
    
    leftCars = [];
    bottomCars = [];
    
    savedLeftCars = [];
    savedBottomCars = [];
    
    if(parking)
        for(let i = 0; i < parking.spots.length; i++)
            if(parking.spots[i].available === false)
                parking.spots[i].sprite.remove();

    nbGeneration = 0;
    nbLastParked = 0;
    nbParked = 0;
    
    camera.zoom = .5;
	camera.position.x = width / 2 - 300;
	camera.position.y = height / 2 + 300;
    
	parking = new Parking(nbParkingSpot);
    console.log(parking);
    
    let purpleCarImage = loadImage("./assets/purple_car.png");
    let greenCarImage = loadImage("./assets/green_car.png");
	
	for(let i = 0; i < total; i++)
	{
		leftCars.push(new Car(-500, 1140, parking.spots, null, purpleCarImage));
		
		bottomCars.push(new Car(515, 1375, parking.spots, null, greenCarImage));
		bottomCars[i].sprite.rotation = -90;
	}
	
	startTime = new Date();
}

function checkProblems(cars, savedCars)
{
	for(let i = cars.length - 1; i >= 0; i--)
	{
		if(cars[i].blocked || cars[i].loop || (cars[i].noMove && elapsedTime.getSeconds() > 5))
		{
			cars[i].sprite.remove();
			savedCars.push(cars.splice(i, 1)[0]);
		}
        else if(cars[i].parked)
        {
            cars[i].sprite.remove();
			savedCars.push(cars.splice(i, 1)[0]);
            nbParked++;
        }
	}
}

function iterate()
{
    endTime = new Date();
    elapsedTime = endTime - startTime;
    elapsedTime = new Date(elapsedTime);

    checkProblems(leftCars, savedLeftCars);
    checkProblems(bottomCars, savedBottomCars);

    for(let i = leftCars.length - 1; i >= 0; i--)
        leftCars[i].move(parking.walls, parking.spots, bottomCars[i]);

    for(let i = bottomCars.length - 1; i >= 0; i--)
        bottomCars[i].move(parking.walls, parking.spots, leftCars[i]);

    if(leftCars.length === 0 && bottomCars.length === 0)
        changeGeneration();
}

function changeGeneration()
{
    nextGeneration(leftCars, -500, 1140, 0, savedLeftCars, parking.spots);
    nextGeneration(bottomCars, 515, 1375, -90, savedBottomCars, parking.spots);
    startTime = endTime;
    nbGeneration++;
    nbLastParked = nbParked;
    nbParked = 0;
}