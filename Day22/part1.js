const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

class Player {
    constructor(y,x,direction = 'R') {
        this.y = y;
        this.x = x;
        this.direction = direction;
    }

    rotate(rotateDirection) {
        if(!rotateDirection) return;

        const directions = ['R','D','L','U'];

        let currentDirectionIndex = directions.indexOf(this.direction);

        if(rotateDirection === 'R') currentDirectionIndex +=1;
        if(rotateDirection === 'L') currentDirectionIndex -=1;

        if(currentDirectionIndex === -1) currentDirectionIndex = 3;
        if(currentDirectionIndex === 4 ) currentDirectionIndex = 0;

        this.direction = directions[currentDirectionIndex];
    }

    move(numberOfSteps,rotation,map) {
        let x = this.x;
        let y = this.y;

        const mapHeight = map.length;
        
        for(let i = 0; i < numberOfSteps; i++) {

            if(this.direction === 'U') {
                let newY = this.y-1;
                
                if(newY < 0 || map[newY][x] === ' ' || !map[newY][x]) newY = this.getWrappingPosition(this.y,this.x,map).y
                if(map[newY][x] === '#') break;
                if(map[newY][x] === '.') this.y = newY;
            }

            if(this.direction === 'R') {
                let newX = this.x+1;

                if(map[y][newX] === ' ' || !map[y][newX]) newX = this.getWrappingPosition(this.y,this.x,map).x
                if(map[y][newX] === '#') break;
                if(map[y][newX] === '.') this.x = newX;

            }

            if(this.direction === 'D') {
                let newY = this.y+1;

                if(newY === mapHeight || map[newY][x] === ' ' || !map[newY][x]) newY = this.getWrappingPosition(this.y,this.x,map).y
                if(map[newY][x] === '#') break;
                if(map[newY][x] === '.') this.y = newY;
            }

            if(this.direction === 'L') {
                let newX = this.x-1;

                if(newX < 0 || map[y][newX] === ' ' || !map[y][newX]) newX = this.getWrappingPosition(this.y,this.x,map).x
                if(map[y][newX] === '#') break;
                if(map[y][newX] === '.') this.x = newX;
            }
        }

        this.rotate(rotation);
    }

    getWrappingPosition(currentY,currentX,map) {
        let y = currentY;
        let x = currentX;
        const mapHeight = map.length - 1;

        if(this.direction === 'U') {
            while(y <= mapHeight && map[y][x] && map[y][x] !== ' ') {
                y+=1;
            }
            y--;
        }

        if(this.direction === 'D') {
            while(y >= 0 && map[y][x] && map[y][x] !== ' ') {
                y-=1;
            }
            y++;
        }

        if(this.direction === 'R') {
            while(x >= 0 && map[y][x] && map[y][x] !== ' ') {
                x-=1;
            }
            x++;
        }

        if(this.direction === 'L') {
            while(map[y][x] && map[y][x] !== ' ') {
                x+=1;
            }
            x--;
        }

        return {y,x};
    }
}

function pointsForFacing(direction) {
    if(direction === 'R') return 0;
    if(direction === 'D') return 1;
    if(direction === 'L') return 2;
    if(direction === 'U') return 3;
}

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const map = data.split('\r\n');

        // Get moves from last line
        const movesList = map.pop();
        // Remove last empty line
        map.pop();

        const startingX = map[0].indexOf('.');
        
        const nubmerOfSteps = movesList.match(/\d+/g);
        const turns = movesList.match(/[L,R]/g);
        let moves = [];

        for(let i = 0; i < nubmerOfSteps.length; i++) {
            moves[i] = {
                nubmerOfSteps: parseInt(nubmerOfSteps[i]),
                turn: turns[i]
            }
        }

        const startingDirection = 'R';
        const player = new Player(0, startingX, startingDirection);
        
        moves.forEach(instruction => {
            player.move(instruction.nubmerOfSteps,instruction.turn,map)
        });

        const password = 1000*(player.y+1) + 4*(player.x+1) + pointsForFacing(player.direction);

        console.log(password);
    }
});