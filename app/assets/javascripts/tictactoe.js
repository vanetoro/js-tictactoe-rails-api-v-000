// Code your JavaScript / jQuery solution here
let turn = 0;
function player(turnCount){
  if(turnCount%2 === 0){
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

  setMessage()
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
