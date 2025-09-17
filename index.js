const DisplayDom = (() => {
    const container = document.querySelector(".board-container");

    return {};
})();




const GameboardModule = (() => {
    let gameboardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const displayGameboard = () => {
        console.log(`${gameboardArray[0]} | ${gameboardArray[1]} | ${gameboardArray[2]}`);
        console.log('---------');
        console.log(`${gameboardArray[3]} | ${gameboardArray[4]} | ${gameboardArray[5]}`);
        console.log('---------');
        console.log(`${gameboardArray[6]} | ${gameboardArray[7]} | ${gameboardArray[8]}`);
    }

    const newGameboard = () => {gameboardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8]};

    const makeMove = (indexValue, mark) => {
        if(typeof gameboardArray[indexValue] === "number") {
            gameboardArray[indexValue] = mark;
            return true;
        } else {
            console.log("Taken") ;
            return false;
        }
    }
    return {displayGameboard, newGameboard, makeMove};
})();

function CreatePlayer(name, mark) {
    let moves = [];
    return {name, mark, moves};
}

const Player1 = CreatePlayer("Simon", "X");
const Player2 = CreatePlayer("Paj", "O");

const GameController = (() => {
    let currentPlayer = Player1;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === Player1 ? Player2 : Player1;
    };

    const checkForWinner = () => {
        const winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        return winningCombinations.some(combo =>
            combo.every(num => currentPlayer.moves.includes(num))
        );
    }

    const playTurn = () => {

        let userInput = prompt(`${currentPlayer.name} turn, choose position 0-8!`)
        let index = parseInt(userInput);
        if (isNaN(index) || index < 0 || index > 8) {
            console.log("Invalid input");
            playTurn();
            return;
        }

        if(GameboardModule.makeMove(index, currentPlayer.mark)) {
            GameboardModule.displayGameboard();

            currentPlayer.moves.push(index);
            if(checkForWinner()) {
                console.log(`${currentPlayer.name} won!`)
            } else {
                console.log(currentPlayer.moves);
                switchPlayer();
                console.log(`${currentPlayer.name} turn`);
                playTurn();
            }
        } else {
            console.log("Taken");
            playTurn();
        }
    };
    const startGame = () => {
        console.log("starting new game");
        GameboardModule.newGameboard();
        currentPlayer = Player1;
        GameboardModule.displayGameboard();
        playTurn();
    };

    return {startGame};
})();
