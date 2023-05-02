/* Display */

const displayPlayerXScore = document.querySelector('#player-x-score');
const displayPlayerOScore = document.querySelector('#player-o-score');
const displayWinningPlayer = document.querySelector('#winning-player')
const menu = document.querySelector('.menu-container')
const restartButton = document.querySelector('button');

restartButton.addEventListener('click', (event) => {
    menu.classList.toggle('hidden');
    resetGame();
})


/* Creating the Game Board */
const gameArea = document.querySelector('.game-area');
const gridSize = 3;
for (let i = 1; i < gridSize * gridSize+1; i++){
    const square = document.createElement('div');
    square.setAttribute('class', 'square');
    square.setAttribute('id', i)
    gameArea.appendChild(square)
}
/* ------------------------------ */

const squares = document.querySelectorAll('.square');

let playerXMoves = []
let playerOMoves = []
let playerXScore = 0;
let playerOScore = 0;
let winningPlayer;

displayPlayerXScore.innerHTML = playerXScore;
displayPlayerOScore.innerHTML = playerOScore;

const winningPatterns = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6], 
]

function determineTurn() {
    if (playerXMoves.length <= playerOMoves.length) {
        return true; /* x plays */
    }
}

function checkWin(playerMoves, winningPattern) {
    return winningPattern.some(pattern => {
        return pattern.every(move => {
            return playerMoves.includes(move)
        })
    })
}

function gameOver() {
    menu.classList.toggle('hidden')
    console.log('game over')    
}

function updateScores(){
    displayPlayerXScore.innerHTML = playerXScore;
    displayPlayerOScore.innerHTML = playerOScore;
    displayWinningPlayer.innerHTML = winningPlayer;
}

function resetGame() {
    playerXMoves = [];
    playerOMoves = [];
    squares.forEach(square => {
        square.innerHTML = ''
    })
}

function game() {
    squares.forEach(square => {
        square.addEventListener('click', (event) => {
            if (determineTurn() === true && square.innerHTML === '') {
                const iconX = document.createElement('i');
                iconX.setAttribute('class', 'fa-solid fa-x fa-6x')
                square.appendChild(iconX)
                playerXMoves.push(+event.target.id)
                console.log(playerXMoves)
            }
            else if(square.innerHTML === '') {
                const iconY = document.createElement('i');
                iconY.setAttribute('class', 'fa-solid fa-o fa-6x')
                square.appendChild(iconY)
                playerOMoves.push(+event.target.id)
                console.log(playerOMoves)
            }
            if (checkWin(playerXMoves, winningPatterns)) {
                gameOver();
                playerXScore++;
                winningPlayer = 'X'
                updateScores();
            }
            if (checkWin(playerOMoves, winningPatterns)) {
                gameOver();
                playerOScore++;
                winningPlayer = 'O'
                updateScores();
            }
            if (playerXMoves.length === 5) {
                gameOver()
            }
        })
    })
}
game();




