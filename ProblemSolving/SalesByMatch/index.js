'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on('end', (_) => {
  inputString = inputString
    .replace(/\s*$/, '')
    .split('\n')
    .map((str) => str.replace(/\s*$/, ''));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the sockMerchant function below.
function sockMerchant(numberOfSockets, arrayOfSockets) {
  let numberOfPairs = 0;

  for (let index = 0; index < numberOfSockets; index++) {
    const firstSocket = arrayOfSockets[0];

    if (arrayOfSockets.length < 2 || firstSocket === undefined) {
      break;
    }

    for (
      let segundoIndex = 0;
      segundoIndex < arrayOfSockets.length;
      segundoIndex++
    ) {
      if (segundoIndex === 0) {
        continue;
      }

      const secondSocket = arrayOfSockets[segundoIndex];
      if (firstSocket === secondSocket) {
        arrayOfSockets.splice(arrayOfSockets.indexOf(firstSocket), 1);
        arrayOfSockets.splice(arrayOfSockets.indexOf(secondSocket), 1);
        numberOfPairs += 1;
        break;
      }

      if (segundoIndex + 1 === arrayOfSockets.length) {
        arrayOfSockets.splice(0, 1);
      }
    }
  }

  return numberOfPairs;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine(), 10);

  const ar = readLine()
    .split(' ')
    .map((arTemp) => parseInt(arTemp, 10));

  let result = sockMerchant(n, ar);

  ws.write(result + '\n');

  ws.end();
}
