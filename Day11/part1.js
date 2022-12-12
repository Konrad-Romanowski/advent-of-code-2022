// TODO:
// create monkey objects from the data in the input file instead of hardcoding them

const monkeys = Array.from({length:7}, monkey => {return {}});

monkeys[0] = {
    items: [98,89,52],
    numberOfInsepctions: 0,
    calculateWorryLevel: function (item) {return item * 2},

    passItemToMonkey: function (monkeyNumber,item) {
        monkeys[monkeyNumber].items.push(item);
    },

    inspectItem() {
        while(this.items.length > 0) {
            const inspectedItem = this.items.shift();
            this.numberOfInsepctions++;
    
            const newWorryLevel = Math.floor(this.calculateWorryLevel(inspectedItem)/3);
    
            newWorryLevel % 5 === 0 ?
                this.passItemToMonkey(6, newWorryLevel) :
                this.passItemToMonkey(1, newWorryLevel);
        }
    }
}

monkeys[1] = {
    items: [57, 95, 80, 92, 57, 78],
    numberOfInsepctions: 0,
    calculateWorryLevel: function (item) {return item * 13},

    passItemToMonkey: function (monkeyNumber,item) {
        monkeys[monkeyNumber].items.push(item);
    },

    inspectItem() {
        while(this.items.length > 0) {
            const inspectedItem = this.items.shift();
            this.numberOfInsepctions++;
    
            const newWorryLevel = Math.floor(this.calculateWorryLevel(inspectedItem)/3);
    
            newWorryLevel % 2 === 0 ?
                this.passItemToMonkey(2, newWorryLevel) :
                this.passItemToMonkey(6, newWorryLevel);
        }
    }
}

monkeys[2] = {
    items: [82, 74, 97, 75, 51, 92, 83],
    numberOfInsepctions: 0,
    calculateWorryLevel: function (item) {return item + 5},

    passItemToMonkey: function (monkeyNumber,item) {
        monkeys[monkeyNumber].items.push(item);
    },

    inspectItem() {
        while (this.items.length > 0) {
            const inspectedItem = this.items.shift();
            this.numberOfInsepctions++;
    
            const newWorryLevel = Math.floor(this.calculateWorryLevel(inspectedItem)/3);
    
            newWorryLevel % 19 === 0 ?
                this.passItemToMonkey(7, newWorryLevel) :
                this.passItemToMonkey(5, newWorryLevel);
        }
    }
}

monkeys[3] = {
    items: [97, 88, 51, 68, 76],
    numberOfInsepctions: 0,
    calculateWorryLevel: function (item) {return item + 6},

    passItemToMonkey: function (monkeyNumber,item) {
        monkeys[monkeyNumber].items.push(item);
    },

    inspectItem() {
        while(this.items.length > 0) {
            const inspectedItem = this.items.shift();
            this.numberOfInsepctions++;
    
            const newWorryLevel = Math.floor(this.calculateWorryLevel(inspectedItem)/3);
    
            newWorryLevel % 7 === 0 ?
                this.passItemToMonkey(0, newWorryLevel) :
                this.passItemToMonkey(4, newWorryLevel);
        }
    }
}

monkeys[4] = {
    items: [63],
    numberOfInsepctions: 0,
    calculateWorryLevel: function (item) {return item + 1},

    passItemToMonkey: function (monkeyNumber,item) {
        monkeys[monkeyNumber].items.push(item);
    },

    inspectItem() {
        while(this.items.length > 0) {
            const inspectedItem = this.items.shift();
            this.numberOfInsepctions++;
    
            const newWorryLevel = Math.floor(this.calculateWorryLevel(inspectedItem)/3);
    
            newWorryLevel % 17 === 0 ?
                this.passItemToMonkey(0, newWorryLevel) :
                this.passItemToMonkey(1, newWorryLevel);
        }
    }
}

monkeys[5] = {
    items: [94, 91, 51, 63],
    numberOfInsepctions: 0,
    calculateWorryLevel: function (item) {return item + 4},

    passItemToMonkey: function (monkeyNumber,item) {
        monkeys[monkeyNumber].items.push(item);
    },

    inspectItem() {
        while(this.items.length > 0) {
            const inspectedItem = this.items.shift();
            this.numberOfInsepctions++;
    
            const newWorryLevel = Math.floor(this.calculateWorryLevel(inspectedItem)/3);
    
            newWorryLevel % 13 === 0 ?
                this.passItemToMonkey(4, newWorryLevel) :
                this.passItemToMonkey(3, newWorryLevel);
        }
    }
}

monkeys[6] = {
    items: [61, 54, 94, 71, 74, 68, 98, 83],
    numberOfInsepctions: 0,
    calculateWorryLevel: function (item) {return item + 2},

    passItemToMonkey: function (monkeyNumber,item) {
        monkeys[monkeyNumber].items.push(item);
    },

    inspectItem() {
        while(this.items.length > 0) {
            const inspectedItem = this.items.shift();
            this.numberOfInsepctions++;
    
            const newWorryLevel = Math.floor(this.calculateWorryLevel(inspectedItem)/3);
    
            newWorryLevel % 3 === 0 ?
                this.passItemToMonkey(2, newWorryLevel) :
                this.passItemToMonkey(7, newWorryLevel);
        }
    }
}

monkeys[7] = {
    items: [90, 56],
    numberOfInsepctions: 0,
    calculateWorryLevel: function (item) {return item * item},

    passItemToMonkey: function (monkeyNumber,item) {
        monkeys[monkeyNumber].items.push(item);
    },

    inspectItem() {
        while(this.items.length > 0) {
            const inspectedItem = this.items.shift();
            this.numberOfInsepctions++;
    
            const newWorryLevel = Math.floor(this.calculateWorryLevel(inspectedItem)/3);
    
            newWorryLevel % 11 === 0 ?
                this.passItemToMonkey(3, newWorryLevel) :
                this.passItemToMonkey(5, newWorryLevel);
        }
    }
}

for(let i = 0; i < 20; i++) {
    monkeys.forEach(monkey => monkey.inspectItem());
}

const inspectionsAfter20Rounds = monkeys.map(monkey => monkey.numberOfInsepctions);
inspectionsAfter20Rounds.sort((a,z) => z-a);

const monkeyBusiness = inspectionsAfter20Rounds[0] * inspectionsAfter20Rounds[1];

console.log(monkeyBusiness);





