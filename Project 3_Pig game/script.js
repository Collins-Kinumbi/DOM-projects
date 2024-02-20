"use strict";

//Declaring variables
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const newGameBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const currScore0EL = document.querySelector("#current--0");
const currScore1EL = document.querySelector("#current--1");

//Making initial states

let scores, currentScore, activePlayer, playing;

const reset = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");
  currScore0EL.textContent = 0;
  currScore1EL.textContent = 0;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
reset();

const switchPlayer = function () {
  //reset score to zero
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;

  //switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Roll Functionality
rollBtn.addEventListener("click", () => {
  if (playing) {
    //generate a random dice roll
    const diceRoll = Math.floor(Math.random() * 6) + 1; //1-6
    // console.log(diceRoll);

    //display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `images/dice-${diceRoll}.png`;

    //check or roll numeber. if 1, switch to player 2
    if (diceRoll !== 1) {
      //add dice to current score
      currentScore += diceRoll;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener("click", () => {
  if (playing) {
    //add current score to active player score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    diceEl.classList.add("hidden");
  }

  //check if score is >=100
  //score >= 100 Finish game
  if (scores[activePlayer] >= 100) {
    //finish game
    playing = false;

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
  } else {
    //!score >= 100 switch to next player
    switchPlayer();
  }
});

newGameBtn.addEventListener("click", reset);
