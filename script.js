const time = document.querySelector("#timer")
const scores = document.querySelector("#score")

// start & stop timer

let seconds = 0
let timer
let isGameActive = false

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
  }
}

const gameEnds = () => {
  isGameActive = false
  console.log("Game Over")
}

// game over text & audio
let gameOver = false
const detectCollisions = () => {
  // Check if two objects overlap
  if (seconds === 40) {
    gameOver = true
  }
}

// const gameOverScreen = () => {
//   document.getElementById("gameOverShow").style.display = "block"
// }

// gameOverScreen()
startTimer()

let myAudio = document.querySelector("#audio")
myAudio.play()

// flip the cards

const flipCards = document.querySelectorAll(".cards")

flipCards.forEach((cards) => {
  cards.addEventListener("click", () => {
    isGameActive && cards.classList.toggle("flip")
  })
})

// change players name

// add winning condition and player turns
