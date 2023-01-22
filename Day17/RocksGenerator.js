module.exports = class RocksGenerator {
    constructor() {
        this.numberOfGeneratedRocks = 0;
    }

    generateRock(shape,startingHeight) {
        this.numberOfGeneratedRocks+=1;
        return new Rock(shape,startingHeight);
    }
}

class Rock {
    constructor(shape,y) {
        this.isMerged = false;
        this.shape = shape;
        if(shape === '_') {
            this.blocks = [
                {x:3, y},
                {x:4, y},
                {x:5, y},
                {x:6, y}
            ];
        }
        if(shape === '+') {
            this.blocks = [
                {x:3, y: y+1},
                {x:4, y: y+1},
                {x:5, y: y+1},
                {x:4, y: y  },
                {x:4, y: y+2},
            ];
        }
        if(shape === 'L') {
            this.blocks = [
                {x:3, y     },
                {x:4, y     },
                {x:5, y     },
                {x:5, y: y+1},
                {x:5, y: y+2},
            ];
        }
        if(shape === '|') {
            this.blocks = [
                {x:3, y    },
                {x:3, y:y+1},
                {x:3, y:y+2},
                {x:3, y:y+3},
            ];
        }
        if(shape === 'o') {
            this.blocks = [
                {x:3, y     },
                {x:3, y: y+1},
                {x:4, y     },
                {x:4, y: y+1},
            ];
        }
    }

    move(airDirection,map) {
        this.moveByAir(airDirection,map);
        this.moveDown(map);
    }

    moveDown(map) {
        // check if can fall down
        if(this.checkIfCanFallDown(map)){
            // if yes then move all blocks of the rock by one unit down
            this.blocks = this.blocks.map(block => {
                return {...block, y:block.y - 1};
            });
        } else {
            // if rock can't move down (i.e. hits the obstacle) then merge it to map
            this.mergeToMap(map);
        }
    }

    moveByAir(airDirection,map) {
        // check if rock can be pushed by air
        if(this.checkIfCanBeMovedByAir(airDirection,map)) {
            // if yes then move all blocks of the rock by one unit depending on the air direction
            this.blocks = this.blocks.map(block => {
                return airDirection === "<" ? {...block, x: block.x - 1} : {...block, x: block.x + 1}
            });
        }
        // if no - do not do anything
    }

    checkIfCanBeMovedByAir(airDirection,map) {
        let canBePushed = true;

        let nextBlocksPosition = this.blocks.map(block => {
            return airDirection === "<" ? {...block, x: block.x - 1} : {...block, x: block.x + 1}
        });

        nextBlocksPosition.forEach(block => {
            if(map[block.y][block.x] === '#' || map[block.y][block.x] === '|') {
                canBePushed = false;
                return;
            }
        });

        return canBePushed;
    }

    checkIfCanFallDown(map) {
        let canFallDown = true;

        let nextBlocksPosition = this.blocks.map(block => {
            return {...block, y: block.y-1}
        });
        
        nextBlocksPosition.forEach(block => {
            if(map[block.y][block.x] === '#' || map[block.y][block.x] === '-') {
                canFallDown = false;
                return;
            }
        });

        return canFallDown;
    }

    mergeToMap(map) {
        this.blocks.forEach(block => {
            map[block.y][block.x] = '#';
        });
        this.isMerged = true;
    }
}