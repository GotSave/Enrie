class Car
{
	constructor(x, y)
	{
		this.sprite;
		
		this.sensors = [];
        this.activatedSensors = [];
        this.activatedSensors.fill(-1, -1, -1, -1)
		
		this.acceleration = 0;
		
		this.blocked = false;
		this.parked = false;
		
		this.createSprite(x, y);
	}
	
	createSprite(x, y)
	{
		const carImage = loadImage("./assets/car.png");
		
		this.sprite = createSprite(x, y);
		this.sprite.addImage("normal", carImage);
		
		this.sprite.maxSpeed = 100000;
		this.sprite.friction = .98;
		this.sprite.scale = 0.2;
		
		this.sensors[0] = createVector(this.sprite.position.x + this.sprite.width / 2, this.sprite.position.y + this.sprite.height / 2);
		this.sensors[1] = createVector(this.sprite.position.x + this.sprite.width / 2, this.sprite.position.y - this.sprite.height / 2);
		this.sensors[2] = createVector(this.sprite.position.x - this.sprite.width / 2, this.sprite.position.y + this.sprite.height / 2);
		this.sensors[3] = createVector(this.sprite.position.x - this.sprite.width / 2, this.sprite.position.y - this.sprite.height / 2);
	}
	
	checkBlocked(walls)
	{
		if(this.sprite.collide(walls))
			this.blocked = true;
	}
	
	checkCollision(cars)
	{
		for(let i = 0; i < cars.length; i++)
		{
			if(this.sprite.collide(cars[i].sprite))
				this.blocked = true;
		}
	}
	
	checkUnavailableSpot(spots)
	{
		for(let i = 0; i < spots.length; i++)
            if(!spots[i].active && this.sprite.collide(spots[i].sprite))
				this.blocked = true;
	}
    
    checkSensors(spots)
	{
        for(let i = 0; i < this.sensors.length; i++)
        {
            for(let j = 0; j < spots.length; j++)
            {
                if(spots[j].sprite.overlapPoint(this.sensors[i].x, this.sensors[i].y))
                {
                    this.activatedSensors[i] = j;
                    break;
                }
                else
                    this.activatedSensors[i] = -1;
            }
        }
	}
	
	showSensors()
	{
		strokeWeight(5);
        for(let i = 0; i < this.sensors.length; i++)
        {
            if(this.activatedSensors[i] !== -1)
            {
                push();
                stroke(127, 0, 0);
                point(this.sensors[i].x, this.sensors[i].y);
                pop();
            }
            else
            {
                push();
                stroke(0, 0, 0);
                point(this.sensors[i].x, this.sensors[i].y);
                pop();
            }
        }            
	}
    
    checkParked()
	{
        let spot = this.activatedSensors[0];
        if(spot !== -1)
        {
            for(let i = 1; i < this.sensors.length; i++)
                if(this.activatedSensors[i] === -1 || spot !== this.activatedSensors[i])
                    return;
        }
        else
            return;
        
        this.parked = true;
	}
	
	moveCamera()
	{
		camera.position.x = this.sprite.position.x;
		camera.position.y = this.sprite.position.y;
	}  
	
	move(walls, spots, cars)
	{
		this.moveCamera();
		
		this.checkBlocked(walls);
		this.checkCollision(cars);
		this.checkUnavailableSpot(spots);
        this.checkSensors(spots);
        this.showSensors();
        this.checkParked();
		
		if(!this.blocked && !this.parked)
		{
			if(keyDown(UP_ARROW)) 
				this.acceleration += 3;				
			if(keyDown(DOWN_ARROW))   
				this.acceleration -= 3;
			
			if(this.acceleration < -30 || this.acceleration > 30) 
			{
				if(keyDown(LEFT_ARROW))
                    this.sprite.rotation -= 2;
				if(keyDown(RIGHT_ARROW))
					this.sprite.rotation += 2;
			}
			
			if(this.acceleration > 0)   
				this.acceleration -= 1.5;
			if(this.acceleration < 0)   
				this.acceleration += 1.5;
			
			this.sprite.addSpeed(this.acceleration, this.sprite.rotation);
            
            let a = radians(this.sprite.rotation);
            this.sensors[0] = createVector(this.sprite.position.x + 60 * cos(a + PI / 6), this.sprite.position.y + 60 * sin(a + PI / 6));
            this.sensors[1] = createVector(this.sprite.position.x + 60 * cos(a + (5 * PI) / 6), this.sprite.position.y + 60 * sin(a + (5 * PI) / 6));
            this.sensors[2] = createVector(this.sprite.position.x + 60 * cos(a + (7 * PI) / 6), this.sprite.position.y + 60 * sin(a + (7 * PI) / 6));
            this.sensors[3] = createVector(this.sprite.position.x + 60 * cos(a + (11 * PI) / 6), this.sprite.position.y + 60 * sin(a + (11 * PI) / 6));
		}
	}
}
