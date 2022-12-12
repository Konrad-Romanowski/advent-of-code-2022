// Priority Queue implemented on the Min Binary Heap - the lower priority value of an item the higher importance
// Please note that in this implementation items with same priority are not always dequeued with the insertion order

class Node {
    constructor(_item,_priority) {
        this.item = _item;
        this.priority = _priority;
    }
}

class PriorityQueue {
    constructor() {
        this.items = [];
    }

    swapItems(_index1,_index2) {
        [this.items[_index1],this.items[_index2]] = [this.items[_index2],this.items[_index1]];
    }

    bubbleUp(_itemIndex) {
        if (_itemIndex === 0) return;

        let _parentItemIndex = Math.floor((_itemIndex - 1)/2);
        let newItemPriority = this.items[_itemIndex].priority;
        let parentItemPriority = this.items[_parentItemIndex].priority;

        if(newItemPriority < parentItemPriority) {
            this.swapItems(_parentItemIndex,_itemIndex);
            this.bubbleUp(_parentItemIndex);
        }
    }

    bubbleDown(_parentItemIndex) {
        let leftChildIindex = _parentItemIndex * 2 + 1;
        let rightChildIndex = _parentItemIndex * 2 + 2;

        if(leftChildIindex > this.items.length - 1) return;

        let indexToSwap = leftChildIindex;
        
        if(rightChildIndex <= this.items.length - 1) {
            let leftChildPriority = this.items[leftChildIindex].priority
            let rightChildPriority = this.items[rightChildIndex].priority
            indexToSwap = leftChildPriority <= rightChildPriority ? leftChildIindex : rightChildIndex;
        }
        let itemToSwapPriority = this.items[indexToSwap].priority;
        
        let parentItemPriority = this.items[_parentItemIndex].priority;
        if(itemToSwapPriority < parentItemPriority) {
            this.swapItems(_parentItemIndex,indexToSwap);
            this.bubbleDown(indexToSwap);
        }
    }

    enqueue(_item,_priority) {
        let newItem = new Node(_item,_priority);
        this.items.push(newItem);

        let newItemIndex = this.items.length - 1;

        this.bubbleUp(newItemIndex);

        return this;
    }

    dequeue() {
        let lestItemIndex = this.items.length - 1

        this.swapItems(0,lestItemIndex);
        let firstItem = this.items.pop();

        this.bubbleDown(0);

        return firstItem;
    }
}

module.exports = {Node, PriorityQueue};