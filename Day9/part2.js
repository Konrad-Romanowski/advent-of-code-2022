const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

function distance(p1,p2) {
    return Math.max(Math.abs(p1.x-p2.x),Math.abs(p1.y-p2.y));
}

class Rope {
    constructor(ropeLength) {
        this.head = {x:0,y:0}
        this.tail = Array.from({length: ropeLength - 1}, item => { return {x:0, y:0} });
        this.lastItemLog = {};
        this.logPositionsOfLastItem(this.tail[this.tail.length-1]); // include starting position of last item of the tail
    }

    moveHead(instruction) {
        for(let step = 1; step <= instruction.numberOfSteps; step++) {

            if(instruction.direction === 'U') this.head.y +=1;
            if(instruction.direction === 'D') this.head.y -=1;
            if(instruction.direction === 'L') this.head.x -=1;
            if(instruction.direction === 'R') this.head.x +=1;

            this.moveTail();
        }
    }

    moveTail() {
        const rope = [this.head,...this.tail];

        for(let i = 0; i < rope.length-1; i++) {
            if(distance(rope[i], rope[i+1])>1) {

                // Next item is in same column
                if(rope[i].x === rope[i+1].x) {
                    rope[i+1].y = (rope[i+1].y + rope[i].y)/2;
                }

                // Next item is in same row
                if(rope[i].y === rope[i+1].y) {
                    rope[i+1].x = (rope[i+1].x + rope[i].x)/2;
                }
                
                // Next item is 2 units away diagonaly
                if(Math.abs(rope[i].x - rope[i+1].x) === 2 &&
                    Math.abs(rope[i].y - rope[i+1].y) === 2) {
                    rope[i+1].y = (rope[i+1].y + rope[i].y)/2;
                    rope[i+1].x = (rope[i+1].x + rope[i].x)/2;
                }

                // Next item is 1 column away but 2 units away in rows
                if(Math.abs(rope[i].x - rope[i+1].x) === 1 &&
                    Math.abs(rope[i].y - rope[i+1].y) === 2) {
                    rope[i+1].y = (rope[i+1].y + rope[i].y)/2;
                    rope[i+1].x = rope[i].x;
                }

                // Next item is 1 row away but 2 units away in columns
                if(Math.abs(rope[i].x - rope[i+1].x) === 2 &&
                    Math.abs(rope[i].y - rope[i+1].y) === 1) {
                    rope[i+1].x = (rope[i+1].x + rope[i].x)/2;
                    rope[i+1].y = rope[i].y;
                }
            }        
        }

        this.logPositionsOfLastItem();
    }

    logPositionsOfLastItem() {
        const lastItem = this.tail[this.tail.length-1];
        this.lastItemLog.hasOwnProperty([`(${lastItem.x},${lastItem.y})`]) ? this.lastItemLog[`(${lastItem.x},${lastItem.y})`] +=1 : this.lastItemLog[`(${lastItem.x},${lastItem.y})`] = 1;
    }
}

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const moves = data.split('\r\n');

        const ropeLength = 10
        const rope = new Rope(ropeLength);

        moves.forEach(move => {
            const direction = move[0];
            const numberOfSteps = parseInt(move.match(/\d+/g));

            const instruction = {direction, numberOfSteps};
            rope.moveHead(instruction);
        })

        console.log(Object.values(rope.lastItemLog).length);
    }
});