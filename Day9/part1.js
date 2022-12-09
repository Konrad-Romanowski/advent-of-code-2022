const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

function distance(p1,p2) {
    return Math.max(Math.abs(p1.x-p2.x),Math.abs(p1.y-p2.y));
}

class Rope {
    constructor() {
        this.head = {x:0,y:0}
        this.tail = {x:0,y:0}
        this.tailsLog = {};
        this.logTailPosition(); // include starting position
    }

    move(instruction) {
        for(let step = 1; step <= instruction.numberOfSteps; step++) {

            if(instruction.direction === 'U') this.head.y +=1;
            if(instruction.direction === 'D') this.head.y -=1;
            if(instruction.direction === 'L') this.head.x -=1;
            if(instruction.direction === 'R') this.head.x +=1;

            this.moveTail(instruction);
        }
    }

    moveTail(instruction) {
        if(distance(this.head, this.tail)>1) {
            if(instruction.direction === 'U') {
                this.tail.x = this.head.x;
                this.tail.y +=1;
            }
            if(instruction.direction === 'D') {
                this.tail.x = this.head.x;
                this.tail.y -=1;
            }
            if(instruction.direction === 'L') {
                this.tail.y = this.head.y;
                this.tail.x -=1;
            }
            if(instruction.direction === 'R') {
                this.tail.y = this.head.y;
                this.tail.x +=1;
            }
            this.logTailPosition();
        }
    }

    logTailPosition() {
        this.tailsLog.hasOwnProperty([`(${this.tail.x},${this.tail.y})`]) ? this.tailsLog[`(${this.tail.x},${this.tail.y})`] +=1 : this.tailsLog[`(${this.tail.x},${this.tail.y})`] = 1;
    }
}

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const moves = data.split('\r\n');

        const rope = new Rope();

        moves.forEach(move => {
            const direction = move[0];
            const numberOfSteps = parseInt(move.match(/\d+/g));

            const instruction = {direction, numberOfSteps};

            rope.move(instruction);
        })

        console.log(Object.values(rope.tailsLog).length);
    }
});
