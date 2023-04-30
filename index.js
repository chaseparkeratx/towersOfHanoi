let stone = null;

const selectRow = (row) => {
  const currentRow = row.getAttribute("data-row");

  console.log("Yay, we clicked an item", row);
  console.log("Here is the stone's id: ", row.id);
  console.log("Here is the stone's data-size: ", currentRow);
  if(!stone) {
    pickUpStone(row.id);
  } else {
    dropStone(row.id);
    checkForWin();
  }
};

const pickUpStone = (rowID) => {
  const selectedRow = document.getElementById(rowID);
  stone = selectedRow.lastElementChild;
  selectedRow.removeChild(stone);
  console.log(stone);
};

const dropStone = (rowID) => {
  const selectedRow = document.getElementById(rowID);
  let topStone = selectedRow.lastElementChild;
  if(!topStone) {
    selectedRow.appendChild(stone);
  } else {
    if(topStone.getAttribute("data-size") > stone.getAttribute("data-size")) {
    selectedRow.appendChild(stone);
  } else {
    return alert("Illegal move!");
  }
}
stone = null;
};

const checkForWin = () => {
  const topRow = document.getElementById("top-row").childElementCount;
  if(topRow == 4) {
    return alert("You won!");
  }
}



// * Remember you can use your logic from 'main.js' to maintain the rules of the game. But how? Follow the flow of data just like falling dominoes.

