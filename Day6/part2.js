const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

fs.readFile(inputPath,'utf-8', (err,signal) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const markerLength = 14
        let indexCounter = markerLength;
        const currentFourSigns = {};

        for(let i = 0; i < indexCounter; i++) {
            currentFourSigns.hasOwnProperty(signal[i]) ? currentFourSigns[signal[i]] += 1 : currentFourSigns[signal[i]] = 1;
        }

        while(indexCounter < signal.length) {
            if(Object.values(currentFourSigns).every(value => value <= 1)) {
                console.log(indexCounter);
                break;
            }

            currentFourSigns[signal[indexCounter-markerLength]] -= 1
            currentFourSigns.hasOwnProperty(signal[indexCounter]) ? currentFourSigns[signal[indexCounter]] += 1 : currentFourSigns[signal[indexCounter]] = 1;
            
            indexCounter++;
        }
    }
});
