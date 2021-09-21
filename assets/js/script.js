function log(say){
  console.log(say)
}

let startBtn = document.querySelector("#start");
let timeLeft = 4;
let questionNumber = 0;
let timerEl = document.querySelector('#timer');
let questionEl = document.querySelector('#question');
let answersEl = document.querySelector('#answersBox');
let contentEl = document.querySelector('#contentBox');


function setTime(){
  var timerInterval = setInterval( function () {
    timeLeft--;
    timerEl.innerHTML = timeLeft;

    if(timeLeft === 0){
      clearInterval(timerInterval);
      //clear contentBox and populate with result?
    }
  }, 1000)
}

function askQuestion(){

  questionEl.innerHTML = questAndAns[questionNumber].question;
  let numbAns = questAndAns[questionNumber].answer;
  for(let i=0; i<numbAns.length; i++){
    let newEl = document.createElement("p");
    newEl.innerHTML = numbAns[i];
    answersEl.appendChild(newEl);
  }
//they answer
//tally if right
//increment question number
//if last question end and show end view
//if not run pose question again 
}



function beginQuiz(){
  setTime();
  askQuestion();
  //when timer ends
}

startBtn.addEventListener('click', beginQuiz)

/*GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score 
separate page for high scores

*/



