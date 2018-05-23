class Spot
{
	constructor(x, y)
	{
		this.sprite;
		
		this.x = x;
		this.y = y;
		
		this.available = false;
	}
	
	init(rotate)
	{
		let spotImage;
		
		if(this.available)
			spotImage = loadImage("./assets/availableSpot.png");
		else
			spotImage = loadImage("./assets/unavailableSpot.png");
		
		this.sprite = createSprite(this.x, this.y);
        if(rotate)
            this.sprite.rotation = 180;
		
		this.sprite.addImage("normal", spotImage);
	}
}
