// import Priority Queue data structore for the shortestPath method
let {PriorityQueue} = require('./PriorityQueue');

// Quick remake of weighted indirected graph from my repository:
// https://github.com/Konrad-Romanowski/Data-Structures

// Below code might consist of errors

class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(_vertex) {
        if(!this.adjacencyList[_vertex]) this.adjacencyList[_vertex] = [];
    }

    isEdgeBetween(_vertex1,_vertex2) {
        let hasV1V2edge = false;

        for(let i = 0; i < this.adjacencyList[_vertex1].length; i++) {
            if(this.adjacencyList[_vertex1][i].node === _vertex2) {
                hasV1V2edge = true;
                break;
            }
        }
        
        return hasV1V2edge;
    }

    addEdge(_vertex1,_vertex2,_weight) {
        if(_vertex1 === _vertex2) return;
        if(!this.adjacencyList.hasOwnProperty(_vertex1) || !this.adjacencyList.hasOwnProperty(_vertex2)) return;
        if(this.isEdgeBetween(_vertex1,_vertex2)) return;
        
        this.adjacencyList[_vertex1].push({node: _vertex2, weight: _weight});
    }

    removeEdge(_vertex1,_vertex2) {
        if(_vertex1 === _vertex2) return;
        if(!this.adjacencyList.hasOwnProperty(_vertex1) || !this.adjacencyList.hasOwnProperty(_vertex2)) return;
        if(!this.isEdgeBetween(_vertex1,_vertex2)) return;

        for(let i = this.adjacencyList[_vertex1].length - 1; i >= 0; i--) {
            if(this.adjacencyList[_vertex1][i].node === _vertex2) {
                this.adjacencyList[_vertex1].splice(i,1);
                break;
            }
        }

        for(let i = this.adjacencyList[_vertex2].length - 1; i >= 0; i--) {
            if(this.adjacencyList[_vertex2][i].node === _vertex1) {
                this.adjacencyList[_vertex2].splice(i,1);
                break;
            }
        }
    }

    removeVertex(_vertexToRemove) {
        if(!this.adjacencyList.hasOwnProperty(_vertexToRemove)) return;

        for(let i = this.adjacencyList[_vertexToRemove].length - 1; i >= 0; i--) {
            this.removeEdge(this.adjacencyList[_vertexToRemove][i].node,_vertexToRemove);
        }

        delete this.adjacencyList[_vertexToRemove];
    }

    // Dijkstra's shortest path algorithm
    shortestPath(_startingVertex,_endingVertex) {
        const verticesToVisit = new PriorityQueue();
        let shortestDistanceTo = {};
        let previous = {};
        let path = [];
        let currentVertex;
        let newDistance;
        
        // Set shortest distances as Infinity and previous vertices to null
        for(let vertex in this.adjacencyList) {
            shortestDistanceTo[vertex] = Infinity;
            previous[vertex] = null;
        }
        shortestDistanceTo[_startingVertex] = 0;
        // Enqueue vertices to priority queue
        for(let vertex in shortestDistanceTo) {
            verticesToVisit.enqueue(vertex,shortestDistanceTo[vertex]);
        }

        while(verticesToVisit.items.length > 0) {
            currentVertex = verticesToVisit.dequeue().item;

            if(currentVertex === _endingVertex) {
                // Populate path with the vertices
                while(currentVertex) {
                    path.push(currentVertex);
                    currentVertex = previous[currentVertex];
                }
                path.reverse();
                // Stop looping other vertices in the priority queue
                break;
            }

            if(currentVertex || shortestDistanceTo[currentVertex] !== Infinity) {
                for(let adjacentVertex in this.adjacencyList[currentVertex]) {
                    // Assign neighboring vertex to a separate variable
                    let neighbor = this.adjacencyList[currentVertex][adjacentVertex];
                    // Calculate the distance from the _startingVertex to the neighbor of currentVertex
                    newDistance = shortestDistanceTo[currentVertex] + neighbor.weight;
    
                    // Check if newDistance from _startingVertex to the neighbor is less than currently known shortest distance to that neighbor
                    if(newDistance < shortestDistanceTo[neighbor.node]) {
                        // Update the shortestDistanceTo object with new shorter distance
                        shortestDistanceTo[neighbor.node] = newDistance;
                        // Update the previous object to contain new vertex
                        previous[neighbor.node] = currentVertex;
                        // Enqueue the neighbor with new shortest distance from the _startingVertex
                        verticesToVisit.enqueue(neighbor.node,newDistance);
                    }
                }
            }
        }
        console.log(path);
        return shortestDistanceTo[_endingVertex];
    }
}

module.exports = WeightedGraph;