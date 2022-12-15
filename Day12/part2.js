const fs = require('fs');
const path = require('path');
const Graph = require('./WeightedGraph.js');

const inputPath = path.join(__dirname,'input.txt');

function getEdgeWeight(vertex1,vertex2) {

    // 'S' has always height of 'a'
    // 'E' has always height of 'z'
    if(vertex1 === 'S') vertex1 = 'a';
    if(vertex2 === 'S') vertex2 = 'a';
    if(vertex1 === 'E') vertex1 = 'z';
    if(vertex2 === 'E') vertex2 = 'z';

    return vertex2.charCodeAt(0) - vertex1.charCodeAt(0);
}

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const heightmap = data.split('\r\n');

        const graph = new Graph();
        const startingPoints = [];
        let end;
        let shortestPathLength = Infinity;

        // add Vertices to Graph and
        // find all possible starting coordinates
        // get Ending coordinate
        for(let y = 0; y < heightmap.length; y++) {
            for(let x = 0; x < heightmap[y].length; x++) {
                graph.addVertex(`(${x},${y})`);
                if(heightmap[y][x] === 'S' ||  heightmap[y][x] === 'a') startingPoints.push(`(${x},${y})`);
                if(heightmap[y][x] === 'E') end = `(${x},${y})`;
            }
        }

        // Add horizontal edges
        for(let y = 0; y < heightmap.length; y++) {
            for(let x = 0; x < heightmap[y].length-1; x++) {
                // check left to right direction
                let heightDifference = getEdgeWeight(heightmap[y][x],heightmap[y][x+1]);
                if(heightDifference <= 1) graph.addEdge(`(${x},${y})`,`(${x+1},${y})`,1);


                // check right to left direction
                heightDifference = getEdgeWeight(heightmap[y][x+1],heightmap[y][x]);
                if(heightDifference <= 1) graph.addEdge(`(${x+1},${y})`,`(${x},${y})`,1);
            }
        }

        // Add vertical edges
        for(let y = 0; y < heightmap.length-1; y++) {
            for(let x = 0; x < heightmap[y].length; x++) {

                // check top to bottom direction
                let heightDifference = getEdgeWeight(heightmap[y][x],heightmap[y+1][x]);
                if(heightDifference <= 1) graph.addEdge(`(${x},${y})`,`(${x},${y+1})`,1);


                // check bottom to top direction
                heightDifference = getEdgeWeight(heightmap[y+1][x],heightmap[y][x]);
                if(heightDifference <= 1) graph.addEdge(`(${x},${y+1})`,`(${x},${y})`,1);
            }
        }

        startingPoints.forEach(startingPoint => {
            const calculatedLength = graph.shortestPath(startingPoint,end);
            shortestPathLength = Math.min(shortestPathLength,calculatedLength);
        });

        console.log(shortestPathLength);

    }
});
