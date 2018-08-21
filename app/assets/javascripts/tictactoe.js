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
  for(var i =0; i<winCombos.length; i++){
    var combo = winCombos[i]
      if((gameBoard[combo[0]].innerHTML === gameBoard[combo[1]].innerHTML) && (gameBoard[combo[1]].innerHTML === gameBoard[combo[2]].innerHTML) && (gameBoard[combo[1]].innerHTML !== '') ){
        var player = gameBoard[combo[0]].innerHTML
        setMessage(`Player ${player} Won!`)
        return true
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
    if(checkWinner()){
      clearBoard()
    }
  }
}

function clearBoard(){
  gameBoard = getBoardArray()
  $("#message").text('')
  gameBoard.forEach(function(spot){
    spot.innerHTML = ''
  })
  currentGame = 0
  turn = 0
}

function getBoardArray() {
  var gameBoard = document.querySelectorAll('td');
  return gameBoard = Array.from(gameBoard)
}


$(document).ready(function() {
  attachListeners();
});

function attachListeners() {
	$('td').on('click', function() {
    if(!checkWinner()){
      doTurn(this)
    }
	})
  $('button#save').on('click', () => saveGame())
  $('button#previous').on('click', () => getPreviousGames())
  $('button#clear').on('click', () => clearBoard())
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
        $('#games').append(`<li><button id="gameId-${game.data.id}">${game.data.id}</button></li>`)
        $(`#gameId-${game.data.id}`).on('click', () => reloadGame(game.data.id))
    })
  }
}

function getPreviousGames() {
	$('button#previous').on('click',function() {
			$.get("/games", function(data) {
				previousGames(data)
			})
	})
	}

function previousGames(array){
  if(array.data.length >= 1){
    document.getElementById('games').innerHTML = "<ul>"
    array.data.forEach(function(element){
      createButton(element)
  })
    document.getElementById('games').innerHTML += "</ul>"
  }
}

function createButton(element){
  $("#games").append(`<li><button id="gameId-${element.id}">${element.id}</button></li>`)
  $(`#gameId-${element.id}`).on('click', () => reloadGame(element.id));
}

function reloadGame(id){
 $.get('games/' + id,function(game){
    let state = game.data.attributes.state
    let board = document.querySelectorAll('td')
    for(var i = 0; i < 9; i++){
      board[i] = state[i]
    }
  })
}
