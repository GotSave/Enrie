let parking;
let car;
let score = 0;

function setup()
{
    createCanvas(windowWidth - 10, windowHeight - 20);
    
	parking = new Parking(5);
	
	car = new Car();
}

function draw()
{

    
    background(55);
	
    drawSprites();
    car.move(parking.walls, parking.spots);
}

function mousePressed()
{
    car.sprite.debug = !car.sprite.debug;
    for(let i = 0; i < parking.spots.length; i++)
        parking.spots[i].sprite.debug = !parking.spots[i].sprite.debug;
}