const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

// opponents moves:
// A - rock
// B - paper
// C - scissors

// my moves:
// X - rock
// Y - paper
// Z - scissors

function scoreForSelection(move) {
    if(move==='X') return 1
    if(move==='Y') return 2
    if(move==='Z') return 3
}

function scoreForStrategy(opponentsMove, myMove) {
    if(opponentsMove === 'A' && myMove === 'X') return 3
    if(opponentsMove === 'A' && myMove === 'Y') return 6
    if(opponentsMove === 'A' && myMove === 'Z') return 0

    if(opponentsMove === 'B' && myMove === 'X') return 0
    if(opponentsMove === 'B' && myMove === 'Y') return 3
    if(opponentsMove === 'B' && myMove === 'Z') return 6

    if(opponentsMove === 'C' && myMove === 'X') return 6
    if(opponentsMove === 'C' && myMove === 'Y') return 0
    if(opponentsMove === 'C' && myMove === 'Z') return 3
}

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const dataAsArray = data.split('\r\n');

        const rounds = dataAsArray.reduce((game,round)=>{
            game.push({opponentsMove: round[0], myMove: round[2]});
            return game;
        },[]);

        let score = rounds.reduce((totalScore,round)=>{
            return totalScore += scoreForSelection(round.myMove) + scoreForStrategy(round.opponentsMove, round.myMove);
        },0)

        console.log(score);

    }
});

