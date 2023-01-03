const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

// below function helps to find wrapping point on the cube
function _map(num,segment1,segment2) {
    const [x1,x2] = segment1;
    const [y1,y2] = segment2;
    return (y2-y1)/(x2-x1)*(num-x1)+y1;
}

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
        let newDirection = this.direction;

        const mapHeight = map.length;
        
        for(let i = 0; i < numberOfSteps; i++) {
            if(this.direction === 'U') {
                y = this.y-1;
                
                if(y < 0 || map[y][x] === ' ' || !map[y][x]) ({y,x,newDirection} = this.getWrappingPosition(this.y,this.x,map));
            } else if(this.direction === 'R') {
                x = this.x+1;

                if(map[y][x] === ' ' || !map[y][x]) ({y,x,newDirection} = this.getWrappingPosition(this.y,this.x,map));
            } else if(this.direction === 'D') {
                y = this.y+1;

                if(y === mapHeight || map[y][x] === ' ' || !map[y][x]) ({y,x,newDirection} = this.getWrappingPosition(this.y,this.x,map));
            } else if(this.direction === 'L') {
                x = this.x-1;

                if(x < 0 || map[y][x] === ' ' || !map[y][x]) ({y,x,newDirection} = this.getWrappingPosition(this.y,this.x,map));
            }

            if(map[y][x] === '#') break;
            if(map[y][x] === '.') {
                this.y = y;
                this.x = x;
                this.direction = newDirection;

            };
        }

        this.rotate(rotation);

    }

    // ### CUBE SCHEME ###

    //       AAAAA BBBBB
    //       AAAAA BBBBB
    //       AAAAA BBBBB
    //       AAAAA BBBBB
    //       AAAAA BBBBB
    //       CCCCC
    //       CCCCC
    //       CCCCC
    //       CCCCC
    //       CCCCC
    // DDDDD EEEEE
    // DDDDD EEEEE
    // DDDDD EEEEE
    // DDDDD EEEEE
    // DDDDD EEEEE
    // FFFFF
    // FFFFF
    // FFFFF
    // FFFFF
    // FFFFF

    getWrappingPosition(y,x) {
        let wrappingX, wrappingY;
        let newDirection;

        if(this.direction === 'U') {
            // going from A to top
            if(y === 0 && 50 <= x && x <= 99) {
                // enter F from left (increasing order)
                wrappingY = _map(x,[50,99],[150,199]);
                wrappingX = 0;
                newDirection = 'R';
            }
            // going from B to top
            if(y === 0 && 100 <= x && x <= 149) {
                // enter F from the bottom (increasing order)
                wrappingY = 199;
                wrappingX = _map(x,[100,149],[0,49]);
                newDirection = 'U';
            }
            // going from D to top
            if(y === 100 && 0 <= x && x <= 49) {
                // enter C from left (increasing order)
                wrappingX = 50;
                wrappingY = _map(x,[0,49],[50,99]);
                newDirection = 'R';
            }
        }

        if(this.direction === 'R') {
            // going from B to right
            if(x === 149 && 0 <= y && y <= 49) {
                // enter E from right (decreasing order)
                wrappingX = 99;
                wrappingY = _map(y,[0,49],[149,100]);
                newDirection = 'L';
            }
            // going from C to right
            if(x === 99 && 50 <= y && y <= 99) {
                // enter E from the bottom (increasing order)
                wrappingY = 49;
                wrappingX = _map(y,[50,99],[100,149]);
                newDirection = 'U';
            }
            // going from E to right
            if(x === 99 && 100 <= y && y <= 149) {
                // enter B from right (decreasing order)
                wrappingX = 149;
                wrappingY = _map(y,[100,149],[49,0]);
                newDirection = 'L';
            }
            // going from F to right
            if(x === 49 && 150 <= y && y <= 199) {
                // enter E from the bottom (increasing order)
                wrappingY = 149;
                wrappingX = _map(y,[150,199],[50,99]);
                newDirection = 'U';
            }
        }

        if (this.direction === 'D') {
            // going from B to bottom
            if(y === 49 && 100 <= x && x <= 149) {
                // enter C from right (increasing order)
                wrappingX = 99;
                wrappingY = _map(x,[100,149],[50,99]);
                newDirection = 'L';
            }
            // going from E to bottom
            if(y === 149 && 50 <= x && x <= 99) {
                // enter F from right (increasing order)
                wrappingX = 49;
                wrappingY = _map(x,[50,99],[150,199]);
                newDirection = 'L';
            }
            // going from F to bottom
            if(y === 199 && 0 <= x && x <= 49) {
                // enter B from top (increasing order)
                wrappingY = 0;
                wrappingX = _map(x,[0,49],[100,149]);
                newDirection = 'D';
            }
        }

        if(this.direction === 'L') {
            // going from A to left
            if(x === 50 && 0 <= y && y <= 49) {
                // enter D from left (decreasing order)
                wrappingX = 0;
                wrappingY = _map(y,[0,49],[149,100]);
                newDirection = 'R';
            }
            // going from C to left
            if(x === 50 && 50 <= y && y <= 99) {
                // enter D from top (increasing order)
                wrappingY = 100;
                wrappingX = _map(y,[50,99],[0,49]);
                newDirection = 'D';
            }
            // going from D to left
            if(x === 0 && 100 <= y && y <= 149) {
                // enter A from left (decreasing order)
                wrappingX = 50;
                wrappingY = _map(y,[100,149],[49,0]);
                newDirection = 'R';
            }
            // going from F to left
            if(x === 0 && 150 <= y && y <= 199) {
                // enter A from top (increasing order)
                wrappingY = 0;
                wrappingX = _map(y,[150,199],[50,99]);
                newDirection = 'D';
            }
        }

        return {y: wrappingY, x: wrappingX, newDirection};
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
            player.move(instruction.nubmerOfSteps,instruction.turn,map);
        });

        const password = 1000*(player.y+1) + 4*(player.x+1) + pointsForFacing(player.direction);
        
        console.log(password);

    }
});