class Parking
{
	constructor(n)
	{
		this.wallWidth = 1000;
		this.wallHeight = 500;

		this.wallsSprite = [];
		this.walls = new Group();
		this.wallsInfos = new Array();
		for(let i = 0; i < 3; i++)
		   this.wallsInfos[i] = new Array();
		
		this.spotNumber = n;
		this.nbrSpot = 5;
		this.maxSpots = 10;
		this.spots = [];
		
		this.spotWidth = 211;
		this.spotHeight = 100;
		
		this.createWalls();
		this.createRandomSpots();
	}
	
	createWalls()
	{
		const verticalWallImage = "./assets/verticalWall.png";
		const horizontalWallImage = "./assets/horizontalWall.png";
		const entryWallImage = "./assets/entryWall.png";
		const entryDownWallImage = "./assets/entryDownWall.png";
		const smallVerticalWallImage = "./assets/smallVerticalWall.png";
		
		this.wallsInfos = [
			[0.5, -0.63, 1.62, -0.125, 1.12, 0.375, 0.625, -0.175, 1.175, 0.32, 0.68, 0.5, 0, 1, 0.13, 0.87],
			[3, 2.25, 2.25, 2.5, 2.5, 2.75, 2.75, 2, 2, 1.5, 1.5, 0, 0.5, 0.5, 1, 1],
			[entryDownWallImage, smallVerticalWallImage, smallVerticalWallImage, horizontalWallImage, horizontalWallImage, smallVerticalWallImage, smallVerticalWallImage, horizontalWallImage, horizontalWallImage, verticalWallImage, verticalWallImage, horizontalWallImage, verticalWallImage, verticalWallImage, entryWallImage, entryWallImage]
		];
		
		for(let i = 0; i < 16; i++)
		{
			this.wallsSprite.push(createSprite(this.wallsInfos[0][i] * this.wallWidth, this.wallsInfos[1][i] * this.wallHeight));
			this.wallsSprite[i].addImage("normal", loadImage(this.wallsInfos[2][i]));
			this.walls.add(this.wallsSprite[i]);
		}
	}
	
	createRandomSpots()
	{
        for(let l = 0 ; l < 2 ; l++)
        {            
			for(let i = 0; i < this.nbrSpot; i++)
				this.spots.push(new Spot(this.spotWidth / 2, i * this.spotHeight + this.spotHeight / 2));
					
            this.spotWidth = this.spotWidth + 1580;
        }
		let picked = [];
		while(picked.length != this.spotNumber)
		{
			let randomSpot = parseInt(random(this.maxSpots));
			if(!picked.includes(randomSpot))
			{
				picked.push(randomSpot)
				this.spots[randomSpot].available = true;
			}		
		}
		
		for(let i = 0; i < this.maxSpots; i++)
			this.spots[i].init();
	}
}
