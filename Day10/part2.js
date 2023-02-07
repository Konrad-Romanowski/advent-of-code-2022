const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

const data = fs.readFileSync(inputPath, 'utf-8');

const rawInstructions = data.split('\r\n');

const instructions = rawInstructions.map(instruction => {
    if(instruction.indexOf('addx') === -1) return {instruction : 'noop'}

    return {
        instruction: 'addx', 
        value: parseInt(instruction.slice(instruction.indexOf(' ')))
    }
});

let cycle = 0;
let X = 1;
let spritePositions = [0,1,2];

const display = Array.from({length:6}, row => {
    return Array.from({length:40}, pixel => ' ');
})

function updateSpritePosition() {
    for(let spriteIndex = 0; spriteIndex < spritePositions.length; spriteIndex++) {
        spritePositions[spriteIndex] = X - 1 + spriteIndex;
    }
}

function drawPixel() {
    let currentColumn = cycle % 40;
    spritePositions.forEach(pixel => {
        if(pixel === currentColumn) display[Math.floor(cycle/40)][pixel] = '█';
    });
    cycle+=1;
}

instructions.forEach(instruction => {
    if(instruction.instruction === 'noop') drawPixel();
    
    if(instruction.instruction === 'addx') {
        for(let i = 0; i < 2; i++) {
            drawPixel();
        }
        X += instruction.value;
        updateSpritePosition();
    }
    
});

fs.writeFileSync('result.txt','');

display.forEach(row => {
    const line = row.join('').concat('\r\n');
    fs.appendFileSync('result.txt',line)
});
