//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

//UI elements
const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;      
maxNum.textContent = max;      

game.addEventListener('mousedown',function(e){
  if (e.target.className == 'play-again'){
    window.location.reload();
  }
});

//Listen for guess
guessBtn.addEventListener('click',function(){
  let guess = parseInt(guessInput.value)
  
  //Validate
  if (isNaN(guess) || guess<min || guess>max){
    setMessage(`Please enter a number between ${min} and ${max}`,'red');
  }
  else{
      //Check if won
  if(guess === winningNum){

    gameOver(true,`You won, ${winningNum} is correct`);
    
  }
  else{
    //Wrong Nuber
    guessesLeft-=1;
    
    if (guessesLeft === 0){

      gameOver(false,`You lost, the correct number was ${winningNum}`)
      
    }
    else{
      //Game continues - answer wrong
      //Change border color
      guessInput.style.borderColor = 'red';
      //Clear Input
      guessInput.value ='';
      //Tell user that its wrong number
      setMessage(`${guess} is not correct, You have ${guessesLeft} guesses left`,'red') 
    }
  }
  }

});

function gameOver(won,msg){
  let color;
  //Set color based on winning or loosing
  won === true ? color='green' : color = 'red';

  //Disable input
  guessInput.disabled = true;
  //Change the border color
  guessInput.style.borderColor = color;
  //Set text color
  // message.style.color = color
  //set message
  setMessage(msg,color);
  
  //Play Again?
  guessBtn.value = 'Play Again';
  guessBtn.classList+='play-again';
}


function setMessage(msg,color){
  message.style.color = color;
  message.textContent = msg;
}

function getRandomNum(){
 return Math.floor(Math.random()*(max-min+1)+min);
}