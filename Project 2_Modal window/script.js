"use strict";

const modalButtons = document.querySelectorAll(".show-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".close-modal");

// console.log(modalButtons);

const open = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

for (let i = 0; i < modalButtons.length; i++) {
  modalButtons[i].addEventListener("click", open);
  // console.log("click");
}

const close = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", close);

overlay.addEventListener("click", close);

document.addEventListener("keydown", (e) => {
  // console.log("key pressed", e);
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    close();
  }
});
