let isGameOver = false;
let isGameWin = false;

// Audios

let bgmAudio = document.createElement("audio");
bgmAudio.src = "assets/audio/bgm.mp3";

let failAudio = document.createElement("audio");
failAudio.src = "assets/audio/prison_door_slam.mp3";

let successAudio = document.createElement("audio");
successAudio.src = "assets/audio/success.mp3";


// Starting Game
let startScreen = document.getElementById("start-screen");
let startButton = document.getElementById("start-button");
startButton.addEventListener("click", startGame);

function startGame() {
    game.tick();
    bgmAudio.volume = 0.2;
    bgmAudio.play();
    startTimer();
    startScreen.style.display = "none";
}

// Game Fail
function gameFail() {
    let failPopup = document.getElementById("fail-popup");
    failPopup.style.display = "block";
    failAudio.play();
    bgmAudio.pause();
}

// Game Success
function gameSuccess() {
    // Display success popup
    let successPopup = document.getElementById("success-popup");
    successPopup.style.display = "block";

    // audio
    successAudio.volume = 0.3;
    successAudio.play();
    bgmAudio.pause();

    // Remaining time
    let remainingTime = 300 - totalSeconds;
    let remainingMins = Math.floor(remainingTime / 60);
    let remainingSeconds = remainingTime - remainingMins * 60;
    document.getElementById("time-remaining").innerHTML = "Time remaining: " + remainingMins + " hours " + remainingSeconds + " mins"
}

// Count-up Timer
let mins = 1;
let seconds = 0;
let totalSeconds = 0;
let secondsLabel = "00";

function startTimer() {
    if (isGameOver == false && isGameWin == false) {
        setInterval(setTime, 1000);
    }
}


function setTime() {
    ++totalSeconds;
    mins = 1 + Math.floor(totalSeconds / 60);
    seconds = totalSeconds - (mins - 1) * 60;
    if (seconds < 10) {
        secondsLabel = "0" + seconds.toFixed(0);
    } else {
        secondsLabel = seconds.toFixed(0);
    }


    // Output the result
    document.getElementById("timer").innerHTML = mins + ":" + secondsLabel + " ";

    // If the remaining time is less than 1 hour, the time text turns red
    if (totalSeconds >= 240) {
        document.getElementById("timer").style.color = "#CB2529";
        document.getElementById("am").style.color = "#CB2529";
    }

    // When it's daybreak time, game is over
    if (totalSeconds >= 300) {
        isGameOver = true;
    }
}


// Make control tutorial disappear after pressing W/A/S/D
setInterval(isKeyPressed, 1);

let isWPressed = false;
let isAPressed = false;
let isDPressed = false;
let isSPressed = false;
let tutorial01 = document.getElementById("tutorial-01");
let tutorial02 = document.getElementById("tutorial-02");

function isKeyPressed() {
    if (key.isDown(key.UP)) {
        isWPressed = true;
    }
    if (key.isDown(key.LEFT)) {
        isAPressed = true;
    }
    if (key.isDown(key.DOWN)) {
        isSPressed = true;
    }
    if (key.isDown(key.RIGHT)) {
        isDPressed = true;
    }

    removeTutorial01();
}

function removeTutorial01() {
    if (isWPressed === true && isAPressed === true && isDPressed === true && isSPressed === true) {
        tutorial01.style.display = "none";
        tutorial02.style.display = "block";
        return false;
    }


}
