const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname,'input.txt');

fs.readFile(inputPath,'utf-8', (err,data) =>{
    if(err) {
        console.log(`Cannot open the file: ${inputPath}`)
    } else {
        const cmdList = data.split('\r\n');

        function readCmd(cmd) {
            // Push starting directory to the stack
            if(cmd === '$ cd /') {
                directoriesStack.push('/');
                currentPath = directoriesStack.join('');
            }
        
            // Pop the directory from the stack
            if(cmd === '$ cd ..') {
                directoriesStack.pop();
                currentPath = directoriesStack.join('');
            }
        
            // Push directory name to stack
            if(/\$ cd \w+/.test(cmd)) {
                const directoryName = cmd.match(/\w+/g)[1];
                directoriesStack.push(directoryName + '/');
                currentPath = directoriesStack.join('');
            }
        
            // Inscrease all directory sizes by new file size
            if(/\d+ .*/.test(cmd)) {
                const fileSize = parseInt(cmd.match(/\d+/g));
                for (let i = 1; i <= directoriesStack.length; i++) {
                    const stackedDirectory = directoriesStack.slice(0,i).join('');
                    directoriesSizes.hasOwnProperty(stackedDirectory) ? directoriesSizes[stackedDirectory] += fileSize : directoriesSizes[stackedDirectory] = fileSize;
                }
            };
        }

        let directoriesStack = [];
        let currentPath = '';
        let directoriesSizes = {};

        cmdList.forEach(cmd => {
            readCmd(cmd);
        });

        const maximumSpace = 70_000_000;
        const requiredSpace = 30_000_000;
        
        const spaceToRelease = requiredSpace - (maximumSpace - directoriesSizes['/']);

        let smallestDirectorySizeToDelete = directoriesSizes['/'];

        for(let dir in directoriesSizes) {
            if(directoriesSizes[dir] >= spaceToRelease) {
                smallestDirectorySizeToDelete = Math.min(smallestDirectorySizeToDelete,directoriesSizes[dir]);
            }
        }

        console.log(smallestDirectorySizeToDelete);

    }
});