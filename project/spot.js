class Spot
{
	constructor(x, y)
	{
		this.sprite;
		
		this.x = x;
		this.y = y;
		
		this.active = false;
	}
	
	init()
	{
		let spotImage;
		
		if(this.active)
			spotImage = loadImage("./assets/availableSpot.png");
		else
			spotImage = loadImage("./assets/unavailableSpot.png");
		
		this.sprite = createSprite(this.x, this.y);
		
		this.sprite.addImage("normal", spotImage);
	}
}
