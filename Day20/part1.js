const fs = require('fs');
const path = require('path');
const CircularLinkedList = require('./CircularLinkedList.js');

const inputPath = path.join(__dirname,'input.txt');

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const sequence = data.split('\r\n');
        const itemsQueue = [];

        const linkedList = new CircularLinkedList();

        sequence.forEach(number => {
            linkedList.push(parseInt(number));
        });
        
        // populate queue with nodes
        let currentNode = linkedList.head;
        for(let i = 0; i < linkedList.length; i++) {
            itemsQueue.push(currentNode);
            currentNode = currentNode.next;
        }

        while(itemsQueue.length > 0) {
            const node = itemsQueue.shift();
            linkedList.moveNodeBy(node,node.number);
        }

        let sumOfNumbers = 0;

        for(let i = 1; i <= 3; i++) {
            sumOfNumbers+= linkedList.getNthNodeFrom(linkedList.nodeZero,1000 * i).number;
        }

        console.log(sumOfNumbers);
    }
});