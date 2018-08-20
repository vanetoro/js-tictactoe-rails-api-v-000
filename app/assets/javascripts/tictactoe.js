// Code your JavaScript / jQuery solution here
var turn = 0;

var winCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
  ]



function player(){
  if(turn%2 === 0){
		return 'X'
	} else{
    return 'O'
  }
}

function updateState(tdElement){
  var move = player()
  tdElement.innerHTML = move
  // $(`[data-x=${xCoord}][data-y=${yCoord}]`).text(move)
}


function setMessage(string){
  $('#message').text(string)
}

function checkWinner(){
  let gameBoard = document.querySelectorAll('td');
  gameBoard = Array.from(gameBoard)
  winCombos.forEach(function(combo) {
    if(gameBoard[combo[0]].innerHTML === gameBoard[combo[1]].innerHTML && gameBoard[combo[1]].innerHTML && gameBoard[combo[2]].innerHTML && gameBoard[combo[1]].innerHTML !== '' ){
      var player = gameBoard[combo[0]].innerHTML
      setMessage(`Player ${player} Won!`)
      return true
    } else {
      return false
    }
  })

  
}

function doTurn(tdElement){
  turn += 1
  updateState(tdElement)
  checkWinner()
}

function previousGames(array){
  document.getElementById('games') = "<ul>"
  array.forEach(function(element){
    $('#games').append(`<li> ${element} </li>`)
  })
  document.getElementById('games') += "</ul>"
}
