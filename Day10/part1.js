const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
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

        const XValueAtCycle = {};

        function trackCycle() {
            cycle+=1;
            if(cycle===20) XValueAtCycle[20] = X;
            if(cycle===60) XValueAtCycle[60] = X;
            if(cycle===100) XValueAtCycle[100] = X;
            if(cycle===140) XValueAtCycle[140] = X;
            if(cycle===180) XValueAtCycle[180] = X;
            if(cycle===220) XValueAtCycle[220] = X;
        }

        instructions.forEach(instruction => {
            if(instruction.instruction === 'noop') trackCycle();
            
            if(instruction.instruction === 'addx') {
                for(let i = 0; i <2; i++) {
                    trackCycle();
                }
                X += instruction.value;
            }
            
        })

        let sumOfSignalsStrength = 0;

        for(let cycle in XValueAtCycle) {
            sumOfSignalsStrength += cycle*XValueAtCycle[cycle];
        }

        console.log(sumOfSignalsStrength);
    }
});
