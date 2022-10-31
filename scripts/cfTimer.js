const proTimer = document.querySelector("#proTimer")
const conTimer = document.querySelector("#conTimer")
const originalTime = parseInt(document.querySelector("body").className)
const startButton = document.querySelector("#switch")
let paused = true
let finished = 2
let remind_30 = new Audio("../audio/30s.mp3")
let endSound = new Audio('../audio/end.mp3')

const timerPrototype = {
    decrementTimer() {
        this.remainingTime--
        if (this.remainingTime === 0) {
            proNextTurn = !proNextTurn
            conNextTurn = !conNextTurn
            finished--
            this.hasRemainingTime = false
            playEndSound()
            this.stopTimer()
            if (this.otherTimer.remainingTime !== 0) {
                this.otherTimer.resumeTimer()
            }
        } else if (this.remainingTime < 0) {
            this.remainingTime = 0
        } else if (this.remainingTime === 30) {
            play30sSound()
        }
        this.timer.textContent = timeToString(this.remainingTime)
    },

    resumeTimer() {
        var t = this
        this.countdownHandle = setInterval(function () {t.decrementTimer()}, 1000)
    },

    stopTimer() {
        clearInterval(this.countdownHandle)
    },

    resetTimer() {
        this.stopTimer()
        this.remainingTime = this.originalTime
        this.hasRemainingTime = true
        this.timer.textContent = timeToString(this.originalTime)
    },
}

function decrement(myTimer) {
    myTimer.remainingTime--
    if (myTimer.remainingTime === 0) {
        playEndSound()
        myTimer.stopTimer()
    } else if (myTimer.remainingTime === 30) {
        play30sSound()
    }
    myTimer.timer.textContent = timeToString(myTimer.remainingTime)
}

function Timer (timerWrap, time, other) {
    this.timer = timerWrap
    this.originalTime = time
    this.remainingTime = time
    this.otherTimer = other
    this.hasRemainingTime = true
}

Object.assign(Timer.prototype, timerPrototype)
const proTimerObject = new Timer(proTimer, originalTime)
const conTimerObject = new Timer(conTimer, originalTime, proTimerObject)
proTimerObject.otherTimer = conTimerObject


let proNextTurn = true
let conNextTurn = false

function timeToString (t) {
    let seconds =  t % 60;
    let minutes = (t - seconds) / 60;
    return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
}

function handleButton() {
    if (paused) {
        startButton.textContent = "切换"
        paused = false
    }
    if (finished === 0) {
    } else if (proNextTurn && proTimerObject.hasRemainingTime) {
        proNextTurn = false
        conNextTurn = true
        conTimerObject.stopTimer()
        proTimerObject.resumeTimer();
    } else if (conNextTurn && conTimerObject.hasRemainingTime) {
        conNextTurn = false
        proNextTurn = true
        proTimerObject.stopTimer()
        conTimerObject.resumeTimer();
    }
}

function resetBoth() {
    proTimerObject.resetTimer()
    conTimerObject.resetTimer()
    proNextTurn = true
    conNextTurn = false
    finished = 2
}

function stopBoth() {
    proNextTurn = !proNextTurn
    conNextTurn = !conNextTurn
    startButton.textContent = "开始"
    paused = true
    proTimerObject.stopTimer()
    conTimerObject.stopTimer()
}

function playEndSound() {
    endSound.play()
}

function play30sSound() {
    remind_30.play()
}