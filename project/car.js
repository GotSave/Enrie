function mutate(x)
{
    if(random(1) < 0.1)
    {
        let offset = randomGaussian() * 0.5;
        let newX = x + offset;
        return newX;
    }
    else
        return x;
}

class Car
{
	constructor(x, y, spots, brain)
	{
		this.sprite;
		
		this.sensors = [];
        this.activatedSensors = [];
        this.activatedSensors.fill(-1, -1, -1, -1)
		
		this.acceleration = 0;
		
		this.blocked = false;
		this.parked = false;
		this.loop = false;
		this.noMove = false;
		
		this.wMin = -600;
		this.wMax = 1600;
		
		this.hMax = 1450;
        
        this.fitness = 0;
        this.score = 0;
		
        if(brain)
        {
            this.brain = brain.copy();
			if(random(1) > 0.3)
				this.brain.mutate(mutate);
        }
        else
            this.brain = new NeuralNetwork(10, 10, 4);
        
		this.lastDistance;
        this.target = this.chooseSpot(spots);
		
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
		
		this.lastDistance = this.distToSpot(this.target);
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
		
		if((outputs[0] < 0.5 && outputs[2] < 0.5) || (outputs[1] < 0.5 && outputs[3] < 0.5))
			this.blocked = true;
	}
	
	chooseSpot(spots)
	{
		for(let i = 0; i < spots.length; i++)
			if(spots[i].available)
				return spots[i];
	}
    
    distToSpot(spot)
    {
		let left = ((spot.sprite.position.x - this.wMin) / (-this.wMin + this.wMax)) - ((this.sprite.position.x - this.wMin) / (-this.wMin + this.wMax));
        let right = (spot.sprite.position.y / this.hMax) - (this.sprite.position.y / this.hMax);
        
        let d = Math.sqrt((left * left) + (right * right));
        
        return d;
    }
	
	checkBlocked(walls)
	{
		if(this.sprite.collide(walls))
			this.blocked = true;
	}
	
	checkCollision(car)
	{
		if(car)
		{
			if(this.sprite.collide(car.sprite))
			{
				this.blocked = true;
				car.blocked = true;
			}
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
		console.log("garé !!");
		this.score = 1;
	}
	
	goLeft() 		{ this.sprite.rotation -= 2; }
	goRight()		{ this.sprite.rotation += 2; }
	goBackward() 	{ this.acceleration -= 3; }
	goForward()		{ this.acceleration += 3; }
    
    setScore(x)
    {
        this.score = (1 / (Math.sqrt(0.2) * Math.sqrt(2 * PI))) * Math.exp((-1 / 2) * ((x / 0.2) * (x / 0.2)));
    }
	
	move(walls, spots, carGroup1, carGroup2)
	{		
		this.checkBlocked(walls);
		this.checkCollision(carGroup1);
		this.checkCollision(carGroup2);
		this.checkUnavailableSpot(spots);
		
		if(this.sprite.position.x > this.wMax || this.sprite.position.x < this.wMin)
			this.blocked = true;
		if(this.sprite.position.y > this.hMax || this.sprite.position.y < 0)
			this.blocked = true;
		
		if(this.sprite.rotation > 500 || this.sprite.rotation < -500)
			this.loop = true;
		
		if(this.lastDistance === this.distToSpot(this.target))
			this.noMove = true;
		else
			this.noMove = false;
		
        this.checkSensors(spots);
		//this.showSensors();
		
        this.checkParked();
		
		if(!this.blocked && !this.parked)
		{			
			
            this.think(this.target);
            this.setScore(this.distToSpot(this.target));
			
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
		
			this.lastDistance = this.distToSpot(this.target);
		}
	}
}
