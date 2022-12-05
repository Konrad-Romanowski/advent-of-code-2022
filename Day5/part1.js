const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

function translateRearangementsToObject(instruction) {
    const number = /\d+/g;
    return {
        numberOfContainers: parseInt(instruction.match(number)[0]),
        from: parseInt(instruction.match(number)[1]),
        to: parseInt(instruction.match(number)[2])
    }
}

function rearrangeContainers(instructions,containers) {
    instructions.forEach(instruction => {
        for(let i = 1; i <= instruction.numberOfContainers; i++){
            const container = containers[instruction.from-1].shift();
            containers[instruction.to-1].unshift(container);
        }
    });

}

function getTopContainers(containers) {
    const list = containers.reduce((list,stack)=>{
        list.push(stack[0]);
        return list;
    },[]);

    return list.join('');
}

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const dataAsArray = data.split('\r\n');
        const dataSeparationIndex = dataAsArray.indexOf('');

        const rearrangementList = dataAsArray.slice(dataSeparationIndex+1);
        const containersScheme = dataAsArray.slice(0,dataSeparationIndex);

        const rearrangements = rearrangementList.map(instruction => translateRearangementsToObject(instruction));

        const numberOfContainers = containersScheme[containersScheme.length-1].match(/\d+/g).length;

        const flattenContainerScheme = containersScheme.join(' ');

        // [V]     [B]                     [F]
        // [N] [Q] [W]                 [R] [B]
        // [F] [D] [S]     [B]         [L] [P]
        // [S] [J] [C]     [F] [C]     [D] [G]
        // [M] [M] [H] [L] [P] [N]     [P] [V]
        // [P] [L] [D] [C] [T] [Q] [R] [S] [J]
        // [H] [R] [Q] [S] [V] [R] [V] [Z] [S]
        // [J] [S] [N] [R] [M] [T] [G] [C] [D]
        // 1   2   3   4   5   6   7   8   9 

        const containers = [
            ['V','N','F','S','M','P','H','J'],
            ['Q','D','J','M','L','R','S'],
            ['B','W','S','C','H','D','Q','N'],
            ['L','C','S','R'],
            ['B','F','P','T','V','M'],
            ['C','N','Q','R','T'],
            ['R','V','G'],
            ['R','L','D','P','S','Z','C'],
            ['F','B','P','G','V','J','S','D']
        ]

        // TODO:
        // - build containers array from raw data instead of creating it manually

        // const containers = new Array(numberOfContainers).fill([]);

        rearrangeContainers(rearrangements,containers);
        console.log(getTopContainers(containers));
    }
});
