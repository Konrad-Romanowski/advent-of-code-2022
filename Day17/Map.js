module.exports = class Map {
    constructor() {
        this.previev = [
            ['+','-','-','-','-','-','-','-','+'],
            ['|',' ',' ',' ',' ',' ',' ',' ','|'],
            ['|',' ',' ',' ',' ',' ',' ',' ','|'],
            ['|',' ',' ',' ',' ',' ',' ',' ','|'],
            ['|',' ',' ',' ',' ',' ',' ',' ','|'],
        ];

        this.height = this.previev.length - 1;
        this.towerHeight = 0;
    }

    setTowerHeight() {
        let currentTowerHeight = this.towerHeight;
        while(this.previev[currentTowerHeight].includes('#') || this.previev[currentTowerHeight].includes('-')) {
            currentTowerHeight++;
        }

        this.towerHeight = currentTowerHeight - 1;
    }

    addLevels(nextRockShape) {
        let shapeHeight;
        if(nextRockShape === '_') shapeHeight = 1;
        if(nextRockShape === '+') shapeHeight = 3;
        if(nextRockShape === 'L') shapeHeight = 3;
        if(nextRockShape === '|') shapeHeight = 4;
        if(nextRockShape === 'o') shapeHeight = 2;

        while(this.height < this.towerHeight + shapeHeight + 3) {
            this.previev.push(['|',' ',' ',' ',' ',' ',' ',' ','|']);
            this.height++;
        }
    }
}