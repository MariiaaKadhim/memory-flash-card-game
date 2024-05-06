const getName = () => {
  let player1 = document.querySelector("#player1")
  let player1NameText = player1.value
  console.log(player1.value)
  localStorage.setItem("player1", player1NameText)
}
const start1Button = document.getElementById("startGame")

start1Button.addEventListener("click", getName)

const getName2 = () => {
  let player2 = document.querySelector("#player2")
  let player2NameText = player2.value
  console.log(player2.value)
  localStorage.setItem("player2", player2NameText)
}

const startButton = document.getElementById("startGame")

startButton.addEventListener("click", getName2)
