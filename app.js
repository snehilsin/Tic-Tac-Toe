let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn  = document.querySelector("#new-game-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// how to decide who will be next : X or O?
let turnO = true;  // O will come first


//let us store all the 8 possible winning patterns
// using a 2d array

const winPatterns =[ 
    // could also use a string but 2d array is better
    [0, 1, 2],
    [3, 4, 5],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    [6, 7, 8],
    [0, 3, 6],

] ;


const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
  };
  
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (turnO) {
        //playerO
        box.innerText = "O";
        turnO = false;
      } else {
        //playerX
        box.innerText = "X";
        turnO = true;
      }
      box.disabled = true;
      count++;
  
      let isWinner = checkWinner();
  
      if (count === 9 && !isWinner) {
        gameDraw();
      }
    });
  });
  
  const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };
const disableBoxes = () =>{
    // as soon as we get one winner, that is final, no more checking for another winner in 1 game
    for ( let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () =>{
    // enable the boxes again when game is reset
    for ( let box of boxes){
        box.disabled = true;
    }
};
const showWinner = (winner) =>{
    msg.innerText = "Congratulations, Winner is $(winner)";
    msgContainer.classList.remove("hide");   // now, show the winner msg
    disableBoxes();
};
const checkWinner = () => {
    for (let pattern of winPatterns) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;
  
      if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
          showWinner(pos1Val);
          return true;
        }
      }
    }
  };




  newGameBtn.addEventListener("click", resetGame);
  resetBtn.addEventListener("click", resetGame);