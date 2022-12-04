const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const dataAsArray = data.split('\r\n');
        dataAsArray.push('');

        const topCalories = [0,0,0];
        let current = 0;
        let leftIndex = 0;
        let rightIndex = 0;

        while(rightIndex !== dataAsArray.length) {
            if(dataAsArray[rightIndex] === '') {
                for(let i = leftIndex; i < rightIndex;i++) {
                    current+=parseInt(dataAsArray[i]);
                }

                if(topCalories.some(calories => calories < current)) {
                    topCalories.pop();
                    topCalories.push(current);
                    topCalories.sort((a,z)=>z-a);
                }

                current = 0;
                leftIndex = rightIndex+1;
            }
            rightIndex++;
        }

        const sumOfCalories = topCalories.reduce((total,calories)=>{
            return total+=calories;
        },0);
    
        console.log(sumOfCalories);
    }
});