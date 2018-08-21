// Code your JavaScript / jQuery solution here
var turn = 0;
var currentGame = 0;

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


player = () => turn%2===0 ? 'X' : "O"
// function player(){
//   if(turn%2 === 0){
// 		return 'X'
// 	} else{
//     return 'O'
//   }
// }

function updateState(tdElement){
  var move = player()
  if(tdElement.innerHTML === ''){
    tdElement.innerHTML = move
    return true
  }
  return false
}


function setMessage(string){
  $('#message').text(string)
}

function checkWinner(){
  gameBoard = getBoardArray()
  // let gameBoard = document.querySelectorAll('td');
  // gameBoard = Array.from(gameBoard)
    for(var i =0; i<winCombos.length; i++){
      var combo = winCombos[i]
        if((gameBoard[combo[0]].innerHTML === gameBoard[combo[1]].innerHTML) && (gameBoard[combo[1]].innerHTML === gameBoard[combo[2]].innerHTML) && (gameBoard[combo[1]].innerHTML !== '') ){
          var player = gameBoard[combo[0]].innerHTML
          setMessage(`Player ${player} Won!`)
          return true
        }else {
        }
      }
      if(checkBoard(gameBoard) === true){
        setMessage("Tie game.")
      }
      return false
}

function checkBoard(board){
  for(var i = 0; i<board.length; i++){
    if(board[i].innerHTML === ''){
        return false
      }
    }
    return true
}

function doTurn(tdElement){
  if (updateState(tdElement) === true){
    turn++
  }
  if(checkWinner() === true){
    turn = 0
    clearBoard()
  }
}

function clearBoard(){
  getBoardArray()
  // let gameBoard = document.querySelectorAll('td');
  // gameBoard = Array.from(gameBoard)
  gameBoard.forEach(function(spot){
    spot.innerHTML = ''
  })
  currentGame = 0
}

function previousGames(array){
  document.getElementById('games').innerHTML = "<ul>"
  array.data.forEach(function(element){
    $('#games').append(`<li> ${element.id} </li>`)
  })
  document.getElementById('games') += "</ul>"
}


function getPreviousGames() {
		$('button#previous').on('click',function() {
				$.get("/games", function(data) {
					previousGames(data)
				})
		})
	}

function getBoardArray() {
  var gameBoard = document.querySelectorAll('td');
  return gameBoard = Array.from(gameBoard)
}

function saveGame() {
  gameBoard = getBoardArray()
  var state = []
  gameBoard.forEach(function(board){
    state.push(board.innerHTML)
  })

  var gameData = { state: state };
  if (currentGame){
    $.ajax({
      type: 'PATCH',
      url: `/games/${currentGame}`,
      data: gameData
  })
    } else {
    $.post('/games', gameData, function(game){
        currentGame = game.data.id
    })
  }


  }


$(document).ready(function() {
  attachListeners();
});

function attachListeners() {
	$('td').on('click', function() {
	doTurn(this)
})
  $('#save').on('click', () => saveGame())
  $('#previous').on('click', () => getPreviousGames())
}
