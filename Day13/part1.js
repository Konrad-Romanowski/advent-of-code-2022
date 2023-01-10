// Note that below solution is not 100% correct!!!
// However, probably due to the specific input, it allowed me to get the correct answer,
// therefore I decided to push this code to this repository.

const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

function comparePair(pair) {

    let left = pair.left;
    let right = pair.right;

    function compare(left,right) {

        // left run out of items
        if(typeof left === 'undefined' && typeof right !== 'undefined') {
            return true;
        }

        // right run out of items
        if(typeof left !== 'undefined' && typeof right === 'undefined') {
            return false;
        }

        // both left and right are arrays
        if(typeof left !== 'number' && typeof right !== 'number') {

            let maxLength = Math.max(left.length,right.length);

            for(let i = 0; i < maxLength; i++) {
                if(compare(left[i],right[i]) === undefined) {
                    continue;
                } else {
                    return compare(left[i],right[i]);
                }
            }
        }

        // left - not array, right - array
        if(typeof left === 'number' && typeof right !== 'number') {
            return compare([left],right);
        }

        // left - array, right - not array
        if(typeof left !== 'number' && typeof right === 'number') {
            return compare(left,[right]);
        }

        // both left and right are numbers
        if(typeof left === 'number' && typeof right === 'number') {
            if(left < right) return true;
            if(left > right) return false;
        }
    }

    return compare(left,right);
}

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const rawPairsData = data.split('\r\n');

        let pair = {left:'', right:''};
        const pairs = [];

        for(let lineNumber = 0; lineNumber < rawPairsData.length; lineNumber++) {
            if(pair.left === '') {
                pair.left = JSON.parse(rawPairsData[lineNumber]);
            } else if (pair.right === '') {
                pair.right = JSON.parse(rawPairsData[lineNumber]);
            }

            if(rawPairsData[lineNumber] === '') {
                pairs.push(pair);
                pair = {left:'', right:''};
            }
        }

        let correctIndices = [];

        for(let i = 0; i < pairs.length; i++) {
            if(comparePair(pairs[i])) correctIndices.push(i+1);
        }

        const sumOfCorrectIndices = correctIndices.reduce((sum,index)=>{
            return sum+=index;
        },0);

        console.log(sumOfCorrectIndices);
    }
});