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
var winningRGBVal;
var gameDifficulty;
var gameInAction = false;
var score = 0;

const winningText = '🎉 Congratulations! You won!';
const losingText = '☹️ You may need some more practice';

const createRGBVal = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const rgbVal = `rgb(${r}, ${g}, ${b})`;
    return rgbVal;
}

const setGame = (difficulty) => {
    gameDifficulty = difficulty;
    if (difficulty === 'easy'){
        let winningIndex = Math.floor(Math.random() * 6);

        for (let i = 0; i < 6; i++){
            let val = createRGBVal();
            gamePieces[i] = val;
            if (i == winningIndex) {
                winningRGBVal = val;
                currentlyGuessing.textContent = winningRGBVal;
            }
             
        }
    } else {
        let winningIndex = Math.floor(Math.random() * 9);

        winningRGBVal = winningIndex;
        currentlyGuessing.textContent = winningRGBVal;

        for (let i = 0; i < 9; i++){
            let val = createRGBVal();
            gamePieces[i] = val;
            if (i == winningIndex) {
                winningRGBVal = val;
                currentlyGuessing.textContent = winningRGBVal;
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
    const colorGuessed = event.target.style.backgroundColor;

    if (colorGuessed === winningRGBVal){
        let allGamePieces = playArea.children;

        for (let i = 0; i < allGamePieces.length ; i++){
            allGamePieces[i].style.backgroundColor = winningRGBVal;
            allGamePieces[i].classList.remove('incorrect-guess');

            const revealColorCode = allGamePieces[i].children[0];
            revealColorCode.classList.add('hide');
        }
        score ++;
        scoreLabel.textContent = score;
        resetBoard();

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
    winningRGBVal = '';
    setGame(gameDifficulty);
}

const resetGame = () => {
    resetBoard();
    gameInAction = false;
    score = 0;
}

const changeDifficulty = (event) => {
    let newDifficulty = event.target.value;

    if (newDifficulty === gameDifficulty){
        return;
    } else {
        easyButton.classList.toggle('active');
        hardButton.classList.toggle('active');
        gameDifficulty = newDifficulty;
        resetBoard();
    }
}


const startGame = () => {
    setGame('easy');
    startGameButton.classList.add('hide');
    colorPrompt.classList.remove('hide');
    colorPrompt.classList.add('show-prompt-timer');
    //colorPrompt.classList.add('show');
    playArea.classList.remove('hide');
    currentlyGuessing.textContent = winningRGBVal;
    gameInAction = true;
    setTimer();
}

const setTimer = () => {
    let timeRemaining = 60;
    const countDown = setInterval(() => {
      if(timeRemaining <= 0){
        clearInterval(countDown);
        gameInAction = false;
        finishGame();
      }

      if (timeRemaining == 60){
          timer.textContent = '01:00';
      } else if (timeRemaining > 9 ) {
        timer.textContent = `00:${timeRemaining}`;
      } else {
        timer.textContent = `00:0${timeRemaining}`;
      }
      
      timeRemaining -= 1;
    }, 1000);
}

const finishGame = () => {
    mainGameArea.classList.add('hide');

    score >= 5 ? endGame.textContent = winningText : endGame.textContent = losingText;
}