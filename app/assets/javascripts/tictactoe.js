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
        saveGame()
        return true
        }
      }
      if(checkBoard(gameBoard) === true){
        setMessage("Tie game.")
        saveGame()
        return true
      }
      // saveGame()
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
  if (updateState(tdElement)){
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
  gameBoard = Array.from(gameBoard)
  return gameBoard
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
  $('#save').on('click', () => saveGame())
  $('#previous').on('click', () => previousGames())
  $('#clear').on('click', () => clearBoard())
  $('#games').on('click', () => reloadGame())
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
        $('#games').append(`<li><button id="${game.data.id}">${game.data.id}</button></li>`)
    //     $('#games').append(`<li><button id="gameId-${game.data.id}">${game.data.id}</button></li>`)
    //     $(`#gameId-${game.data.id}`).on('click', () => reloadGame(game.data.id))
    })
  }
}



function previousGames(){
  if (!currentGame){
    saveGame()
  }
  $.get("/games", (array) => {
  if(array.data.length >= 1){
    document.getElementById('games').innerHTML = "<ul>"
    array.data.forEach( (element) => {
      $("#games").append(`<li><button id="${element.id}">${element.id}</button></li>`)
      // $("#games").append(`<li><button id="gameId-${element.id}">${element.id}</button></li>`)
      // $(`#gameId-${element.id}`).on('click', () => {debugger; reloadGame(element.id)})
    })
    document.getElementById('games').innerHTML += "</ul>"
  }
}
)
}

function reloadGame(){
  var id = parseInt(event.target.innerHTML)
  $.get('/games/' + id,function(game){
    let state = game.data.attributes.state
    let board = document.querySelectorAll('td')
    for(var i = 0; i < 9; i++){
      board[i].innerHTML = state[i]
      currentGame = id
    }
  })
}
