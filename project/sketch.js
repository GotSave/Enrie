let parking;
let car;

function setup()
{
    createCanvas(windowWidth - 10, windowHeight - 20);
    
	parking = new Parking(3);
	
	car = new Car();
}

function draw()
{
    background(55);
	
	car.move(parking.walls, parking.spots);
	car.showSensors();
	car.sprite.debug = mouseIsPressed;
	
	drawSprites();
}
