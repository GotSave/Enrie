const TOTAL = 75;

let leftCars = [];
let bottomCars = [];
let rightCars = [];

let savedLeftCars = [];
let savedBottomCars = [];
//let savedRightCars = [];

let parking;

let startTime, endTime;
let elapsedTime = 0;

let loop = true;
let cycle = 0;

function setup()
{
    createCanvas(windowWidth - 10, windowHeight - 30);
	
	camera.zoom = .5;
	camera.position.x = width / 2 - 300;
	camera.position.y = height / 2 + 300;
    
	parking = new Parking(5);
	
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

	while(loop)
	{
		for(cycle = 0; cycle < 200; cycle++)		
			iterate();
		loop = false;
	}
	
	
	if(cycle >= 149)
	{
		iterate();
		
		background(55);
		
		drawSprites();
	}
}

function iterate()
{
	endTime = new Date();
	elapsedTime = endTime - startTime;
	elapsedTime = new Date(elapsedTime);
			
	/*if(keyWentUp('D'))
		displayDebug();*/
					
	checkProblems(leftCars, savedLeftCars);
	checkProblems(bottomCars, savedBottomCars);
	//checkProblems(rightCars, savedRightCars);
									
	for(let i = leftCars.length - 1; i >= 0; i--)
		leftCars[i].move(parking.walls, parking.spots, bottomCars[i], rightCars[i]);
					
	for(let i = bottomCars.length - 1; i >= 0; i--)
		bottomCars[i].move(parking.walls, parking.spots, leftCars[i], rightCars[i]);
					
	/*for(let i = rightCars.length - 1; i >= 0; i--)
		rightCars[i].move(parking.walls, parking.spots, leftCars[i], bottomCars[i]);*/
			
			
	if(leftCars.length === 0 && bottomCars.length === 0 && rightCars.length === 0)
	{
		nextGeneration(leftCars, -500, 1140, 0, savedLeftCars, parking.spots);
		nextGeneration(bottomCars, 515, 1375, -90, savedBottomCars, parking.spots);
		//nextGeneration(rightCars, 1520, 1125, 180, savedRightCars, parking.spots);
		startTime = endTime;
	}
}

function checkProblems(cars, savedCars)
{
	for(let i = cars.length - 1; i >= 0; i--)
	{
		if(cars[i].blocked || cars[i].parked || cars[i].loop || (cars[i].noMove && elapsedTime.getSeconds() > 5))
		{
			cars[i].sprite.remove();
			savedCars.push(cars.splice(i, 1)[0]);
		}
	}
}

function displayDebug()
{
	for(let i = 0; i < cars.length; i++)
        cars[i].sprite.debug = !cars[i].sprite.debug;
	
    for(let i = 0; i < parking.spots.length; i++)
        parking.spots[i].sprite.debug = !parking.spots[i].sprite.debug;
	
	for(let i = 0; i < parking.wallsSprite.length; i++)
        parking.wallsSprite[i].debug = !parking.wallsSprite[i].debug;
}
