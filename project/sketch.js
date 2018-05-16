const TOTAL  = 50;
let leftCars = [];
let bottomCars = [];
let rightCars = [];

let savedCars = [];

let parking;

function setup()
{
    createCanvas(windowWidth - 10, windowHeight - 30);
	
	camera.zoom = .5;
	camera.position.x = width / 2 - 300;
	camera.position.y = height / 2 + 300;
    
	parking = new Parking(5);
	
	for(let i = 0; i < TOTAL; i++)
	{
		leftCars.push(new Car(-500, 1140));
		
		bottomCars.push(new Car(515, 1375));
		bottomCars[i].sprite.rotation = -90;
		
		rightCars.push(new Car(1520, 1125));
		rightCars[i].sprite.rotation = 180;
	}
	
	/*cars[0] = new Car(-500, 1140);
	cars[1] = new Car(515, 1375);
	cars[1].sprite.rotation = -90;
	cars[2] = new Car(1520, 1125);
	cars[2].sprite.rotation = 180;*/
}

function draw()
{		
	if(keyDown(UP_ARROW)) 
		camera.position.y -= 5;
	if(keyDown(DOWN_ARROW))
		camera.position.y += 5;
	if(keyDown(LEFT_ARROW))
		camera.position.x -= 5;
	if(keyDown(RIGHT_ARROW))
		camera.position.x += 5;
	
	if(keyWentUp('D'))
		displayDebug();
	
	background(55);
	
    drawSprites();
	
	for(let i = 0; i < TOTAL; i++)
	{
		leftCars[i].move(parking.walls, parking.spots, leftCars);
		bottomCars[i].move(parking.walls, parking.spots, bottomCars);
		rightCars[i].move(parking.walls, parking.spots, rightCars);
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