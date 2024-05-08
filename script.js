const time = document.querySelector("#timer")
const score1 = document.querySelector("#score1")
const score2 = document.querySelector("#score2")
const cards = document.querySelectorAll(".cards")

let imgElements = document.getElementsByClassName("cards")
let imgElementsArray = [...imgElements] // for shuffling

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

let score = 0
let player1Score = 0
let player2Score = 0
let playerTurn = 1

let totalFlips = 0

let flippedCard = false
let firstCard, secondCard // to choose first then seconed card to see matching cards

const startTimer = () => {
  isGameActive = true
  timer = setInterval(() => {
    seconds++
    time.innerText = `${seconds} sec`
    checkTimer()
    winTime()
  }, 1000)
}

const checkTimer = () => {
  if (seconds === 60 || totalFlips === 16) {
    console.log("stopping timer")
    clearInterval(timer)
    gameEnds()
  }
}

const winTime = () => {
  if (seconds < 60) {
    console.log("stopping timer")
    isGameActive = true
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

const winAudio = () => {
  console.log("cong audio...")
  let winAudio = document.getElementById("winAudio")
  winAudio.play()
}

// flipping cards
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
  player1Name.innerHTML = `${player1} `
  player2Name.innerHTML = `${player2} `
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
    totalFlips += 2
    // hideCards()
    disableCards() // if there is matching
    updateScoreBoard()
    checkForWinner()
  } else {
    console.log("HERE I AM!")
    unflipCards() // turns both back if there is no matching
  }
  switchPlayer()
}

const checkForWinner = () => {
  console.log(totalFlips)
  let winner = ""
  // Check if all cards have been flipped
  if (totalFlips === 16) {
    console.log("all cards are flipped")
    // Who has the higher score
    if (player1Score > player2Score) {
      console.log("player 1 win")
      winner = player1
      winAudio()
      alert(`congragulation ${winner} is the winner `)
    } else if (player2Score > player1Score) {
      console.log("player 2 win")
      winner = player2
      winAudio()
      alert(`congragulation ${winner} is the winner `)
    } else {
      console.log("we have a tie")
      playAudio()
      alert(`it is a tie `)
    }
    // Stop timer

    checkTimer()
    // Announce winner
  }
}

const disableCards = () => {
  // add event listener to check for match
  firstCard.parentElement.removeEventListener("click", flipCard)
  secondCard.parentElement.removeEventListener("click", flipCard)
  firstCard = ""
  secondCard = ""
}

const unflipCards = () => {
  setTimeout(() => {
    firstCard.parentElement.classList.remove("flip")
    secondCard.parentElement.classList.remove("flip")
    firstCard = ""
    secondCard = ""
  }, 1000)
}

const switchPlayer = () => {
  if (playerTurn === 1) {
    playerTurn = 2
    player1Name.style.backgroundColor = "white"
    console.log("player2")
  } else {
    playerTurn = 1
    player2Name.style.backgroundColor = "white"
    console.log("player1")
  }
}

const updateScoreBoard = () => {
  if (playerTurn === 1) {
    player1Score += 5
    score1.innerHTML = player1Score
  } else {
    player2Score += 5
    score2.innerHTML = player2Score
  }
}

// to shuffle the cards every time the game start

// used forEach so it can execute a provided function once for each element in an array
function shuffle() {
  cards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 12)
    card.style.order = ramdomPos
    // Math.random generates a random floating-point number between 0 (inclusive) and 1 (exclusive)
    // Math.floor() function returns the largest integer less than or equal to a given number
  })
}

// The shuffle function iterates over each card element using forEach.

const startGame = () => {
  startTimer()
  showNames()
  flipCardsListeners()

  shuffle()
}
startGame()
