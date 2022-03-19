
const currentlyGuessing = document.getElementById('rgb-val');
const playArea = document.getElementById('play-area');
const easyButton = document.getElementById('difficulty-easy');
const hardButton = document.getElementById('difficulty-hard');

var gamePieces = [];
var winningRGBVal;
var gameDifficulty;

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
            i == winningIndex ? winningRGBVal = val : null;
        }
    } else {
        let winningIndex = Math.floor(Math.random() * 9);

        for (let i = 0; i < 9; i++){
            let val = createRGBVal();
            gamePieces[i] = val;
            i == winningIndex ? winningRGBVal = val : null;
        }
    }

    gamePieces.forEach( ele => {
        playArea.innerHTML += 
        `<div class="game-piece-${gameDifficulty}" style="background-color: ${ele}" onclick="guessColor(event)"></div>`
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
        }

    } else {
        gamePieceSelected.classList.add('incorrect-guess')
    }
}

const resetGame = () => {
    playArea.innerHTML = '';
    gamePieces = [];
    winningRGBVal = '';
    setGame(gameDifficulty);
}

const changeDifficulty = (event) => {
    let newDifficulty = event.target.value;

    if (newDifficulty === gameDifficulty){
        return;
    } else {
        easyButton.classList.toggle('active');
        hardButton.classList.toggle('active');
        gameDifficulty = newDifficulty;
        resetGame();
    }
}

window.onload = () => {
    setGame('easy');
    currentlyGuessing.textContent = winningRGBVal;
}
