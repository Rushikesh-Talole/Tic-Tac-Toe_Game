const gameInfo = document.querySelector(".gameInfo");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let current_Player;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    current_Player = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.classList = `box box${index + 1}`;
        box.style.pointerEvents = "all";
    });
    console.log("pahuch hi nhi");
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${current_Player}`;
}

initGame();

function swapTurn(){
    if(current_Player === "X"){
        current_Player = "O";
    }
    else{
        current_Player = "X";
    }
    gameInfo.innerText = `Current Player - ${current_Player}`;
}

function checkGameOver(){
    let winner = "";
    winningPositions.forEach((position) => {
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
        (gameGrid[position[0]] === gameGrid[position[1]])  && (gameGrid[position[1]] === gameGrid[position[2]])
        ){
            winner = gameGrid[position[0]];
            gameInfo.innerText = `winner Player - ${winner}`;
            newGameBtn.classList.add("active");

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        } 
    });

    let fillCount = 0;
    gameGrid.forEach((gridElement) => {
        if(gridElement !== ""){
            fillCount++;
        }
    })

    if(fillCount === 9 && winner === ""){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        gameGrid[index] = current_Player;
        boxes[index].innerText = current_Player;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

newGameBtn.addEventListener("click", initGame);