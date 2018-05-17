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
		
		this.wMin = -650;
		this.wMax = 1120;
		
		this.hMax = 1450;
		
		this.brain = new NeuralNetwork(10, 10, 4);
		
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
	
	think(spot)
	{		
		let inputs = [];
		inputs[0] = (this.sensors[0].x - this.wMin) / (-this.wMin + this.wMax);
		inputs[1] = this.sensors[0].y / this.hMax;
		inputs[2] = (this.sensors[1].x - this.wMin) / (-this.wMin + this.wMax);
		inputs[3] = this.sensors[1].y / this.hMax;
		inputs[4] = (this.sensors[2].x - this.wMin) / (-this.wMin + this.wMax);
		inputs[5] = this.sensors[2].y / this.hMax;
		inputs[6] = (this.sensors[3].x - this.wMin) / (-this.wMin + this.wMax);
		inputs[7] = this.sensors[3].y / this.hMax;
		inputs[8] = (spot.sprite.position.x - this.wMin) / (-this.wMin + this.wMax);
		inputs[9] = spot.sprite.position.y / this.hMax;
		
		let outputs = this.brain.predict(inputs);
		
		if(outputs[0] > 0.5)
			this.goForward();
		if(outputs[1] > 0.5)
			this.goRight();
		if(outputs[2] > 0.5)
			this.goBackward();
		if(outputs[3] > 0.5)
			this.goLeft();
	}
	
	chooseSpot(spots)
	{
		for(let i = 0; i < spots.length; i++)
			if(spots[i].available)
				return spots[i];
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
            if(!spots[i].available && this.sprite.collide(spots[i].sprite))
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
	
	/*moveCamera()
	{
		camera.position.x = this.sprite.position.x;
		camera.position.y = this.sprite.position.y;
	}*/
	
	goLeft() 		{ this.sprite.rotation -= 2; }
	goRight()		{ this.sprite.rotation += 2; }
	goBackward() 	{ this.acceleration -= 3; }
	goForward()		{ this.acceleration += 3; }
	
	move(walls, spots, cars)
	{
		//this.moveCamera();
		
		this.checkBlocked(walls);
		this.checkCollision(cars);
		this.checkUnavailableSpot(spots);
		
        this.checkSensors(spots);
        this.showSensors();
		
        this.checkParked();
		
		if(!this.blocked && !this.parked)
		{
			/*if(keyDown(UP_ARROW)) 
				this.goForward();		
			if(keyDown(DOWN_ARROW))   
				this.goBackward();
			
			if(this.acceleration < -30 || this.acceleration > 30) 
			{
				if(keyDown(LEFT_ARROW))
                    this.goLeft();
				if(keyDown(RIGHT_ARROW))
					this.goRight();
			}*/
			
			this.think(this.chooseSpot(spots));
			
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
