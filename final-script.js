const newGuess = document.querySelector("#new-guess");
const message = document.querySelector("#message");
const lowHigh = document.querySelector("#low-high");
const checkButton = document.querySelector("#check");
const restartButton = document.querySelector("#restart");

let previousGuesses = [];
let theGuess;
window.onload = newRandom();
newGuess.focus();
newGuess.addEventListener("keyup", checkKey);
checkButton.addEventListener("click", checkGuess);
restartButton.addEventListener("click", restart)
let newValue;
let flag = 0; // game finished(flag=1)?

document.getElementById("restart").style.display = 'none'; //  restart hide


function newRandom() {
  theGuess = Math.floor(Math.random() * 100 + 1);
}

function checkKey(e) {
  if (e.code === "Enter" && flag !== 1) {
    checkGuess();
  }
}

function checkGuess() {

  newValue = parseInt(document.querySelector("#new-guess").value); // int part

  if ((previousGuesses.length == 9 && !isNaN(newValue)) || (newValue == theGuess)) {
    document.getElementById("restart").style.display = 'block';
    document.getElementById("check").style.display = 'none';
    flag = 1; // disable Enter
  }
  processGuess(newValue);
  newGuess.value = "";
}

function processGuess(newValue) {

  if (!isNaN(newValue)) { // is number?
    previousGuesses.push(newValue);
    lowHigh.innerHTML = "Προηγούμενες προσπάθειες: " + previousGuesses.join(" ");
    message.innerHTML = '';
  } else {
    message.innerHTML = 'Δώσε αριθμό!';
    message.style.backgroundColor = "var(--msg-wrong-color)";
  }

  if (newValue == theGuess) { //   WIN
    document.querySelector('.instructions-img').setAttribute("src", "images/success.png");
    var audio = new Audio("audio/win.mp3"); // sound
    audio.play();
    message.innerHTML = 'Μπράβο το βρήκες!';
    message.style.backgroundColor = "var(--msg-win-color)";
    restartButton.focus();
  } else if (previousGuesses.length == 10) { //       LOSE
    document.querySelector('.instructions-img').setAttribute("src", "images/fail.png");
    var audio = new Audio("audio/fail.mp3");  // sound
    audio.play();
    message.innerHTML = 'Τέλος παιχνιδιού, έχασες!';
    message.style.backgroundColor = "var(--msg-wrong-color)";
    restartButton.focus();
  } else if (newValue > theGuess) {
    message.innerHTML = 'Λάθος, το ξεπέρασες';
    message.style.backgroundColor = "var(--msg-wrong-color)";
  } else if (newValue < theGuess) {
    message.innerHTML = 'Λάθος, είσαι πιο χαμηλά';
    message.style.backgroundColor = "var(--msg-wrong-color)";
  }
}

function restart() {

  newGuess.value = "";
  message.innerHTML = "";
  lowHigh.innerHTML = "";
  previousGuesses = [];
  document.getElementById("restart").style.display = 'none';
  document.getElementById("check").style.display = 'inline-block';
  document.querySelector('.instructions-img').setAttribute("src", "images/confused.png")
  newRandom();
  flag = 0;
}
