class Car
{
	constructor()
	{
		this.sprite;
		
		this.sensors = [];
		
		this.acceleration = 0;
		
		this.blocked = false;
		this.parked = false;
		
		this.createSprite();
	}
	
	createSprite()
	{
		const carImage = loadImage("./assets/car.png");
		
		this.sprite = createSprite(width / 2, height / 2);
		this.sprite.addImage("normal", carImage);
		
		this.sprite.maxSpeed = 100000;
		this.sprite.friction = .98;
		this.sprite.scale = 0.1;
		
		this.sensors[0] = createVector(this.sprite.position.x + this.sprite.width / 2, this.sprite.position.y + this.sprite.height / 2);
		this.sensors[1] = createVector(this.sprite.position.x + this.sprite.width / 2, this.sprite.position.y - this.sprite.height / 2);
		this.sensors[2] = createVector(this.sprite.position.x - this.sprite.width / 2, this.sprite.position.y + this.sprite.height / 2);
		this.sensors[3] = createVector(this.sprite.position.x - this.sprite.width / 2, this.sprite.position.y - this.sprite.height / 2);
	}
	
	checkBlocked(walls)
	{
		if(this.sprite.collide(walls))
		{
			this.acceleration = 0;
			this.blocked = true;
		}
	}
	
	checkParked(spots)
	{
		for(let i = 0; i < spots.length; i++)
		{
			if(spots[i].active)
			{
				if(this.sprite.collide(spots[i].sprite))
				{
					this.acceleration = 0;
					this.parked = true;
				}
			}
		}
	}
	
	checkSensor(spots)
	{
		for(let i; i < 4; i++)
			if(spots[i].sprite.overlapPoint(this.sensors[i].x, this.sensors[i].y))
				console.log("in");
	}
	
	showSensors()
	{
		stroke(0, 0, 255);
		strokeWeight(5);
		for(let i = 0; i < 4; i++)
		{
			point(this.sensors[i].x, this.sensors[i].y);
		}
	}
	
	moveCamera()
	{
		camera.position.x = this.sprite.position.x;
		camera.position.y = this.sprite.position.y;
	}
	
	move(walls, spots)
	{
		this.moveCamera();
		
		this.checkBlocked(walls);
		//this.checkParked(spots);
		
		if(!this.blocked && !this.parked)
		{
			if(keyDown(UP_ARROW)) 
				this.acceleration = this.acceleration + 3;				
			if(keyDown(DOWN_ARROW))   
				this.acceleration = this.acceleration - 3;
			
			if(this.acceleration < -30 || this.acceleration > 30) // TODO: modifier la rotation en fontion de l'acceleration pour pouvoir simler le fait que l'on tourne moins bien a basse vitesse (set a limit pour highSpeed)
			{
				if(keyDown(LEFT_ARROW))
					this.sprite.rotation -= 2;
				if(keyDown(RIGHT_ARROW))
					this.sprite.rotation += 2;
			}
			
			if(this.acceleration > 3)   
				this.acceleration = this.acceleration - 1.5;
			if(this.acceleration < -3)   
				this.acceleration = this.acceleration + 1.5;
			
			this.sprite.addSpeed(this.acceleration, this.sprite.rotation);
			for(let i = 0; i < 4; i++)
			{
				/*var a = radians(this.sprite.rotation);
				this.sensors[i].x += (cos(a) * this.acceleration) * this.sprite.friction;
				this.sensors[i].y += (sin(a) * this.acceleration) * this.sprite.friction;*/
				this.sensors[i].x = this.sprite.velocity.x;
			}
		}
	}
}
