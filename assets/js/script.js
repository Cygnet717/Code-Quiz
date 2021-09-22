let startBtn = document.querySelector("#start");
let timeLeft = 20;
let questionNumber = 0;
let score = 0;
let timerEl = document.querySelector('#timer');
let questionEl = document.querySelector('#question');
let answersEl = document.querySelector('#answersBox');
let oneAnsEl = answersEl.children;
let contentEl = document.querySelector('#contentBox');
let endEl =  document.querySelector('#endQuiz')

for(let i=0; i < oneAnsEl.length; i++){
  oneAnsEl[i].addEventListener('click', function (eventTarget){
    checkAnswer(eventTarget.path[0].innerHTML)
  })
}

function checkAnswer(ans){
  if(questionNumber === 4 || questionNumber === 8){
    console.log('all are right');
    score++;
    questionNumber++;
  } else if(questionNumber === 9){
    console.log('all are wrong :P');
    timeLeft = 0
    endQuiz();
  } else if(ans === correctAns[questionNumber]){
    score++;
    questionNumber++;
  } else {
    console.log('wrong lost time')
    timeLeft-=5;
    questionNumber++;
  }

  askQuestion();
}

function endQuiz() {
  endEl.innerHTML = 'Times UP! You got ' + score + ' right!'
  endEl.setAttribute('style', 'display: flex')
  
}


function setTime(){
  var timerInterval = setInterval( function () {
    timeLeft--;
    timerEl.innerHTML = timeLeft;

    if(timeLeft <= 0){
      clearInterval(timerInterval);
      timerEl.innerHTML = 0;
      endQuiz();
    }
  }, 1000)
}

function chosenAnswer(e){
  console.log(e)
}

function askQuestion(){

  questionEl.innerHTML = questAndAns[questionNumber].question;
  let numbAns = questAndAns[questionNumber].answer;
  for(let i=0; i<numbAns.length; i++){
    answersEl.children[i].innerHTML= numbAns[i];
  
  }
}



function beginQuiz(){
  setTime();
  askQuestion();
  //when timer ends
}

startBtn.addEventListener('click', beginQuiz);




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



