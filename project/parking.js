class Parking
{
	constructor(n)
	{
		this.walls = new Group();
		
		this.wallWidth = 1000;
		this.wallHeight = 500;
		
		this.spotNumber = n;
		this.maxSpots = 5; // a changer en fonction de l'evolution du parking
		this.spots = [];
		
		this.spotWidth = 211;
		this.spotHeight = 100;
		
		this.createWalls();
		this.createObstacles();
		this.createRandomSpots();
	}
	
	createWalls()
	{
		const verticalWallImage = loadImage("./assets/verticalWall.png");
		const horizontalWallImage = loadImage("./assets/horizontalWall.png");
		const entryWall = loadImage("./assets/entryWall.png");
		
		let upWall = createSprite(this.wallWidth / 2, 0);
		upWall.addImage("normal", horizontalWallImage);
		this.walls.add(upWall);
		
		let leftWall = createSprite(0, this.wallHeight / 2);
		leftWall.addImage("normal", verticalWallImage);
		this.walls.add(leftWall);
		
		let rightWall = createSprite(this.wallWidth, this.wallHeight / 2);
		rightWall.addImage("normal", verticalWallImage);
		this.walls.add(rightWall);
		
		let leftEntryWall = createSprite(this.wallWidth / 8, this.wallHeight);
		leftEntryWall.addImage("normal", entryWall);
		this.walls.add(leftEntryWall);
		
		let rightEntryWall = createSprite((7 / 8) * this.wallWidth, this.wallHeight);
		rightEntryWall.addImage("normal", entryWall);
		this.walls.add(rightEntryWall);
	}
	
	createObstacles()
	{
	
	}
	
	createRandomSpots()
	{
		for(let i = 0; i < this.maxSpots; i++)
			this.spots.push(new Spot(this.spotWidth / 2, i * this.spotHeight + this.spotHeight / 2));
		
		let picked = [];
		while(picked.length != this.spotNumber)
		{
			let randomSpot = parseInt(random(this.maxSpots));
			if(!picked.includes(randomSpot))
			{
				picked.push(randomSpot)
				this.spots[randomSpot].active = true;
			}		
		}
		
		for(let i = 0; i < this.maxSpots; i++)
			this.spots[i].init();
	}
}
