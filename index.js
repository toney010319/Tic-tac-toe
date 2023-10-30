const cells = document.querySelectorAll('.box')
const select = document.getElementById('selectcontainer')
const body = document.getElementsByTagName('body')
const buttonX = document.getElementById('X')
const buttonO = document.getElementById('O')
let mainContainer = document.getElementById('main-container')
mainContainer.style.display = "none"
let playerTurn = document.getElementById("playerTurn")
const back = document.getElementById('back')

let isPlayer = true;
let player1 = ""
let player2 = ""
let history = []
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
]
let turn = 0;

buttonX.onclick = () => {
  player1 = buttonX.name
  player2 = buttonO.name

  mainContainer.style.display = "block"
  select.style.display = "none"
  playerTurn.innerText = "Player Turn: " + player1

}

buttonO.onclick = () => {
  player1 = buttonX.name
  player2 = buttonO.name
  isPlayer = false;
  mainContainer.style.display = "block"
  select.style.display = "none"
  playerTurn.innerText = "Player Turn: " + player2
}

function count() {
  turn += 1
  if (turn === 9) {
    playerTurn.innerText = "Draw"

  }

}

function clickHandler(event) {
  const currentBtn = event.target
  if (isPlayer) {
    currentBtn.value = player1
    history.push({
      player: player1,
      position: currentBtn.name
    })

    pos = currentBtn.name.split(",").map(str => {
      return Number(str);
    });
    board[pos[0]][pos[1]] = player1
    playerTurn.innerText = "Player Turn:" + player2
    isPlayer = false

  }
  else {
    currentBtn.value = player2
    history.push({
      player: player2,
      position: currentBtn.name
    })

    pos = currentBtn.name.split(",").map(str => {
      return Number(str);
    });
    board[pos[0]][pos[1]] = player2
    playerTurn.innerText = "Player Turn:" + player1
    isPlayer = true

  }
  currentBtn.disabled = true
  checkwins()
  count()
}

cells.forEach(button => {

  button.onclick = clickHandler

})

restart.addEventListener('click', () => {
  cells.forEach(reset => {
    reset.disabled = false
    reset.value = ""
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]
    turn = 0;
  })
})

function checkwins() {
  //check rows
  for (let row = 0; row < 3; row++) {
    if (board[row][0] === player1 && board[row][1] === player1 && board[row][2] === player1) {
      playerTurn.innerText = "Player: " + player1 + " Win"
      turn = 0
      cells.forEach(reset => {
        reset.disabled = true
      })
    }
    if (board[row][0] === player2 && board[row][1] === player2 && board[row][2] === player2) {
      playerTurn.innerText = "Player: " + player2 + " Win"
      turn = 0
      cells.forEach(reset => {
        reset.disabled = true
      })
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (board[0][col] === player1 && board[1][col] === player1 && board[2][col] === player1) {
      playerTurn.innerText = "Player: " + player1 + " Win"
      turn = 0
      cells.forEach(reset => {
        reset.disabled = true
      })
    }
    if (board[0][col] === player2 && board[1][col] === player2 && board[2][col] === player2) {
      playerTurn.innerText = "Player: " + player2 + " Win"
      turn = 0
      cells.forEach(reset => {
        reset.disabled = true
      })

    }
  }

  // Check diagonals
  if (
    (board[0][0] === player1 && board[1][1] === player1 && board[2][2] === player1) ||
    (board[0][2] === player1 && board[1][1] === player1 && board[2][0] === player1)
  ) {
    playerTurn.innerText = "Player: " + player1 + " Win"
    turn = 0
    cells.forEach(reset => {
      reset.disabled = true
    })
  }

  if (
    (board[0][0] === player2 && board[1][1] === player2 && board[2][2] === player2) ||
    (board[0][2] === player2 && board[1][1] === player2 && board[2][0] === player2)
  ) {
    playerTurn.innerText = "Player: " + player2 + " Win"
    turn = 0
    cells.forEach(reset => {
      reset.disabled = true
    })
  }

}

// back.addEventListener('click', () => {
//   history.pop()
//   board.pop()
//  clickHandler(event)
// })
 