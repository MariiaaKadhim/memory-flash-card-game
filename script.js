const time = document.querySelector("#timer")
const scores = document.querySelector("#score")

const player1 = localStorage.getItem("player1")
console.log(`player 1 => ${player1}`)

const player2 = localStorage.getItem("player2")
console.log(`player 2 => ${player2}`)

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

/// change name

// const showNames = () => {
//   document.getElementById("playerName1").innerHTML = "newText"
//   document.getElementById("playerName2").innerHTML = "newText"
// }

const startGame = () => {
  startTimer()
  // showNames()
}

startGame()

// add winning condition and player turns
