const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

function addTreesVisibleFromLeft(treesMap,rowIndex,visibleTrees) {
    let maxHeight = -1;
    let treeIndex = 0;
    while(treeIndex < treesMap[rowIndex].length && maxHeight !== 9) {
        if(parseInt(treesMap[rowIndex][treeIndex]) > maxHeight) {
            visibleTrees.hasOwnProperty([`(${rowIndex},${treeIndex})`]) ? visibleTrees[`(${rowIndex},${treeIndex})`] += 1 : visibleTrees[`(${rowIndex},${treeIndex})`] = 1;
            maxHeight = parseInt(treesMap[rowIndex][treeIndex]);
        }
        treeIndex++;
    }
}

function addTreesVisibleFromRight(treesMap,rowIndex,visibleTrees) {
    let maxHeight = -1;
    let treeIndex = treesMap[rowIndex].length-1;
    while(treeIndex > 0 && maxHeight !== 9) {
        if(parseInt(treesMap[rowIndex][treeIndex]) > maxHeight) {
            visibleTrees.hasOwnProperty([`(${rowIndex},${treeIndex})`]) ? visibleTrees[`(${rowIndex},${treeIndex})`] += 1 : visibleTrees[`(${rowIndex},${treeIndex})`] = 1;
            maxHeight = parseInt(treesMap[rowIndex][treeIndex]);
        }
        treeIndex--;
    }
}

function addTreesVisibleFromTop(treesMap,columnIndex,visibleTrees) {
    let maxHeight = -1;
    let treeIndex = 0;

    while(treeIndex < treesMap.length && maxHeight !== 9) {
        if(parseInt(treesMap[treeIndex][columnIndex]) > maxHeight) {
            visibleTrees.hasOwnProperty([`(${treeIndex},${columnIndex})`]) ? visibleTrees[`(${treeIndex},${columnIndex})`] += 1 : visibleTrees[`(${treeIndex},${columnIndex})`] = 1;
            maxHeight = parseInt(treesMap[treeIndex][columnIndex]);
        }
        treeIndex++;
    }
}

function addTreesVisibleFromBottom(treesMap,columnIndex,visibleTrees) {
    let maxHeight = -1;
    let treeIndex = treesMap.length-1;

    while(treeIndex > 0 && maxHeight !== 9) {
        if(parseInt(treesMap[treeIndex][columnIndex]) > maxHeight) {
            visibleTrees.hasOwnProperty([`(${treeIndex},${columnIndex})`]) ? visibleTrees[`(${treeIndex},${columnIndex})`] += 1 : visibleTrees[`(${treeIndex},${columnIndex})`] = 1;
            maxHeight = parseInt(treesMap[treeIndex][columnIndex]);
        }
        treeIndex--;
    }
}

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const treesMap = data.split('\r\n');

        const numOfRows = treesMap.length;
        const numOfColumns = treesMap[0].length;

        const visibleTrees = {};

        for(let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
            addTreesVisibleFromLeft(treesMap,rowIndex,visibleTrees);
            addTreesVisibleFromRight(treesMap,rowIndex,visibleTrees);
        }

        for(let columnIndex = 0; columnIndex < numOfColumns; columnIndex++) {
            addTreesVisibleFromTop(treesMap,columnIndex,visibleTrees);
            addTreesVisibleFromBottom(treesMap,columnIndex,visibleTrees);
        }

        console.log(Object.values(visibleTrees).length);

    }
});
