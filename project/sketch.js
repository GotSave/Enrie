const TOTAL = 150;

let leftCars = [];
let bottomCars = [];
let rightCars = [];

let savedLeftCars = [];
let savedBottomCars = [];
//let savedRightCars = [];

let parking;

let startTime, endTime;
let elapsedTime = 0;

let nbGeneration = 0;
let nbLastParked = 0;
let nbParked = 0;

function setup()
{
    createCanvas(windowWidth - 10, windowHeight - 30);
	
	camera.zoom = .5;
	camera.position.x = width / 2 - 300;
	camera.position.y = height / 2 + 300;
    
	parking = new Parking(10);
	
	for(let i = 0; i < TOTAL; i++)
	{
		leftCars.push(new Car(-500, 1140, parking.spots));
		
		bottomCars.push(new Car(515, 1375, parking.spots));
		bottomCars[i].sprite.rotation = -90;
		
		/*rightCars.push(new Car(1520, 1125, parking.spots));
		rightCars[i].sprite.rotation = 180;*/
	}
	
	startTime = new Date();
}

function draw()
{		
    iterate();
    
    background(55);
	
    drawSprites();
    
    fill(255);
    textSize(64);
    text("Generations: " + nbGeneration, -1250, -100);	
    text("Voitures gares: " + nbLastParked, -1250, 0);	
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
        leftCars[i].move(parking.walls, parking.spots, bottomCars[i], rightCars[i]);

    for(let i = bottomCars.length - 1; i >= 0; i--)
        bottomCars[i].move(parking.walls, parking.spots, leftCars[i], rightCars[i]);

    if(leftCars.length === 0 && bottomCars.length === 0 && rightCars.length === 0)
    {
        nextGeneration(leftCars, -500, 1140, 0, savedLeftCars, parking.spots);
        nextGeneration(bottomCars, 515, 1375, -90, savedBottomCars, parking.spots);
        startTime = endTime;
        nbGeneration++;
        nbLastParked = nbParked;
        nbParked = 0;
    }
}
