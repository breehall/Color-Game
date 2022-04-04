const colorPrompt = document.getElementById('color-prompt');
const currentlyGuessing = document.getElementById('color-val');
const mainGameArea = document.getElementById('main-game-area');
const playArea = document.getElementById('game-pieces');
const easyButton = document.getElementById('difficulty-easy');
const hardButton = document.getElementById('difficulty-hard');
const startGameButton = document.getElementById('start-game-btn');
const timer = document.getElementById('timer');
const scoreLabel = document.getElementById('score');
const endGame = document.getElementById('end-game');

var gamePieces = [];
var winningColorVal;
var gameDifficulty = 'easy';
var gameColorFormat = 'rgb';
var gameInAction = false;
var score = 0;
var timeRemaining = 60;
var timeHandlers;

const winningText = '🎉 Congratulations! You won!';
const losingText = '☹️ You may need some more practice';
const playAgainButton = '<button id="play-again-btn" onClick="resetGame()">Play Again</button>'

const createRGBVal = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const rgbVal = `rgb(${r}, ${g}, ${b})`;
    return rgbVal;
}

const creatHexVal = () => {
    const hexVal = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`;
    return hexVal;
}

const setGame = (difficulty, colorFormat) => {
    gameDifficulty = difficulty;
    gameColorFormat = colorFormat;

    if (difficulty === 'easy'){
        let winningIndex = Math.floor(Math.random() * 6);

        for (let i = 0; i < 6; i++){
            let val = gameColorFormat == 'rgb' ? createRGBVal() : creatHexVal();
            gamePieces[i] = val;
            if (i == winningIndex) {
                winningColorVal = val;
                currentlyGuessing.textContent = winningColorVal;
            }
             
        }
    } else {
        let winningIndex = Math.floor(Math.random() * 9);

        winningColorVal = winningIndex;
        currentlyGuessing.textContent = winningColorVal;

        for (let i = 0; i < 9; i++){
            let val = gameColorFormat == 'rgb' ? createRGBVal() : creatHexVal();
            gamePieces[i] = val;
            if (i == winningIndex) {
                winningColorVal = val;
                currentlyGuessing.textContent = winningColorVal;
            }
        }
    }

    gamePieces.forEach( ele => {
        playArea.innerHTML += 
        `<div class="game-piece" style="background-color: ${ele}" onclick="guessColor(event)"><span class="hide game-piece-color-val">${ele}</span></div>`
    })
}

const guessColor = (event) => {
    const gamePieceSelected = event.target;
    let colorGuessed;
    if (gameColorFormat == 'hex'){
        colorGuessed = rgb2hex(event.target.style.backgroundColor);
    } else {
        colorGuessed = event.target.style.backgroundColor;
    }
    
    if (colorGuessed === winningColorVal){
        let allGamePieces = playArea.children;

        for (let i = 0; i < allGamePieces.length ; i++){
            allGamePieces[i].style.backgroundColor = winningColorVal;
            allGamePieces[i].classList.remove('incorrect-guess');

            const revealColorCode = allGamePieces[i].children[0];
            revealColorCode.classList.add('hide');
        }
        score ++;

        setTimeout(() => {
            scoreLabel.textContent = score;
            resetBoard();
        }, 750);

    } else {
        gamePieceSelected.classList.add('incorrect-guess');
        gamePieceSelected.style.backgroundColor = 'rgba(255,255,255,0)';

        const revealColorCode = gamePieceSelected.children[0];
        revealColorCode.classList.remove('hide');
    }
}

const resetBoard = () => {
    playArea.innerHTML = '';
    gamePieces = [];
    winningColorVal = '';
    setGame(gameDifficulty, gameColorFormat);
}

const resetGame = () => {
    playArea.innerHTML = '';
    gamePieces = [];
    winningColorVal = '';
    score = 0;
    scoreLabel.textContent = '0';
    timeRemaining = 60;
    startGame();
}

const startGame = () => {
    setGame(gameDifficulty, gameColorFormat);
    startGameButton.classList.add('hide');
    colorPrompt.classList.remove('hide');
    colorPrompt.classList.add('show-prompt-timer');
    playArea.classList.remove('hide');
    mainGameArea.classList.remove('hide');
    endGame.innerHTML = '';
    currentlyGuessing.textContent = winningColorVal;
    timeHandlers = setTimer();
}

const setTimer = () => {
    const countDown = setInterval(() => {

    if(timeRemaining <= 0){
        clearInterval(countDown);
        finishGame();
    }

    if (timeRemaining == 60){
        timer.textContent = '01:00';
    } else if (timeRemaining > 9 ) {
        timer.textContent = `00:${timeRemaining}`;
    } else {
        timer.textContent = `00:0${timeRemaining}`;
    }
    
    timeRemaining--;

    }, 1000);

    return {
        stop () {
            clearInterval(countDown);
        }
    }
}

const finishGame = () => {
    mainGameArea.classList.add('hide');
    score >= 5 ? endGame.textContent = winningText : endGame.textContent = losingText;
    endGame.innerHTML += `<br><strong>Final Score:</strong> ${score}<br>`;
    endGame.innerHTML += playAgainButton;
}

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`


const setGameDifficulty = (newDifficulty) => {
    gameDifficulty = newDifficulty;
    timeHandlers.stop();
    resetGame();
}

const setGameColorFormat = (newColorFormat) => {
    gameColorFormat = newColorFormat;
    timeHandlers.stop();
    resetGame();
}
