let startBtn = document.querySelector("#start");
let submitBtn = document.querySelector('#submit');
let timeLeft = 20;
let questionNumber = 0;
let score = 0;
let timerEl = document.querySelector('#timer');
let questionEl = document.querySelector('#question');
let answersEl = document.querySelector('#answersBox');
let oneAnsEl = document.querySelector('#answersBox').children;
let contentEl = document.querySelector('#contentBox');
let endEl =  document.querySelector('#endQuiz');
let nameEl = document.querySelector('#name');
let scoresArray = [];


if(localStorage.getItem('scores') == null){
  localStorage.setItem('scores', JSON.stringify(scoresArray))
}

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

function collectScoreInfo(){
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

}

function endQuiz() {
  endEl.children[0].innerHTML = 'Times UP! Your score is ' + score ;
  endEl.setAttribute('style', 'display: flex');
  //if score under 1500 add img of yamcha
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

function askQuestion(){
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
  //when timer ends
}

startBtn.addEventListener('click', beginQuiz);
submitBtn.addEventListener('click', collectScoreInfo);