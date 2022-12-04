const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

// opponents moves:
// A - rock
// B - paper
// C - scissors

// strategy:
// X - lose
// Y - draw
// Z - win

function scoreForSelectedMove(move) {
    if(move==='A') return 1;
    if(move==='B') return 2;
    if(move==='C') return 3;
}

function choseMove(opponentsMove,result) {
    // what to play to lose
    if(result ==='X' && opponentsMove === 'A') return 'C';
    if(result ==='X' && opponentsMove === 'B') return 'A';
    if(result ==='X' && opponentsMove === 'C') return 'B';

    // what to play to draw
    if(result ==='Y' && opponentsMove === 'A') return 'A';
    if(result ==='Y' && opponentsMove === 'B') return 'B';
    if(result ==='Y' && opponentsMove === 'C') return 'C';

    // what to play to win
    if(result ==='Z' && opponentsMove === 'A') return 'B';
    if(result ==='Z' && opponentsMove === 'B') return 'C';
    if(result ==='Z' && opponentsMove === 'C') return 'A';
}

function scoreforResult(result) {
    if(result === 'X') return 0;
    if(result === 'Y') return 3;
    if(result === 'Z') return 6;
}

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const dataAsArray = data.split('\r\n');

        const rounds = dataAsArray.reduce((game,round)=>{
            game.push({opponentsMove: round[0], result: round[2]});
            return game;
        },[]);

        let score = rounds.reduce((totalScore,round)=>{
            return totalScore += scoreForSelectedMove(choseMove(round.opponentsMove,round.result)) + scoreforResult(round.result);
        },0)

        console.log(score);

    }
});

