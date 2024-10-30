const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const difficultyList = document.querySelector("#difficulty-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const hitsEl = document.querySelector("#hits");
const accuracyEl = document.querySelector("#accuracy");
const hitsOver = document.querySelector("#hits-over");
const accuracyOver = document.querySelector("#accuracy-over");
const hearts = document.querySelectorAll(".heart");
const restartBtns = document.querySelectorAll(".restart");
const fullScreenBtn = document.querySelector("#fullscreen");
const minimizeBtn = document.querySelector("#minimize");

let time = 0,
    unlimited = false,
    difficulty = 0,
    playing = false,
    hits = 0,
    missed = 0,
    accuracy = 0,
    interval = 1;



startBtn.addEventListener("click", () => {
    screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
    if (e.target.classList.contains("time-btn")) {
        time = parseInt(e.target.getAttribute("data-time"));
        unlimited = e.target.getAttribute("data-unlimited") === "true";
        screens[1].classList.add("up");
    }
});

difficultyList.addEventListener("click", (e) => {
    if(e.target.classList.contains("difficulty-btn")) {
        difficulty = parseInt(e.target.getAttribute("data-difficulty"));
        screens[2].classList.add("up");
        startGame();
    }
});

function startGame() {
    playing = true;
    interval = setInterval(decreaseTime, 1000);
    createRandomCircle();

    board.addEventListener("click", handleBoardClick);
}

function handleBoardClick(e) {
    if (!playing) return;
    if (e.target.classList.contains("circle")) {
        hits++;
        e.target.remove();
        createRandomCircle();
    } else {
        missed++;
    }

    hitsEl.innerHTML = hits;
    calculateAccuracy();
}

function finishGame() {
    playing = false;
    clearInterval(interval);
    board.innerHTML = "";
    screens[3].classList.add("up");
    hitsEl.innerHTML = 0;
    timeEl.innerHTML = "00:00";
    accuracy.innerHTML = "0%";

    hitsOver.innerHTML = hits;
    accuracyOver.innerHTML = `${accuracy}%`;
    board.removeEventListener("click", handleBoardClick);
}


function decreaseTime() {
    if (unlimited) {
        setTime("∞");
        return;
    }
    time--;
    if (time < 0) {
        finishGame();
    }
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    setTime(`${minutes}:${seconds}`);
}


function setTime(time) {
    timeEl.innerHTML = time;
}

function createRandomCircle() {
    if(!playing) {
        return;
    }

    const circle = document.createElement("div");
    const size = getRandomNumber(30, 100);
    const colors = ["#03DAC6", "#FF0266", "#b3ff00", "#ccff00", "#9D00FF"];
    const {width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0,height - size);
    circle.classList.add("circle");
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    let color = Math.floor(Math.random() * 5);
    circle.style.background = `${colors[color]}`;
    board.append(circle);

    if (difficulty === 1) {
        circle.style.animationDuration = "2s";
    } else if (difficulty === 2) {
        circle.style.animationDuration = "1s";
    } else {
        circle.style.animationDuration = "3s";
    }

    circle.addEventListener("animationend", () => {
        circle.remove();
        createRandomCircle();

        addMissed();
    });


}

function addMissed() {
    if (
        hearts[0].classList.contains("dead") &&
        hearts[1].classList.contains("dead") &&
        hearts[2].classList.contains("dead") 
    ) {
        finishGame();
    } else {
        missed++;
        for (let i = 0; i < hearts.length; i++) {
            if (!hearts[i].classList.contains("dead")) {
                hearts[i].classList.add("dead");
                break;
            }
        }
    }
}

function calculateAccuracy() {
    accuracy = (hits / (hits + missed)) * 100;
    accuracy = accuracy.toFixed(2);
    accuracyEl.innerHTML = `${accuracy}%`;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

restartBtns.forEach((btn) => {
    btn.addEventListener("click", restartGame)
});

function restartGame() {
    finishGame();
    screens[1].classList.remove("up");
    screens[2].classList.remove("up");
    screens[3].classList.remove("up");
    time = 0;
    difficulty = 0;
    hits = 0;
    missed = 0;
    accuracy = 0;
    playing = false;
    unlimited = false;
    hearts.forEach((heart) => {
        heart.classList.remove("dead");
    });
}

fullScreenBtn.addEventListener("click", fullScreen);

let elem = document.documentElement;

function fullScreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    }else if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen();
    }else if (elem.msRequestFullScreen) {
        elem.msRequestFullScreen();
    }

    fullScreenBtn.style.display = "none";
    minimizeBtn.style.display = "block";
}

minimizeBtn.addEventListener("click", minimize);

function minimize() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if ( document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if ( document.webkitExitFullScreen) {
        document.webkitExitFullScreen();
    } else if ( document.msExitFullScreen) {
        document.msExitFullScreen();
    }

    fullScreenBtn.style.display = "none";
    minimizeBtn.style.display = "block";
}