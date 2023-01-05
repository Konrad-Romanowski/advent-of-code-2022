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

    move(map,abyss) {
        while(this.canMove) {
            if(this.y === abyss) {
                this.canMove = false;
                game = false;
            }

            if(!map[`${this.x},${this.y+1}`]) {
                this.moveDown();
            } else if(!map[`${this.x-1},${this.y+1}`]) {
                this.moveDownAndLeft();
            } else if(!map[`${this.x+1},${this.y+1}`]) {
                this.moveDownAndRight();
            } else {
                this.canMove = false;
            }
        }

        map[`${this.x},${this.y}`] = 'o';
    }

}

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        let solidRockPaths = data.split('\r\n');

        // We will define abyss as the level of the highest y-coordinate of the rock.
        // We consider the highest y-coordinate because of the orientation of the map,
        // the higher the y-coordinate is, the lower level it is representing on the map.
        // If the sand will reach this level, we can treat that the sand has fallen into the abyss.
        let abyss = -Infinity;

        // transform rocks data into easier to use data structure
        // and by the way get the lowest rock level
        solidRockPaths = solidRockPaths.reduce((rockPaths,path)=>{
            path = path.split(' -> ');
            path = path.reduce((points,point) => {
                point = point.split(',');
                abyss = Math.max(abyss,point[1]);
                points.push({x:point[0],y:point[1]})
                return points;
            },[]);

            rockPaths.push(path);
            return rockPaths;
        },[]);

        const map = generateMap(solidRockPaths);

        const sandGenerator = new SandGenerator(500,0);

        while(game) {
            const sand = sandGenerator.generateSand(sandGenerator.x,sandGenerator.y);
            sand.move(map,abyss);
        }
        
        console.log(sandGenerator.numberOfGeneratedSand-1);
    }
});