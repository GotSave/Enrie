let parking;
let cars = [];
let score = 0;

function setup()
{
    createCanvas(windowWidth - 10, windowHeight - 30);
    
	parking = new Parking(5);
	
	cars[0] = new Car(-500, 1140);
	cars[1] = new Car(515, 1375);
	cars[2] = new Car(1520, 1125);
}

function draw()
{    
    background(55);
	
    drawSprites();
    cars[0].move(parking.walls, parking.spots, cars);
    cars[1].move(parking.walls, parking.spots, cars);
    cars[2].move(parking.walls, parking.spots, cars);
}

function mousePressed()
{
	for(let i = 0; i < cars.length; i++)
        cars[i].sprite.debug = !cars[i].sprite.debug;
	
    for(let i = 0; i < parking.spots.length; i++)
        parking.spots[i].sprite.debug = !parking.spots[i].sprite.debug;
	
	for(let i = 0; i < parking.wallsSprite.length; i++)
        parking.wallsSprite[i].debug = !parking.wallsSprite[i].debug;
}