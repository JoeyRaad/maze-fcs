//Initialized variables
let is_game_running = false; 
let score = 0;

//Declared variables
let end;
let start;
let boundaries;
let status_display; 

document.addEventListener("DOMContentLoaded", loadPage);

function displayScore(message){
    if(message != "")
        status_display.innerHTML = message + "<br/>" + "Your Score is: " + score;
}

function gameOver(){
    if(is_game_running){
        for(let i = 0; i < boundaries.length; i++)
            boundaries[i].style.backgroundColor = "rgb(243, 159, 159)"; 
        if(score > 0)
            score = score - 1;
        displayScore("Game Over!");
        is_game_running = false;
    }
}

function startGame(){
    displayScore("");
    is_game_running = true;
    for(let i = 0; i < boundaries.length; i++)
        boundaries[i].style.backgroundColor = "#eeeeee"; 
}

function endGame(){
    if(is_game_running){
        for(let i = 0; i < boundaries.length; i++)
            boundaries[i].style.backgroundColor = "rgb(113 225 141)"; 
        score = score + 5;
        displayScore("You Won!");
        is_game_running = false;
    }
}

function loadPage(){
    end = document.getElementById("end");
    start = document.getElementById("start");
    boundaries = document.getElementsByClassName("boundary");
    status_display =  document.getElementById("status");

    end.addEventListener("mouseover", endGame);
    start.addEventListener("click", startGame);
    for(let i = 0; i < boundaries.length; i++){
        boundaries[i].addEventListener("mouseover", gameOver);
    }
}
///////////////////////////////////////////////////////////////////////
// JavaScript for Improved Maze Game

let time_remaining = 30; // Countdown timer starting value
let timer_interval;

let reset_button;
let items;

// Load sounds
const winSound = new Audio('win.mp3');
const loseSound = new Audio('lose.mp3');
const collectSound = new Audio('collect.mp3');

document.addEventListener("DOMContentLoaded", loadPage);

function displayScore(message) {
    if (message !== "") {
        status_display.innerHTML = `${message}<br>Your Score is: ${score}<br>Time Remaining: ${time_remaining}s`;
    } else {
        status_display.innerHTML = `Your Score is: ${score}<br>Time Remaining: ${time_remaining}s`;
    }
}

function gameOver() {
    if (is_game_running) {
        for (let boundary of boundaries) {
            boundary.style.backgroundColor = "rgb(243, 159, 159)";
        }
        loseSound.play();
        if (score > 0) score -= 1;
        displayScore("Game Over!");
        is_game_running = false;
        clearInterval(timer_interval);
    }
}

function startGame() {
    displayScore("");
    is_game_running = true;
    time_remaining = 30;
    for (let boundary of boundaries) {
        boundary.style.backgroundColor = "#eeeeee";
    }
    for (let item of items) {
        item.style.visibility = "visible"; // Reset items visibility
    }
    startTimer();
}

function endGame() {
    if (is_game_running) {
        for (let boundary of boundaries) {
            boundary.style.backgroundColor = "rgb(113, 225, 141)";
        }
        score += 5;
        winSound.play();
        displayScore("You Won!");
        is_game_running = false;
        clearInterval(timer_interval);
    }
}

function collectItem(event) {
    if (is_game_running) {
        collectSound.play();
        score += 2;
        event.target.style.visibility = "hidden"; // Hide collected item
        displayScore("");
    }
}

function startTimer() {
    displayScore("");
    timer_interval = setInterval(() => {
        if (time_remaining > 0) {
            time_remaining--;
            displayScore("");
        } else {
            gameOver();
        }
    }, 1000);
}

function resetGame() {
    score = 0;
    time_remaining = 30;
    displayScore("Maze reset! Click 'S' to start.");
    for (let boundary of boundaries) {
        boundary.style.backgroundColor = "#eeeeee";
    }
    for (let item of items) {
        item.style.visibility = "visible"; // Reset items visibility
    }
    is_game_running = false;
    clearInterval(timer_interval);
}

function loadPage() {
    end = document.getElementById("end");
    start = document.getElementById("start");
    boundaries = document.getElementsByClassName("boundary");
    status_display = document.getElementById("status");
    reset_button = document.getElementById("reset");
    items = document.getElementsByClassName("item");

    end.addEventListener("mouseover", endGame);
    start.addEventListener("click", startGame);
    reset_button.addEventListener("click", resetGame);

    for (let boundary of boundaries) {
        boundary.addEventListener("mouseover", gameOver);
    }

    for (let item of items) {
        item.addEventListener("mouseover", collectItem);
    }
}



