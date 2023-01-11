const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

function operation(operator,num1,num2) {
    if(operator === '+') return num1 + num2;
    if(operator === '-') return num1 - num2;
    if(operator === '*') return num1 * num2;
    if(operator === '/') return num1 / num2;
}

function getNumber(monkeyName,monkeyNumbers) {
    if(typeof monkeyNumbers[monkeyName] === 'number') {
        return monkeyNumbers[monkeyName];
    } else {
        let {operator,num1,num2} = monkeyNumbers[monkeyName];
        let result = operation(operator,getNumber(num1,monkeyNumbers), getNumber(num2,monkeyNumbers));
        if(typeof result === 'number') {
            monkeyNumbers[monkeyName] = result;
        }
        return result;
    }
}

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        let sequence = data.split('\r\n');

        const monkeyNumbers = {};

        // Store numbers in a hashmap where key = monkeyName, value = monkeyNumber.
        // If given monkey has not been assigned directly with a number
        // then store the monkeyNumber as an object {num1,num2,operator}.
        // where num1 and num2 are monkey names in the operation
        // and operator is just a sign of an operation (+,-,*,/)
        sequence.forEach(line=>{
            const monkeyName = line.slice(0,4);
            if(line.match(/\d+/g)) {
                monkeyNumbers[monkeyName] = parseInt(line.match(/\d+/g));
            } else {
                const num1 = line.slice(6,10);
                const num2 = line.slice(-4);
                const operator = line.slice(11,12);
                monkeyNumbers[monkeyName] = {num1,num2,operator};
            }
        });
        
        console.log(getNumber('root',monkeyNumbers));
        
    }
});