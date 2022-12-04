const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

function getPrioriority(item) {

    const lowerCase = /[a-z]/;
    const upperCase = /[A-Z]/;

    if(lowerCase.test(item)) return item.charCodeAt(0) - 96;
    if(upperCase.test(item)) return item.charCodeAt(0) - 38;
    
    console.log("Wrong character input");
}

function listItems(rucksack) {
    const list = {};

    for(let item of rucksack) {
        list.hasOwnProperty(item) ? list[item] +=1 : list[item] = 1;
    }

    return list;
}

function findCommonItemInGroup(rucksackGroup) {
    const firstRucksack = rucksackGroup[0];
    const secondRucksack = rucksackGroup[1];
    const thirdRucksack = rucksackGroup[2];

    for(let item in firstRucksack) {
        if(secondRucksack.hasOwnProperty(item) && thirdRucksack.hasOwnProperty(item)) return item;
    }
}

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const rucksacks = data.split('\r\n');
        const groupedRucksacks = [];

        for(let rucksackNumber = 0; rucksackNumber < rucksacks.length; rucksackNumber+=3) {
            let groupIndex = rucksackNumber / 3;
            groupedRucksacks[groupIndex] = [listItems(rucksacks[rucksackNumber]),listItems(rucksacks[rucksackNumber+1]),listItems(rucksacks[rucksackNumber+2])];
        }

        const commonItemsPerGroup = groupedRucksacks.map(rucksackGroup=>findCommonItemInGroup(rucksackGroup));

        const sumOfPriorities = commonItemsPerGroup.reduce((totalPriorities,item)=>{
            return totalPriorities += getPrioriority(item);
        },0);

        console.log(sumOfPriorities);

    }
});
