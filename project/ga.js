function nextGeneration(cars, x, y, r, savedCars, spots)
{
    calculateFitness(savedCars);
    
    for(let i = 0; i < TOTAL; i++)
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
        savedCars[i].fitness = savedCars[i].score / sum;
}

function pickOne(x, y, savedCars, spots)
{
    let index = 0;
    let r = random(1);
    
    while(r > 0)
    {
        console.log(savedCars[index].fitness);
        r = r - savedCars[index].fitness;       
        index++;
    }
    index--;
    
    let car = savedCars[index];
    let child = new Car(x, y, spots, car.brain);
    
    return child;
}