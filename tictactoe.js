document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const game = document.getElementById("game");
    const onePlayerBtn = document.getElementById("onePlayer");
    const twoPlayerBtn = document.getElementById("twoPlayer");
    const restartBtn = document.getElementById("restart");
    const menuButton = document.getElementById("menuButton");
    const status = document.getElementById("status");
    const cells = document.querySelectorAll(".cell");

    let board = Array(9).fill(null);
    let currentPlayer = "X";
    let isGameActive = true;
    let isSinglePlayer = false;

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const checkWinner = () => {
      for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return board.includes(null) ? null : "Draw";
    };

    const computerMove = () => {
const emptyCells = board.map((val, index) => (val === null ? index : null)).filter(val => val !== null);
const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

board[randomIndex] = "O";
cells[randomIndex].innerText = "O";

// Add the o-style class for the computer's move
cells[randomIndex].classList.add("o-style", "taken");

currentPlayer = "X";
updateGameStatus();
};


const updateGameStatus = () => {
    const winner = checkWinner();
    if (winner) {
      isGameActive = false;
      status.innerText = winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`;
      status.style.color = winner === "X" ? "rgb(195, 79, 240)" : "rgb(80, 154, 233)";
      return;
    }
  
    status.innerText = `Player ${currentPlayer}'s Turn`;
    status.style.color = currentPlayer === "X" ? "rgb(195, 79, 240)" : "rgb(80, 154, 233)";
    if (isSinglePlayer && currentPlayer === "O" && isGameActive) {
      setTimeout(computerMove, 500);
    }
  };
  

  const handleCellClick = (e) => {
    const index = e.target.dataset.index;
    if (!isGameActive || board[index]) return;
  
    board[index] = currentPlayer;
    e.target.innerText = currentPlayer;

    e.target.style.color = currentPlayer === "X" ? "rgb(195, 79, 240)" : "rgb(80, 154, 233)";
    e.target.classList.add(currentPlayer === "X" ? "x-style" : "o-style");
    e.target.classList.add("taken");
  
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateGameStatus();
  };
  


    const startGame = (singlePlayer) => {
      isSinglePlayer = singlePlayer;
      menu.classList.add("hidden");
      game.classList.remove("hidden");
      resetGame();
    };

    const resetGame = () => {
      board = Array(9).fill(null);
      currentPlayer = "X";
      isGameActive = true;
      status.innerText = "Player X's Turn";
      cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("taken");
      });
    };

    const goToMenu = () => {
      game.classList.add("hidden");
      menu.classList.remove("hidden");
    };

    onePlayerBtn.addEventListener("click", () => startGame(true));
    twoPlayerBtn.addEventListener("click", () => startGame(false));
    restartBtn.addEventListener("click", resetGame);
    menuButton.addEventListener("click", goToMenu);
    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
});