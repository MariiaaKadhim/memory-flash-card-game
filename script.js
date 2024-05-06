const time = document.querySelector("#timer")
const scores = document.querySelector("#score")

// start & stop timer

let seconds = 0
let timer
let isGameActive = false
let endTimerMessage = "Time is Up."

const displayMessage = (message) => {
  // Show message here. You can use an alert box for example.
  alert("Game Over")
}

const startTimer = () => {
  isGameActive = true
  timer = setInterval(() => {
    seconds++
    console.log(seconds)
    time.innerText = `${seconds} sec`
    checkTimer()
  }, 1000)
}

const checkTimer = () => {
  if (seconds === 40) {
    console.log("stopping timer")
    clearInterval(timer)
    gameEnds()
    displayMessage(endTimerMessage)
  }
}

const gameEnds = () => {
  isGameActive = false
  console.log("Game Over")
}

startTimer()

// game over text & audio (cheak later)

const playAudio = () => {
  console.log("Playing audio...")
  let myAudio = document.getElementById("myAudio")
  myAudio.play()
}

///fil cards
const flipCards = document.querySelectorAll(".cards")

flipCards.forEach((cards) => {
  cards.addEventListener("click", () => {
    isGameActive && cards.classList.toggle("flip")
  })
})

// change players name
document.getElementById("score").textContent = `${player1}`

// add winning condition and player turns
