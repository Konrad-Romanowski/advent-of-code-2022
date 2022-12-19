const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const cubesList = data.split('\r\n');
        const externalSidesCounter = {}; // this object will track how many non-adjacent sides has each cube

        function countNeighboursOf(cube) {
            const coordinates = cube.split(',');
        
            let x = parseInt(coordinates[0]);
            let y = parseInt(coordinates[1]);
            let z = parseInt(coordinates[2]);
        
            let numberOfNeighbours = 0;
        
            // check if in one step in each direction there is any cube from the list
            // if yes - increment the number of neighbours
            if(externalSidesCounter.hasOwnProperty(`${x},${y},${z+1}`)) numberOfNeighbours++;
            if(externalSidesCounter.hasOwnProperty(`${x},${y},${z-1}`)) numberOfNeighbours++;
            if(externalSidesCounter.hasOwnProperty(`${x},${y+1},${z}`)) numberOfNeighbours++;
            if(externalSidesCounter.hasOwnProperty(`${x},${y-1},${z}`)) numberOfNeighbours++;
            if(externalSidesCounter.hasOwnProperty(`${x+1},${y},${z}`)) numberOfNeighbours++;
            if(externalSidesCounter.hasOwnProperty(`${x-1},${y},${z}`)) numberOfNeighbours++;
        
            return numberOfNeighbours;
        }

        cubesList.forEach(cube => {
            const [x,y,z] = cube.split(',');
            const newCube = `${x},${y},${z}`;
            externalSidesCounter[newCube] = 6; // assign initially 6 non-adjacent sides
        });
        
        let surfaceArea = 0;

        // for each cube count the numbers of adjacing cubes and deduct them from the counting object
        // then increment the surface area
        for(let cube in externalSidesCounter) {
            externalSidesCounter[cube] -= countNeighboursOf(cube);
            surfaceArea += externalSidesCounter[cube];
        }

        console.log(surfaceArea);
    }
});