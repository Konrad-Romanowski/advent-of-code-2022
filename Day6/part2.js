const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

fs.readFile(inputPath,'utf-8', (err,signal) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const markerLength = 14
        let indexCounter = markerLength;
        const currentSigns = {};

        for(let i = 0; i < indexCounter; i++) {
            currentSigns.hasOwnProperty(signal[i]) ? currentSigns[signal[i]] += 1 : currentSigns[signal[i]] = 1;
        }

        while(indexCounter < signal.length) {
            if(Object.values(currentSigns).every(value => value <= 1)) {
                console.log(indexCounter);
                break;
            }

            currentSigns[signal[indexCounter-markerLength]] -= 1
            currentSigns.hasOwnProperty(signal[indexCounter]) ? currentSigns[signal[indexCounter]] += 1 : currentSigns[signal[indexCounter]] = 1;
            
            indexCounter++;
        }
    }
});
