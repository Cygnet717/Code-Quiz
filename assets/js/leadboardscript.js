let scoresArray = JSON.parse(localStorage.getItem('scores'));

let tableEl = document.querySelector('#scoreBoard');

for(let i=0; i<scoresArray.length; i++){
  let newLine = document.createElement('tr');
  let newNameData = document.createElement('td');
  let newScoreData = document.createElement('td');

  newNameData.textContent = scoresArray[i].userName;
  newScoreData.textContent = scoresArray[i].userScore;

  newLine.appendChild(newNameData);
  newLine.appendChild(newScoreData);

  tableEl.appendChild(newLine)
}