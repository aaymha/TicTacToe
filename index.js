function CreatePlayer(name, mark) {
    const moves = [];

    return {name, mark, moves: []};
}
const Player1 = CreatePlayer("Simon", "X");
const Player2 = CreatePlayer("Paj", "O");

const DisplayDom = (() => {
    const boxArea = document.querySelectorAll(".box");

    function populateBoard() {
        boxArea.forEach(box => {
            box.addEventListener("click", function (e) {
                GameController.makeMove(parseInt(e.target.id));
            });
        });
    }

    function updateBox(boxId, mark) {
        boxArea[boxId].textContent = mark;
    }

    function isBoxEmpty(boxId) {
        return boxArea[boxId].textContent === "";
    }

    function clearBoard() {
        document.querySelectorAll(".box").forEach(box => {
            box.textContent = "";
        });
    }

    return {populateBoard, updateBox, isBoxEmpty, clearBoard};
})();

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

    const checkForTie = () => {
        return Player1.moves.length + Player2.moves.length >= 8
    }

   const makeMove = (boxId) => {
        if(!DisplayDom.isBoxEmpty(boxId)) return;

        currentPlayer.moves.push(boxId);
        DisplayDom.updateBox(boxId, currentPlayer.mark);

        if(checkForWinner()) {
            alert(`${currentPlayer.name} has won!`)
            startGame();
        }

        if(checkForTie()) {
            alert("Its a tie!");
            startGame();
        }

        switchPlayer();
   }

    const startGame = () => {
        currentPlayer = Player1;
        Player1.moves = [];
        Player2.moves = [];
        DisplayDom.clearBoard();
        DisplayDom.populateBoard();

    };

    return {startGame, makeMove};
})();

GameController.startGame();