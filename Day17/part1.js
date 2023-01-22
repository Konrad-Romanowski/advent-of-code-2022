const fs = require('fs');
const path = require('path');
const Map = require('./Map.js');
const RocksGenerator = require('./RocksGenerator.js');

const inputPath = path.join(__dirname,'input.txt');

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const jetPattern = data.split('');
        
        const map = new Map();
        const rocksGenerator = new RocksGenerator();
        
        const shapes = ['_','+','L','|','o'];
        
        let currentShape;
        let currentRock;
        let currentJetMove;
        
        while(rocksGenerator.numberOfGeneratedRocks < 2022) {
            currentShape = shapes.shift();
            shapes.push(currentShape);
            map.addLevels(currentShape);
            currentRock = rocksGenerator.generateRock(currentShape,map.towerHeight+4);

            while(!currentRock.isMerged){
                currentJetMove = jetPattern.shift();
                jetPattern.push(currentJetMove);
                currentRock.move(currentJetMove,map.previev);
            }
            map.setTowerHeight();
        }
        console.log(map.towerHeight);

        // map.previev.reverse().forEach(line => {
        //     console.log(line.join(''));
        // });
    }
});