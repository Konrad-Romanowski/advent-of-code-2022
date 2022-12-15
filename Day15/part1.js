const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

function distance(A,B) {
    return Math.abs(A.x - B.x) + Math.abs(A.y - B.y);
}

function distanceToLine(A,lineY) {
    return Math.abs(A.y - lineY);
}

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const dataAsArray = data.split('\r\n');

        const sensorsAndClosestBacons = [];

        dataAsArray.forEach(line => {
            const coordinates = line.match(/-?\d+/g);

            const S = {x: parseInt(coordinates[0]), y: parseInt(coordinates[1])};
            const B = {x: parseInt(coordinates[2]), y: parseInt(coordinates[3])};
            const dist = distance(S,B);

            sensorsAndClosestBacons.push({S,B, dist});
        });

        const lineY = 2000000;

        const lineItems = {}; // this will store x-coordinates of empty spaces or bacons

        // Get all sensors which distance to closest bacon is greater or equal than distance to line
        // calculate the extra distance and include it in the new list
        const sensorsInRange = sensorsAndClosestBacons.reduce((sensors,SB)=>{
            const extraDistance = Math.abs(SB.dist - distanceToLine(SB.S,lineY));

            if(SB.dist >= distanceToLine(SB.S,lineY)) {
                sensors.push({...SB.S, extraDistance});
            }

            return sensors
        },[]);

        // Go left and right on the y-axis (by 'moving' on x-coordinates) 
        // maximum steps one way is the remaining distance
        // include those x-coordinates in the lineItems object (assign '#' to the x-coordinate, '#' represents empty space)
        sensorsInRange.forEach(sensor => {
            // lineItems[sensor.x] = '#'; // this 'touching' case is included in below loop
            for(let i = 0; i<= sensor.extraDistance; i++) {
                lineItems[sensor.x + i] = '#';
                lineItems[sensor.x - i] = '#';
            }
        });

        // overwrite/include x-coordinates of bacons ('B') that are on the line (find x-coordinates of Bacons where its y = lineY)
        sensorsAndClosestBacons.forEach(SB => {
            if(SB.B.y === lineY) lineItems[SB.B.x] = 'B';
        });

        let emptySpaces = 0;

        for(x in lineItems) {
            if(lineItems[x] === '#') emptySpaces+=1;
        }
        
        console.log(emptySpaces);
    }
});

