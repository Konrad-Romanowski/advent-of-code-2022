const fs = require('fs');
const path = require('path');
const Elf = require('./Elf.js');
const Map = require('./Map.js');

const inputPath = path.join(__dirname,'input.txt');

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`);
    } else {
        let initialMap = data.split('\r\n').map(line=>{
            return line.split('');
        });

        const map = new Map(initialMap);
        const elves = [];
        let elvesToMove = []; // list of elves that can perform move
        let nextPositions = {}; // this object will assign proposed positions with elves heading to them
        let round = 1;

        // Populate array with elves
        initialMap.forEach((row,rowIndex)=>{
            row.forEach((column,columnIndex)=>{
                if(initialMap[rowIndex][columnIndex] === "#") elves.push(new Elf(rowIndex,columnIndex));
            });
        });

        map.update(elves);

        while(round <= 10) {

            // Get elves that are not inhibited from moving
            let notIsolatedElves = elves.filter(elf => !elf.isIsolated(map.occupiedCoordinates));

            // Let each elf propose the move
            notIsolatedElves.forEach(elf => {
                const direction = elf.setDirection(map.occupiedCoordinates);
                elf.setNextPosition(direction);
            });
            
            // Assign proposed next positions with elves that wants to go there
            notIsolatedElves.forEach(elf => {
                const coordinates = JSON.stringify([elf.nextPosition.y,elf.nextPosition.x])
                nextPositions.hasOwnProperty(coordinates) ? nextPositions[coordinates].push(elf) : nextPositions[coordinates] = [elf];
            });

            // Get elves that were assigned only with one future position
            for(let coordinate in nextPositions) {
                if(nextPositions[coordinate].length === 1) elvesToMove.push(...nextPositions[coordinate]);
            }
            
            elvesToMove.forEach(elf => {
                elf.move();
            });
            
            // Update map and reset elfs parameters
            elves.forEach(elf => elf.update());
            map.update(elves);

            // clear objects
            nextPositions = {}
            elvesToMove = [];
            notIsolatedElves = [];

            round++;
        }

    // Calculate empty ground tiles of the smales rectangle consisting of all elves
    let mostBottomElfY = -Infinity;
    let mostRightElfX = -Infinity;
    let mostTopElfY = Infinity;
    let mostLeftElfX = Infinity;

    elves.forEach(elf=>{
        elf.y > mostBottomElfY ? mostBottomElfY = elf.y : null;
        elf.x > mostRightElfX ? mostRightElfX = elf.x : null;
        elf.y < mostTopElfY ? mostTopElfY = elf.y : null;
        elf.x < mostLeftElfX ? mostLeftElfX = elf.x : null;
    });

    let emptySpaces = (mostBottomElfY-mostTopElfY+1)*(mostRightElfX-mostLeftElfX+1) - elves.length;
    console.log(emptySpaces);

    }
});