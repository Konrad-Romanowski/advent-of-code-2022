const fs = require('fs');
const path = require('path');
const generateMap = require('./generateMap');

const inputPath = path.join(__dirname,'input.txt');

let game = true;

class SandGenerator {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.numberOfGeneratedSand = 0;
    }

    generateSand() {
        const sand = new Sand(this.x,this.y);
        this.numberOfGeneratedSand++;
        return sand;
    }
}

class Sand {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.canMove = true;
    }

    moveDown() {
        this.y++;
    }

    moveDownAndLeft() {
        this.y++;
        this.x--;
    }

    moveDownAndRight() {
        this.y++;
        this.x++;
    }

    move(map,floorLevel) {
        while(this.canMove) {
            if(!map[`${this.x},${this.y+1}`] && this.y+1 !== floorLevel) {
                this.moveDown();
            } else if(!map[`${this.x-1},${this.y+1}`] && this.y+1 !== floorLevel) {
                this.moveDownAndLeft();
            } else if(!map[`${this.x+1},${this.y+1}`] && this.y+1 !== floorLevel) {
                this.moveDownAndRight();
            } else {
                this.canMove = false;
            }
        }

        map[`${this.x},${this.y}`] = 'o';

        if(!this.canMove && this.x === 500 && this.y === 0) {
            game = false;
        }

    }

}

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        let solidRockPaths = data.split('\r\n');

        let lowestRockLevel = -Infinity;

        // transform rocks data into easier to use data structure
        // and by the way get the lowest rock level
        solidRockPaths = solidRockPaths.reduce((rockPaths,path)=>{
            path = path.split(' -> ');
            path = path.reduce((points,point) => {
                point = point.split(',');
                lowestRockLevel = Math.max(lowestRockLevel,point[1]);
                points.push({x:point[0],y:point[1]})
                return points;
            },[]);

            rockPaths.push(path);
            return rockPaths;
        },[]);

        const floorLevel = lowestRockLevel + 2;

        const map = generateMap(solidRockPaths);

        const sandGenerator = new SandGenerator(500,0);

        while(game) {
            const sand = sandGenerator.generateSand(sandGenerator.x,sandGenerator.y);
            sand.move(map,floorLevel);
        }
        
        console.log(sandGenerator.numberOfGeneratedSand);
    }
});