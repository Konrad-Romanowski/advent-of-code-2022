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

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const dataAsArray = data.split('\r\n');

        const rucksacks = dataAsArray.map(rucksack => {
            const mid = rucksack.length/2;
            return {leftCompartment: rucksack.slice(0,mid),
                    rightCompartment: rucksack.slice(mid)}
        });

        const rucksacksAsInventory = rucksacks.map(rucksack=>{
            const leftCompartmentInventory = {};
            const rightCompartmentInventory = {};
            
            for(let i = 0; i < rucksack.leftCompartment.length; i++) {
                leftCompartmentInventory.hasOwnProperty(rucksack.leftCompartment[i]) ? leftCompartmentInventory[rucksack.leftCompartment[i]] +=1 : leftCompartmentInventory[rucksack.leftCompartment[i]] = 1;
            }

            for(let i = 0; i < rucksack.rightCompartment.length; i++) {
                rightCompartmentInventory.hasOwnProperty(rucksack.rightCompartment[i]) ? rightCompartmentInventory[rucksack.rightCompartment[i]] +=1 : rightCompartmentInventory[rucksack.rightCompartment[i]] = 1;
            }
            
            return {leftCompartmentInventory, rightCompartmentInventory}
        });

        const listOfCommonItems = rucksacksAsInventory.map(rucksack=>{
            for(item in rucksack.leftCompartmentInventory) {
                if(rucksack.rightCompartmentInventory.hasOwnProperty(item)) {
                    return item;
                }
            }
        })

        const totalPriorities = listOfCommonItems.reduce((totalPriority,item)=>{
            return totalPriority+=getPrioriority(item);
        },0)

        console.log(totalPriorities);

    }
});

