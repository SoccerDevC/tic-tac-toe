// Cell module
function Cell() {
    let value = 0; // 0 = empty, 1 = player 1, 2 = player 2

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}

// Gameboard module
function Gameboard() {
    let gameboard = [];

    // Create a 3x3 grid of cells
    for (let i = 0; i < 3; i++) {
        gameboard[i] = [];
        for (let j = 0; j < 3; j++) {
            gameboard[i].push(Cell());
        }
    }

    const getBoard = () => gameboard;

    const dropToken = (row, column, player) => {
        if (gameboard[row][column].getValue() === 0) {
            gameboard[row][column].addToken(player);
            return true;
        }
        return false;
    };

    const checkWinner = () => {
        // Check rows, columns, and diagonals for a winner
        for (let i = 0; i < 3; i++) {
            if (gameboard[i][0].getValue() === gameboard[i][1].getValue() && gameboard[i][1].getValue() === gameboard[i][2].getValue() && gameboard[i][0].getValue() !== 0) {
                return gameboard[i][0].getValue();
            }
            if (gameboard[0][i].getValue() === gameboard[1][i].getValue() && gameboard[1][i].getValue() === gameboard[2][i].getValue() && gameboard[0][i].getValue() !== 0) {
                return gameboard[0][i].getValue();
            }
        }

        // Check diagonals
        if (gameboard[0][0].getValue() === gameboard[1][1].getValue() && gameboard[1][1].getValue() === gameboard[2][2].getValue() && gameboard[0][0].getValue() !== 0) {
            return gameboard[0][0].getValue();
        }
        if (gameboard[0][2].getValue() === gameboard[1][1].getValue() && gameboard[1][1].getValue() === gameboard[2][0].getValue() && gameboard[0][2].getValue() !== 0) {
            return gameboard[0][2].getValue();
        }

        return null; // No winner
    };

    const printBoard = () => {
        const boardWithCellValues = gameboard.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return {
        getBoard,
        dropToken,
        checkWinner,
        printBoard
    };
}

// GameController module
function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    let board = Gameboard();
    const players = [
        { name: playerOneName, token: 1 },
        { name: playerTwoName, token: 2 }
    ];

    let activePlayer = players[0];

    const changePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const resetGame = () => {
        board = Gameboard();
        activePlayer = players[0];
        renderBoard(board.getBoard());
        updateStatus();
    };

    const playRound = (row, column) => {
        const moved = board.dropToken(row, column, activePlayer.token);
        if (moved) {
            renderBoard(board.getBoard());
            const winner = board.checkWinner();
            if (winner) {
                updateStatus(`${winner === 1 ? players[0].name : players[1].name} wins!`);
            } else {
                changePlayer();
                updateStatus(`${getActivePlayer().name}'s turn!`);
            }
        }
    };

    const updateStatus = (message = `${getActivePlayer().name}'s turn!`) => {
        document.getElementById('status').textContent = message;
    };

    return {
        playRound,
        resetGame,
        getActivePlayer,
        getBoard: board.getBoard
    };
}

// Render board
function renderBoard(board) {
    const gameboardDiv = document.getElementById("gameboard");
    gameboardDiv.innerHTML = ''; // Clear previous board

    board.forEach((row, i) => {
        row.forEach((cell, j) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.textContent = cell.getValue() === 1 ? "X" : cell.getValue() === 2 ? "O" : "";
            cellDiv.addEventListener("click", () => {
                game.playRound(i, j);
            });
            gameboardDiv.appendChild(cellDiv);
        });
    });
}

// Initialize the game
const game = GameController();

// Initialize event listeners for reset
document.getElementById("reset-button").addEventListener("click", () => {
    game.resetGame();
});

// Start by rendering the empty board
renderBoard(game.getBoard());
