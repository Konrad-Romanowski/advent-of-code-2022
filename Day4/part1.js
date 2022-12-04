const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

function isScopeFullyOverlapping(elvenPair) {
    if(
        parseInt(elvenPair.firstElf.minID) <= parseInt(elvenPair.secondElf.minID) &&
        parseInt(elvenPair.firstElf.maxID) >= parseInt(elvenPair.secondElf.maxID)
    ) return true

    if(
        parseInt(elvenPair.secondElf.minID) <= parseInt(elvenPair.firstElf.minID) &&
        parseInt(elvenPair.secondElf.maxID) >= parseInt(elvenPair.firstElf.maxID)
    ) return true

    return false;
}

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const dataAsArray = data.split('\r\n');

        const elvesCleaningScopes = dataAsArray.reduce((scopes,elvesPair)=>{
            let pairScope = {firstElf: {minID: elvesPair.split(',')[0].split('-')[0],
                                        maxID: elvesPair.split(',')[0].split('-')[1]},
                             secondElf: {minID: elvesPair.split(',')[1].split('-')[0],
                                        maxID: elvesPair.split(',')[1].split('-')[1]}
                            }
            scopes.push(pairScope);
            return scopes;
        },[]);

        const numOfOverlappingScopes = elvesCleaningScopes.reduce((total,pair)=>{
            return total += isScopeFullyOverlapping(pair) ? 1 : 0;
        },0)

        console.log(numOfOverlappingScopes);
    }
});

