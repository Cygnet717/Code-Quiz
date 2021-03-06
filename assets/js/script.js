//selectors
let startBtn = document.querySelector("#start");
let submitBtn = document.querySelector('#submit');
let timerEl = document.querySelector('#timer');
let alertEl = document.querySelector('.alertBox')
let questionEl = document.querySelector('#question');
let answersEl = document.querySelector('#answersBox');///
let contentEl = document.querySelector('#contentBox');
let startOverlayEl = document.querySelector('#startOverlay');
let endEl =  document.querySelector('#endQuiz');
let imgEl = document.querySelector('#image');
let nameEl = document.querySelector('#name');
let alertTimeleft = 1;

//global variables
let timeLeft = 90;
let questionNumber = 0;
let score = 0;
let scoresArray = [];

//check local storage for previous scores and give it to the global variable
if(localStorage.getItem('scores') !== null){
  scoresArray = JSON.parse(localStorage.getItem('scores'));
} 

function showTimeLossAlert() {
alertEl.setAttribute('style', 'animation: showAlert 1.3s;')

var alertTimerInterval = setInterval( function () {
  alertEl.setAttribute('style', 'animation: none;');
  alertTimeleft--;
  if(alertTimeleft <= 0){
    clearInterval(alertTimerInterval);
  }
}, 1000)
}

function checkAnswer(event){
  if(event.target.matches('p')){

    let userAns = event.target.textContent;
    let corrAns = questAndAns[questionNumber].correctAnswer

    if(userAns === corrAns || corrAns === 'trick'){// if answer is correct or the trick question give points and progress
      score+=1000;
      questionNumber++;
    } else { //wrong answer
      showTimeLossAlert();
      timeLeft-=5;
      questionNumber++;
    }

    if(questionNumber === questAndAns.length){//if its the last question, end game
      let endTime = timeLeft;
      endQuiz(endTime);
      timeLeft = 0;
      
    } else { //else keep going
      answersEl.innerHTML = '';
      askQuestion();
    }
  }
}

function collectScoreInfo(){
  let name = nameEl.value;

  contentEl.classList.remove('taller')

  scoresArray.push({userName: name, userScore: score})
  localStorage.setItem('scores', JSON.stringify(scoresArray))
  resetQuiz();
}

function resetQuiz() {
  //reset initial variables
  timeLeft = 90;
  timerEl.innerHTML = timeLeft;
  questionNumber = 0;
  score = 0;
  nameEl.textContent = '';
  questionEl.innerHTML = '20 sec to complete, lose time for wrong answers';
  answersEl.innerHTML = '';
  //hide the quiz end overlay
  endEl.setAttribute('style', 'display: none');
  //add to and display start quiz overlay
  
  document.querySelector('#submittedNote').textContent = 'Your score has been submitted';
  startOverlayEl.setAttribute('style', 'visibility: visible');
}

function endQuiz(time) {
  if(time > 0){
   score += time;
  };
  questionEl.setAttribute('style', 'visibility: hidden');
  answersEl.setAttribute('style', 'visibility: hidden'); 

  endEl.children[0].innerHTML = 'Times UP!<br> Your power level is ' + score.toLocaleString();


  if(score >= 9000){
    imgEl.setAttribute('src', imgEl.dataset.over);
  } else if (score >= 3000){
    imgEl.setAttribute('src', imgEl.dataset.goku);
  }

  contentEl.classList.add('taller')
  endEl.setAttribute('style', 'display: flex');
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
    let newEl = document.createElement('p');
    newEl.textContent= numbAns[i];
    answersEl.append(newEl);
  }
}

function beginQuiz(){
  setTime();
  askQuestion();
}

startBtn.addEventListener('click', beginQuiz);
answersEl.addEventListener('click', checkAnswer)
submitBtn.addEventListener('click', collectScoreInfo);


// [
//   {
//     thing: 'this',
//     other: 'that'
//   }
// ]