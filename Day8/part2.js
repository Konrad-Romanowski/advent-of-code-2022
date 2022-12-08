const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`);
    } else {
        const treesMap = data.split('\r\n');

        function getStepsToTop(row,col) {
            const currentTreeHeight = parseInt(treesMap[row][col]);
            let numberOfSteps = 0;

            function goUp(row) {
                if(row === 0) return 0;
                if(currentTreeHeight <= parseInt(treesMap[row-1][col])) {
                    numberOfSteps++;
                    return numberOfSteps;
                }
                numberOfSteps++;
                return numberOfSteps + goUp(row-1);
            }
            
            goUp(row);
            return numberOfSteps;
        }

        function getStepsToBottom(row,col) {
            const currentTreeHeight = parseInt(treesMap[row][col]);
            let numberOfSteps = 0;

            function goBottom(row) {
                if(row === treesMap.length -1) return 0;
                if(currentTreeHeight <= parseInt(treesMap[row+1][col])) {
                    numberOfSteps++;
                    return numberOfSteps;
                }
                numberOfSteps++;
                return numberOfSteps + goBottom(row+1);
            }
            
            goBottom(row);
            return numberOfSteps;
        }

        function getStepsToRight(row,col) {
            const currentTreeHeight = parseInt(treesMap[row][col]);
            let numberOfSteps = 0;

            function goRight(col) {
                if(col === treesMap[row].length -1) return 0;
                if(currentTreeHeight <= parseInt(treesMap[row][col+1])) {
                    numberOfSteps++;
                    return numberOfSteps;
                }
                numberOfSteps++;
                return numberOfSteps + goRight(col+1);
            }
            
            goRight(col);
            return numberOfSteps;
        }

        function getStepsToLeft(row,col) {
            const currentTreeHeight = parseInt(treesMap[row][col]);
            let numberOfSteps = 0;

            function goLeft(col) {
                if(col === 0) return 0;
                if(currentTreeHeight <= parseInt(treesMap[row][col-1])) {
                    numberOfSteps++;
                    return numberOfSteps;
                }
                numberOfSteps++;
                return numberOfSteps + goLeft(col-1);
            }
            
            goLeft(col);
            return numberOfSteps;
        }

        const numOfRows = treesMap.length;
        const numOfColumns = treesMap[0].length;

        let scenicScore = 0;

        for(let row = 0; row < numOfRows; row++) {
            for(let col = 0; col < numOfColumns; col++) {
                let currentScenicScore = getStepsToTop(row,col) * getStepsToBottom(row,col) * getStepsToLeft(row,col) * getStepsToRight(row,col);
                if(currentScenicScore > scenicScore) scenicScore = currentScenicScore;
            }
        }

        console.log(scenicScore);
    }
});