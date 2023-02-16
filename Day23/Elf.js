module.exports = class Elf {
    constructor(y,x) {
        this.y = y;
        this.x = x;
        this.movesQueue = ['N','S','W','E'];
        this.currentMove;
        this.nextPosition = {y:this.y, x:this.x}
        this.canMove = false;
    }

    isOtherElfAtNW(map) {
        const position = JSON.stringify([this.y-1,this.x-1]);
        if(map[position]) return true;
        return false;
    }

    isOtherElfAtN(map) {
        const position = JSON.stringify([this.y-1,this.x]);
        if(map[position]) return true;
        return false;
    }

    isOtherElfAtNE(map) {
        const position = JSON.stringify([this.y-1,this.x+1]);
        if(map[position]) return true;
        return false;
    }

    isOtherElfAtE(map) {
        const position = JSON.stringify([this.y,this.x+1]);
        if(map[position]) return true;
        return false;
    }

    isOtherElfAtSE(map) {
        const position = JSON.stringify([this.y+1,this.x+1]);
        if(map[position]) return true;
        return false;
    }

    isOtherElfAtS(map) {
        const position = JSON.stringify([this.y+1,this.x]);
        if(map[position]) return true;
        return false;
    }

    isOtherElfAtSW(map) {
        const position = JSON.stringify([this.y+1,this.x-1]);
        if(map[position]) return true;
        return false;
    }

    isOtherElfAtW(map) {
        const position = JSON.stringify([this.y,this.x-1]);
        if(map[position]) return true;
        return false;
    }

    isIsolated(map) {
        if(this.isOtherElfAtNW(map)) return false;
        if(this.isOtherElfAtN(map)) return false;
        if(this.isOtherElfAtNE(map)) return false;
        if(this.isOtherElfAtE(map)) return false;
        if(this.isOtherElfAtSE(map)) return false;
        if(this.isOtherElfAtS(map)) return false;
        if(this.isOtherElfAtSW(map)) return false;
        if(this.isOtherElfAtW(map)) return false;
        return true;
    }

    canMoveTo(direction,map) {
        if(direction === 'N') {
            return !this.isOtherElfAtNW(map) &&
                   !this.isOtherElfAtN(map) &&
                   !this.isOtherElfAtNE(map)
        }

        if(direction === 'S') {
            return !this.isOtherElfAtSW(map) &&
                   !this.isOtherElfAtS(map) &&
                   !this.isOtherElfAtSE(map);
        }

        if(direction === 'W') {
            return !this.isOtherElfAtNW(map) &&
                   !this.isOtherElfAtW(map) &&
                   !this.isOtherElfAtSW(map);
        }

        if(direction === 'E') {
            return !this.isOtherElfAtNE(map) &&
                   !this.isOtherElfAtE(map) &&
                   !this.isOtherElfAtSE(map);
        }
        
    }

    // Below function returns first valid move - direction in which elf can move,
    // if there is no such move it returns null.
    setDirection(map) {
        for(let i = 0; i < this.movesQueue.length; i++) {
            if(this.canMoveTo(this.movesQueue[i],map)) {
                this.currentMove = this.movesQueue[i];
                return this.movesQueue[i];
            }
        }

        return null;
    }

    setNextPosition(direction) {
        if(direction === 'N') this.nextPosition.y -=1
        if(direction === 'S') this.nextPosition.y +=1;
        if(direction === 'W') this.nextPosition.x -=1;
        if(direction === 'E') this.nextPosition.x +=1;
    }

    update() {
        this.nextPosition.y = this.y;
        this.nextPosition.x = this.x;
        this.canMove = false;

        // Update moves queue
        const firstMove = this.movesQueue.shift();
        this.movesQueue.push(firstMove);
    }

    move() {
        this.y = this.nextPosition.y;
        this.x = this.nextPosition.x;
    }
}