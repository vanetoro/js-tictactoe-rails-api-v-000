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
  let gameBoard = document.querySelectorAll('td');
  gameBoard = Array.from(gameBoard)
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
    turn += 1
  }
  if(checkWinner() === true){
    turn = 0
    clearBoard()
  }
}

function clearBoard(){
  let gameBoard = document.querySelectorAll('td');
  gameBoard = Array.from(gameBoard)
  gameBoard.forEach(function(spot){
    spot.innerHTML = ''
  })
}

function previousGames(array){
  document.getElementById('games') = "<ul>"
  array.forEach(function(element){
    $('#games').append(`<li> ${element} </li>`)
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

function saveGame() {
  		 $('button#save').on('click', function() {
  		 	$.put("/games", function() {
  				alert('update game')
  		 })
  		})
  }


$(document).ready(function() {
  attachListeners();
});

function attachListeners() {
	$('td').on('click', function() {
	doTurn(this)
})
}
