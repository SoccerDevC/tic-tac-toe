function Gameboard(){
    let gameboard = [];

    for(let i=0; i<3; i++){
        gameboard[i]=[];
        for(let j=0; j<3; j++){
            gameboard[i].push(Cell());
        }
    }
    
    const getBoard =() => gameboard;
    const dropToken = (row,column,player)=> {
        if(gameboard[row][column].getValue()===0){
            gameboard[row][column].addToken(player);
        }
        else{
            console.log("cell is filled");
        }
    };
    const printBoard = () => {
        const boardWithCellValues = gameboard.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
      };
    return{getBoard,dropToken, printBoard};

}

function Cell(){
    let value = 0;

    const addToken = (player) =>{
        value = player;
    };

    const getValue = () => value;
    return{
        addToken,
        getValue
    };
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
){
    let board = Gameboard();
    const players = [
        {
            name:playerOneName,
            token:1
        },
        {
            name:playerTwoName,
            token:2
        }
    ];

    let activePlayer = players[0];

    const changePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1]:
        players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = ()=>{
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn!`);
    };

    const playRound = (row,column) => {
        console.log(`Dropping ${getActivePlayer().name}'s token into cell ${row}, ${column}`);
        board.dropToken(row,column,getActivePlayer().token);
        //check for winner 
        changePlayer();
        printNewRound();
    };
    printNewRound();
    return {
        playRound,
        getActivePlayer
      };
}
const game = GameController();
game.playRound(0, 0); // Player One's turn
game.playRound(0, 1); // Player Two's turn
game.playRound(0, 0); // Player One attempts to drop on an already filled cell
game.playRound(1, 1); // Player Two's turn
game.playRound(2, 2); // Player One's turn