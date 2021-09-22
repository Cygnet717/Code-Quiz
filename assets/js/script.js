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
  oneAnsEl[i].addEventListener('click', checkAnswer)
}

function checkAnswer(event){

  let ans = event.target.textContent;
  if(questAndAns[questionNumber].correctAnswer === 'trick'){
    console.log('all are right');
    score+=1000;
    questionNumber++;
  } else if(questAndAns[questionNumber].correctAnswer === 'bad trick'){ //different last question
    console.log('all are wrong :P');
    timeLeft = 0
    endQuiz();
  } else if(ans === questAndAns[questionNumber].correctAnswer){
    score+=1000;
    questionNumber++;
  } else {
    console.log('wrong lost time')
    timeLeft-=5;
    questionNumber++;
  }

  askQuestion();
}

function endQuiz() {
  endEl.children[0].innerHTML = 'Times UP! Your score is ' + score 
  
  endEl.setAttribute('style', 'display: flex')
  //if score over 9000 add gif and exclamation!

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
  let numbAns = questAndAns[questionNumber].answerChoices;
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