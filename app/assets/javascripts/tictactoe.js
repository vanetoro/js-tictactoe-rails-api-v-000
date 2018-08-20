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
  console.log(tdElement)
  $(`${tdElement}`).text(move)
  // $(`[data-x=${xCoord}][data-y=${yCoord}]`).text(move)
}


function setMessage(string){
  $('#message').text(string)
}

function checkWinner(){

  setMessage()
}

function doTurn(){
  turn += 1
  updateState()
  checkWinner()

}
