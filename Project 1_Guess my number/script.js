"use strict";

const body = document.querySelector("body");
const message = document.querySelector(".message");
const guessInput = document.querySelector(".guess");
const checkBtn = document.querySelector(".check");
const number = document.querySelector(".number");
const score = document.querySelector(".score");
const highScore = document.querySelector(".highscore");
const reset = document.querySelector(".again");

//secret number
let secretNumber = Math.floor(Math.random() * 20) + 1; //1 to 20
// console.log(secretNumber);
// number.textContent = secretNumber;

checkBtn.addEventListener("click", () => {
  //converting guessInput to a number and assigning it to guess as a value
  //convering to a number for comparison
  const guess = Number(guessInput.value);

  //converting the score to a number to allow incrementing or decrementing
  //and assigning it to a varibale
  let scoreNumber = Number(score.textContent);

  //making sure it doesn't go over the limit and if there's an input
  if (guess === 0 || guess > 20) {
    // console.log("Please input enter a number between 1 and 20");
    message.textContent = "Please enter a number between 1 and 20";
    return; //acts as a break 😁
  }

  //comapring it to random number
  else if (guess === secretNumber) {
    //when player wins
    message.textContent = "You guessed correctly";

    //will display the secretNumber on the number
    number.textContent = secretNumber;

    //Change the body's bg color
    body.style.backgroundColor = "#60b347";

    //change number box width
    number.style.width = "30rem";

    //setting score to highscore if it's bigger highscore
    if (scoreNumber > Number(highScore.textContent)) {
      //the highscore becomes the score
      highScore.textContent = scoreNumber;
    }
  }

  //when guess is wrong
  else if (guess !== secretNumber) {
    //checks the score to ensure it's value is not equal to 0
    if (scoreNumber > 1) {
      guess > secretNumber
        ? (message.textContent = "Your guess us too high")
        : (message.textContent = "Your guess is too low");

      //decrementing the score number
      scoreNumber--;

      //updating the score text content on the page
      score.textContent = scoreNumber;
    } else {
      message.textContent = "YOU LOSE!";
      score.textContent = 0;
      return;
    }
  }
});

//resetting the page
reset.addEventListener("click", () => {
  //secret number
  secretNumber = Math.floor(Math.random() * 20) + 1; //1 to 20

  //score goes back to 20
  score.textContent = "20";

  //number regains it's original text and dimensions
  number.textContent = "?";
  number.style.width = "15rem";

  //input is reset to empty
  guessInput.value = "";

  //message is restored
  message.textContent = "Start guessing...";

  //bg to normal
  body.style.backgroundColor = "#222";
});
