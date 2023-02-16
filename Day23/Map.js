module.exports = class Map {
    constructor() {
        this.occupiedCoordinates = {};
    }

    update(elvesList) {
        this.occupiedCoordinates = {};

        elvesList.forEach(elf => {
            this.occupiedCoordinates[JSON.stringify([elf.y,elf.x])] = elf;
        });
    }
}