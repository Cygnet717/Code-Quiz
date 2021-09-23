let startBtn = document.querySelector("#start");
let submitBtn = document.querySelector('#submit');
let timeLeft = 5;
let questionNumber = 0;
let score = 0;
let timerEl = document.querySelector('#timer');
let questionEl = document.querySelector('#question');
let answersEl = document.querySelector('#answersBox');
let oneAnsEl = document.querySelector('#answersBox').children;
let contentEl = document.querySelector('#contentBox');
let startOverlayEl = document.querySelector('#startOverlay');
let endEl =  document.querySelector('#endQuiz');
let imgEl = document.querySelector('#image');
let nameEl = document.querySelector('#name');
let scoresArray = [];

/*if local storage get item scores !== null  then
socres array = local storage
makes it a global veriable
use the array

if it is nullscores array = new 
*/
if(localStorage.getItem('scores') == null){
  localStorage.setItem('scores', JSON.stringify(scoresArray))
}

for(let i=0; i < oneAnsEl.length; i++){
  oneAnsEl[i].addEventListener('click', checkAnswer) 
  /*div with buttons 
  each button its own id
  one event listner for box

  buttonsDiv.add event listner (click, function(e){
    if(e.target.matches("button")){
      if e.target.getAttribute('attributename') ===yes
    } })
    
    
    put event listner on answersEl
    
    this is event delegation*/

  
}

function checkAnswer(event){

  let ans = event.target.textContent;
  if(questAndAns[questionNumber].correctAnswer === 'trick'){
    score+=1000;
    questionNumber++;
  } else if(questAndAns[questionNumber].correctAnswer === 'bad trick'){ //different last question
    timeLeft = 0
    endQuiz();
  } else if(ans === questAndAns[questionNumber].correctAnswer){
    score+=1000;
    questionNumber++;
  } else {
    timeLeft-=5;
    questionNumber++;
  }

  askQuestion();
}

function collectScoreInfo(){//change these local storages to reference the global veriable
  let currentScoreData = JSON.parse(localStorage.getItem('scores'));
  let name = nameEl.value;

  currentScoreData.push({userName: name, userScore: score})
  localStorage.setItem('scores', JSON.stringify(currentScoreData))
  resetQuiz();
}

function resetQuiz() {
  timeLeft = 20;
  timerEl.innerHTML = timeLeft;
  questionNumber = 0;
  score = 0;
  nameEl.textContent = '';
  questionEl.innerHTML = '20 sec to complete, lose time for wrong answers';
  for(let i=0; i< 4; i++){
    oneAnsEl[i].innerHTML= '';
  };
  endEl.setAttribute('style', 'display: none');
  //startOverlayEl.setAttribute('style', 'visibility: visible');
  // questionEl.setAttribute('style', 'visibility: hidden');
  // answersEl.setAttribute('style', 'visibility: hidden'); 
}

function endQuiz() {
  questionEl.setAttribute('style', 'visibility: hidden');
  answersEl.setAttribute('style', 'visibility: hidden'); 

  endEl.children[0].innerHTML = 'Times UP!<br> Your power level is ' + score;
  if(score >= 9000){
    imgEl.setAttribute('src', imgEl.dataset.over)
  } else if (score >= 2000){
    imgEl.setAttribute('src', imgEl.dataset.goku)
  }
  endEl.setAttribute('style', 'display: flex');
/*save your powerlevel to the scouter!! */
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

function askQuestion(){
  startOverlayEl.setAttribute('style', 'visibility: hidden');
  questionEl.setAttribute('style', 'visibility: visible');
  answersEl.setAttribute('style', 'visibility: visible');

  let currentQuestion = questAndAns[questionNumber];
  questionEl.innerHTML = currentQuestion.question;

  let numbAns = currentQuestion.answerChoices;
  for(let i=0; i<numbAns.length; i++){
    oneAnsEl[i].innerHTML= numbAns[i];
  }
}

function beginQuiz(){
  setTime();
  askQuestion();
}

startBtn.addEventListener('click', beginQuiz);
submitBtn.addEventListener('click', collectScoreInfo);