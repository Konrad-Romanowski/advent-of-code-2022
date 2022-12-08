const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

function isVisibleFromLeft(rowNumber,colNumber,treesMap) {
    let isVisible = true;
    let maxHeight = 0;
    const currentTreeHeight = parseInt(treesMap[rowNumber][colNumber]);

    for(let xPos = 0; xPos < colNumber; xPos++) {
        if(maxHeight < parseInt(treesMap[rowNumber][xPos])) maxHeight = parseInt(treesMap[rowNumber][xPos]);
        if(maxHeight === 9) return false;
    }

    if(maxHeight >= currentTreeHeight) isVisible = false;

    return isVisible;
}

function isVisibleFromRight(rowNumber,colNumber,treesMap) {
    let isVisible = true;
    let maxHeight = 0;
    const currentTreeHeight = parseInt(treesMap[rowNumber][colNumber]);

    for(let xPos = treesMap[rowNumber].length-1; xPos > colNumber; xPos--) {
        if(maxHeight < parseInt(treesMap[rowNumber][xPos])) maxHeight = parseInt(treesMap[rowNumber][xPos]);
        if(maxHeight === 9) return false;

    }

    if(maxHeight >= currentTreeHeight) isVisible = false;

    return isVisible;
}

function isVisibleFromTop(rowNumber,colNumber,treesMap) {
    let isVisible = true;
    let maxHeight = 0;
    const currentTreeHeight = parseInt(treesMap[rowNumber][colNumber]);

    for(let yPos = 0; yPos < rowNumber; yPos++) {
        if(maxHeight < parseInt(treesMap[yPos][colNumber])) maxHeight = parseInt(treesMap[yPos][colNumber]);
        if(maxHeight === 9) return false;
    }

    if(maxHeight >= currentTreeHeight) isVisible = false;

    return isVisible;
}

function isVisibleFromBottom(rowNumber,colNumber,treesMap) {
    let isVisible = true;
    const currentTreeHeight = treesMap[rowNumber][colNumber];
    let maxHeight = 0;

    for(let yPos = treesMap.length - 1; yPos > rowNumber; yPos--) {
        if(maxHeight < parseInt(treesMap[yPos][colNumber])) maxHeight = parseInt(treesMap[yPos][colNumber]);
        if(maxHeight === 9) return false;
    }

    if(maxHeight >= currentTreeHeight) isVisible = false;

    return isVisible
}


fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const treesMap = data.split('\r\n');

        const numOfRows = treesMap.length;
        const numOfColumns = treesMap[0].length;

        const numOfEdgeTrees = 2*numOfColumns+2*numOfRows-4;

        let visibleNonEdgeTrees = 0;

        for(let row = 1; row < numOfRows-1; row++) {
            for(let col = 1; col < numOfColumns-1; col++) {
                if(isVisibleFromLeft(row,col,treesMap) ||
                   isVisibleFromRight(row,col,treesMap) ||
                   isVisibleFromTop(row,col,treesMap) ||
                   isVisibleFromBottom(row,col,treesMap)
                ) visibleNonEdgeTrees+=1;
            }
        }

        console.log(visibleNonEdgeTrees + numOfEdgeTrees);
    }
});
