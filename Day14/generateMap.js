module.exports = function generateMap(rockPaths) {
    const map = {}

    rockPaths.forEach(path => {
        for(let i = 0; i < path.length - 1; i++) {
            drawPath(map,path[i],path[i+1]);
        }
    });
    
    return map;
}

function drawPath(map,p1,p2) {
    // draw horizontal line
    if(p1.x === p2.x) {
        const yStart = Math.min(p1.y,p2.y);
        const yEnd = Math.max(p1.y,p2.y);

        for(let i = yStart; i <= yEnd; i++) {
            map.hasOwnProperty(`${p1.x},${i}`) ? null : map[`${p1.x},${i}`] = '#';
        }
    }

    // draw vertical line
    if(p1.y === p2.y) {
        const xStart = Math.min(p1.x,p2.x);
        const xEnd = Math.max(p1.x,p2.x);

        for(let i = xStart; i <= xEnd; i++) {
            map.hasOwnProperty(`${i},${p1.y}`) ? null : map[`${i},${p2.y}`] = '#';
        }
    }
}