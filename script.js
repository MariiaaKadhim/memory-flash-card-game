const time = document.querySelector("#timer")
const scores = document.querySelectorAll("#score")
const cards = document.querySelectorAll(".cards")

const player1 = localStorage.getItem("player1")
console.log(`player 1 => ${player1}`)

const player2 = localStorage.getItem("player2")
console.log(`player 2 => ${player2}`)

const player1Name = document.getElementById("playerName1")
const player2Name = document.getElementById("playerName2")

let seconds = 0
let timer
let isGameActive = false
let endTimerMessage = "Time is Up."

// let score = 0
// let playersScore = [
//   { name: "player1", score: 0 },
//   { name: "player2", score: 0 },
// ]

// let currentPlayer = 1

let player1Score = 0
let player2Score = 0

let flippedCard = false
let firstCard, secondCard // to choose first then seconed card to see matching cards
let lockBoard = false // set to false so when the player click the seconed card it turnes to true

const displayMessage = (message) => {
  // Show message here. You can use an alert box for example.
  alert("Game Over")
}

const startTimer = () => {
  isGameActive = true
  timer = setInterval(() => {
    seconds++
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

const flipCardsListeners = () => {
  cards.forEach((card) => {
    card.addEventListener("click", flipCard)
  })
}

const matchLogic = (card) => {
  // Is this the first card?
  if (!firstCard) {
    firstCard = card
  } else {
    secondCard = card
    checkForMatch()
  }
}

const showNames = () => {
  // TODO Fix this
  player1Name.innerHTML = `${player1}`
  player2Name.innerHTML = `${player2}`
}

const flipCard = (event) => {
  console.log(event.target)
  if (isGameActive) {
    event.target.parentElement.classList.toggle("flip")
    matchLogic(event.target)
  }
}

const checkForMatch = () => {
  console.log(`framework 1 => ${firstCard.dataset.framework}`)
  console.log(`framework 2 => ${secondCard.dataset.framework}`)
  if (
    firstCard.parentElement.dataset.framework ===
    secondCard.parentElement.dataset.framework
  ) {
    console.log("match!")
    disableCards() // if there is matching

    switchPlayer()

    firstCard.style.visibility = "hidden"
    secondCard.style.visibility = "hidden"
  } else {
    unflipCards() // turns both back if there is no matching
    switchPlayer()
  }
}

const disableCards = () => {
  // add event listener to check for match
  firstCard.parentElement.removeEventListener("click", flipCard)
  secondCard.parentElement.removeEventListener("click", flipCard)
}

const unflipCards = () => {
  // turns both back if there is no matching cards
  setTimeout(() => {
    firstCard.parentElement.classList.remove("flip")
    secondCard.parentElement.classList.remove("flip")
  }, 1000)
}
// const playerTurn = () => {
let switchPlayer = (player, points) => {
  if (player === 1) {
    player1Score += points
  } else if (player === 2) {
    player2Score += points
  } else {
    console.log("Invalid player number")
  }
}

// to shuffle the cards every time the game start
let shuffleCards = (cards) => {
  for (let i = cards - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
  return cards
}

const startGame = () => {
  startTimer()
  showNames()
  flipCardsListeners()

  shuffleCards()
}

startGame()
