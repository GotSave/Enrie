function nextGeneration(cars, x, y, r, savedCars, spots)
{
    calculateFitness(savedCars);
    
    for(let i = 0; i < total; i++)
    {
        cars.push(pickOne(x, y, savedCars, spots));
        cars[i].sprite.rotation = r;
    }
    
    savedCars = [];
}

function calculateFitness(savedCars)
{
    let sum = 0;
    
    for(let i = 0; i < savedCars.length; i++)
        sum += savedCars[i].score;
    
    for(let i = 0; i < savedCars.length; i++)
    {
        if(savedCars[i].parked)
            savedCars[i].fitness = 1;
        else
            savedCars[i].fitness = savedCars[i].score / sum;
    }
}

function pickOne(x, y, savedCars, spots)
{
    let index = 0;
    let r = Math.random();
    
    while(r > 0)
    {
        r = r - savedCars[index].fitness;      
        index++;
    }
    
    index--;
    
    let car = savedCars[index];
    let child = new Car(x, y, spots, car.brain, car.image);
    
    return child;
}