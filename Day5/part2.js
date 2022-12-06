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
        const ungrabbedContainers = containers[instruction.from-1].splice(instruction.numberOfContainers);
        const grabbedContainers = containers[instruction.from-1];
        containers[instruction.from-1] = ungrabbedContainers;
        containers[instruction.to-1] = [...grabbedContainers,...containers[instruction.to-1]];
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

        const numberOfStacks = containersScheme[containersScheme.length-1].match(/\d+/g).length;

        const flattenContainerScheme = containersScheme.join(' ');

        const containers = [];
        for(let i = 0; i < numberOfStacks; i++) {
            containers[i] = new Array();
        }

        for(let i = 1; i < (numberOfStacks)*4*(dataSeparationIndex-1); i+=4) {
            if(flattenContainerScheme[i] !== '' && flattenContainerScheme[i] !== ' ' ) {
                containers[(i-1)/4 % numberOfStacks].push(flattenContainerScheme[i]);
            };
        }

        rearrangeContainers(rearrangements,containers);
        console.log(getTopContainers(containers));
    }
});
