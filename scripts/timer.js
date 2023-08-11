const timer = document.querySelector(".timer")

function requestFullScreen() {
    document.documentElement.requestFullscreen();
}

document.addEventListener(
    "keydown",
    (e) => {
        toggleFullScreen()
    },
    false,
);

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

let time = parseInt(document.querySelector("body").className)
let startButton = document.querySelector("#startButton")
let remind_30 = new Audio("../audio/30s.mp3")
let endSound = new Audio('../audio/end.mp3')

const originalTime = time
let isRunning = false

function timeToString (t) {
    let seconds =  t % 60;
    let minutes = (t - seconds) / 60;
    return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
}

function decrementTimer() {
    time--
    if (time === 0) {
        playEndSound()
        stopTimer()
    } else if (time === 30) {
        play30sSound()
    }
    timer.textContent = timeToString(time)
}

function handleButton() {
    document.documentElement.requestFullscreen()
    if (isRunning) {
        stopTimer()
    } else {
        resumeTimer()
    }
}

function stopTimer() {
    isRunning = false
    startButton.textContent="开始"
    clearInterval(countdownHandle)
}

function resumeTimer(){
    if (time > 0) {
        isRunning = true
        startButton.textContent="暂停"
        countdownHandle = setInterval(function () {decrementTimer()}, 1000)
    }
}

function resetTimer() {
    stopTimer()
    time = originalTime
    timer.textContent = timeToString(time)
}

function playEndSound() {
    endSound.play()
}

function play30sSound() {
    remind_30.play()
}