'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};


const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}



const movePiece = (startStack, endStack) => {
  // take the last part of the array, make it a 'piece'
  // push it to next stack
const startPiece = stacks[startStack].pop();
stacks[endStack].push(startPiece);
return true;
}

const isLegal = (startStack, endStack) => {
  // take the last piece from the first and second choice 
  // if the second stack is empty or a larger number than the first, return true
   const startPiece = stacks[startStack][stacks[startStack].length - 1];
   const endPiece = stacks[endStack][stacks[endStack].length - 1];
    return !endPiece || startPiece < endPiece 
};


const checkForWin = () => {
  // if either stack b or c have a length of 4, return true
  return stacks.b.length === 4 || stacks.c.length === 4;
}


const towersOfHanoi = (startStack, endStack) => {

  if(isLegal(startStack, endStack)) {
    movePiece(startStack, endStack);
    checkForWin();
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}