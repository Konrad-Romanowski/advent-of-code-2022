// Note that below solution is not 100% correct!!!
// However, probably due to the specific input, it allowed me to get the correct answer,
// therefore I decided to push this code to this repository.

const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');


function areInCorrectOrder(left,right) {

    function compare(left,right) {
        // left run out of items
        if(typeof left === 'undefined' && typeof right !== 'undefined') {
            return true;
        }

        // right run out of items
        if(typeof left !== 'undefined' && typeof right === 'undefined') {
            return false;
        }

        // both left and right are arrays
        if(typeof left !== 'number' && typeof right !== 'number') {

            let maxLength = Math.max(left.length,right.length);

            for(let i = 0; i < maxLength; i++) {
                if(compare(left[i], right[i]) === undefined) {
                    continue;
                } else {
                    return compare(left[i],right[i]);
                }
            }
        }

        // left - not array, right - array
        if(typeof left === 'number' && typeof right !== 'number') {
            return compare([left],right);
        }

        // left - array, right - not array
        if(typeof left !== 'number' && typeof right === 'number') {
            return compare(left,[right]);
        }

        // both left and right are numbers
        if(typeof left === 'number' && typeof right === 'number') {
            if(left < right) return true;
            if(left > right) return false;
        }
    }

    return compare(left,right);
}

function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (!areInCorrectOrder(arr[j],arr[j + 1])) {
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
            }
        }
    }
    return arr;
};

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const packetsInput = data.split('\r\n');

        let packets = [[[2]],[[6]]];

        packetsInput.forEach(packet => {
            if (packet !== '') packets.push(JSON.parse(packet));
        });

        packets = bubbleSort(packets);
        let decoderKey = 1;

        packets.forEach((packet,index) => {
            if(JSON.stringify(packet) === '[[2]]' || JSON.stringify(packet) === '[[6]]') decoderKey*=index;

        });

        console.log(decoderKey);

        console.log(packets[0]); // undefined
    }
});