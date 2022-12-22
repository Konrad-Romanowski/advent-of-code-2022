const { builtinModules } = require("module");

class Node {
    constructor(number,next = null) {
        this.number = number;
        this.next = next;
    }
}

class CircularLinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
        this.nodeZero = null; // Store node with value of 0;
    }

    push(number) {
        const newNode = new Node(number);

        if (number === 0) {
            this.nodeZero = newNode;
        }

        if (!this.head) {
            this.head = newNode;
            this.head.next = newNode;
        } else {
            let currentNode = this.head;
            while (currentNode.next !== this.head) {
                currentNode = currentNode.next;
            }
            currentNode.next = newNode;
            newNode.next = this.head;
        }

        this.length++;
        return this;
    }

    // Helper function that is used to get prevNode such that prevNode.next = node
    getPreviousNode(node) {
        let nextNode = node.next;

        while(nextNode.next !== node) {
            nextNode = nextNode.next;
        }
        return nextNode;
    }

    getNthNodeFrom(node,N) {
        N = N % this.length;
        
        for(let i = 0; i < N; i++) {
            node = node.next;
        }

        return node;
    }

    moveNodeBy(node,numberOfMoves) {
        
        // Do not perform full laps.
        // Notice that if numberOfMoves = linkedlist.lenght-1 then nothing will change - the node will made one full lap
        // and will get back to its starting position.
        numberOfMoves = numberOfMoves % (this.length-1);

        // Moving "back" is the same as moving "forward" by complement number of steps.
        if(numberOfMoves < 0) numberOfMoves = numberOfMoves + this.length - 1;
        
        if(numberOfMoves === 0) return;

        let prevNode = this.getPreviousNode(node);
        let nextNode = node.next;
        prevNode.next = nextNode;
        let currentNode = node;

        for(let i = 0; i < numberOfMoves; i++) {
            currentNode = currentNode.next;
        }

        node.next = currentNode.next;
        currentNode.next = node;
    }

    // Helper function that print consequent nodes starting from given node
    printListStartingFrom(node) {
        let currentNode = node.next;
        const nodes = [node];
        while(currentNode !== node) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }
        console.log(nodes);
    }
}

module.exports = CircularLinkedList;