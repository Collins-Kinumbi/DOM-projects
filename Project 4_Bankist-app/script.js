"use strict";

///////////////////////////////////////
// Modal window

//Variables
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const navLink = document.querySelectorAll(".nav__link");
const navLinks = document.querySelector(".nav__links");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const allSections = document.querySelectorAll(".section");
const imgTragets = document.querySelectorAll("img[data-src]");
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const sliderBtnLeft = document.querySelector(".slider__btn--left");
const sliderBtnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

//Smooth scrolling implimentation
btnScrollTo.addEventListener("click", () => {
  section1.scrollIntoView({ behavior: "smooth" });
});

//Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

btnsOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/////////////////////////////////////////////////////
//Page navigation

//Without event deligation
/*
navLink.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    // alert("click");
    const id = this.getAttribute("href");
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});
*/

//With event deligation
navLinks.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(e.target.getAttribute("class"));

  if (e.target.classList.contains("nav__link")) {
    // console.log("success");
    const id = e.target.getAttribute("href");
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/////////////////////////////////////////////////////////
// Tabbed component
tabsContainer.addEventListener("click", (e) => {
  // console.log(e.target);
  // console.log(e.target.closest(".operations__tab"));//perfect
  const clicked = e.target.closest(".operations__tab");

  //Guard clause
  if (!clicked) return; //basically, if falsy....return

  //active tab
  tabs.forEach((tab) => {
    tab.classList.remove("operations__tab--active");
    clicked.classList.add("operations__tab--active");
  });

  //active content area
  tabsContent.forEach((content) => {
    content.classList.remove("operations__content--active");
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  });
});

/////////////////////////////////////////////////////////////////
//Menu fade animation

//Methode 1
/*
const hoverEffect = (e, opacity) => {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    // console.log("NAV LINK", link);

    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    // console.log("SIBLINGS", siblings);

    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((sibling) => {
      if (sibling !== link) {
        sibling.style.opacity = opacity;
      }
      logo.style.opacity = opacity;
    });
  }
};


nav.addEventListener("mouseover", (e) => {
  hoverEffect(e, 0.5);
});

nav.addEventListener("mouseout", (e) => {
  hoverEffect(e, 1);
});
*/

//Methode 2
const hoverEffect = function (e) {
  // console.log(this);
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    // console.log("NAV LINK", link);

    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    // console.log("SIBLINGS", siblings);

    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((sibling) => {
      if (sibling !== link) {
        sibling.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

nav.addEventListener("mouseover", hoverEffect.bind(0.5));
nav.addEventListener("mouseout", hoverEffect.bind(1));

////////////////////////////////////////////////////////////////
//Sticky navigation

//Methode 1 using scroll
/*
const initialCoordinates = section1.getBoundingClientRect();
window.addEventListener("scroll", () => {
  // console.log(window.scrollY);

  if (window.scrollY > initialCoordinates.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});
*/

//Methode 2 using Intersection Observer API
/*
//Learning purpose
const observerCallback = (entries, observer) => {
  entries.forEach((entery) => {
    console.log(entery);
  });
};

const observerOpt = {
  root: null,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(observerCallback, observerOpt);

observer.observe(section1);
*/

const navHeight = nav.getBoundingClientRect();

const stickyNav = (entries) => {
  const [entry] = entries;
  // console.log(entry);

  // if (!entry.isIntersecting) {
  //   nav.classList.add("sticky");
  // } else {
  //   nav.classList.remove("sticky");
  // }

  !entry.isIntersecting
    ? nav.classList.add("sticky")
    : nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight["height"]}px`,
});
headerObserver.observe(header);

///////////////////////////////////////////////////////////////
//Reveal section

const revealSection = (entries, observer) => {
  const [entry] = entries;
  // console.log(entry);

  //Guard clause
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target); //halts observation
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

//////////////////////////////////////////////////////////////
//lazy loading images

const loadImg = (entries, observer) => {
  const [entry] = entries;
  // console.log(entry);

  //Guard clause
  if (!entry.isIntersecting) return;

  //replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target); //halts observation
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTragets.forEach((img) => {
  imgObserver.observe(img);
});

////////////////////////////////////////////////////////////////
//Slider
const sliders = () => {
  let currentSlide = 0;
  const maxSlide = slides.length;

  const createDots = () => {
    slides.forEach((_, index) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class='dots__dot' data-slide='${index}'></button>`
      );
    });
  };

  const activateDot = (slide) => {
    document.querySelectorAll(".dots__dot").forEach((dot) => {
      dot.classList.remove("dots__dot--active");
    });
    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add("dots__dot--active");
  };

  // slider.style.transform = "scale(0.4) translateX(-800px)";
  // slider.style.overflow = "visible";

  const goToSlide = (curSlide) => {
    slides.forEach((slide, index) => {
      //-100, 0, 100
      slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
    });
  };

  const nextSlide = () => {
    /*
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    */
    currentSlide === maxSlide - 1 ? (currentSlide = 0) : currentSlide++;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  //initials of the functions above
  const init = () => {
    createDots();
    activateDot(0);
    goToSlide(0);
  };
  init();

  //next slide
  sliderBtnRight.addEventListener("click", nextSlide);

  //previous slide
  const prevSlide = () => {
    /*
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    */
    currentSlide === 0 ? (currentSlide = maxSlide - 1) : currentSlide--;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  sliderBtnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", (e) => {
    // console.log(e);
    e.key === "ArrowRight" && nextSlide();
    e.key === "ArrowLeft" && prevSlide();
  });

  //dot click functionality
  dotContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("dots__dot")) {
      // console.log("DOT");
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
sliders();

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
/*
//Selecting elements
// console.log(document.documentElement);
const allSections = document.querySelectorAll(".section");
const allBtns = document.getElementsByTagName("button");
// console.log(allSections);
// console.log(allBtns);
// console.log(document.getElementsByClassName("btn"));

// Creating and inserting elements
//.insertAdjacentHTML

const cookieMsg = document.createElement("div");
cookieMsg.classList.add("cookie-message");
//cookieMsg.textContent = "We use cookied for improved funtionality and analytics";
cookieMsg.innerHTML =
  '<p class= "gray" >We use cookied for improved funtionality and analytics.</p> <button class ="btn btn--close-cookie">Got it</button>';

const header = document.querySelector(".header");
// header.prepend(cookieMsg); //first child of the header
header.append(cookieMsg); //last child of the header
// header.append(cookieMsg.cloneNode(true));//

//delete elements
const closeCookie = document.querySelector(".btn--close-cookie");
closeCookie.addEventListener("click", () => {
  // cookieMsg.parentElement.removeChild(cookieMsg);
  cookieMsg.remove();
});

//Styles
cookieMsg.style.backgroundColor = "#37383d";
cookieMsg.style.width = "102.7%";
// console.log(cookieMsg.style.backgroundColor); //rgb(55, 56, 61)
// console.log(getComputedStyle(cookieMsg).color); //rgb(68, 68, 68) generated from the style sheet or default colour
// console.log(getComputedStyle(cookieMsg).height); //69px

cookieMsg.style.height =
  Number.parseFloat(getComputedStyle(cookieMsg).height, 10) + 30 + "px";
// console.log(getComputedStyle(cookieMsg).height); //83.4792px

//changing propeties in css custom properties / css variables
document.documentElement.style.setProperty("--color-primary", "gray");

//Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt); //Bankist logo
console.log(logo.src); //http://127.0.0.1:5500/practice%20arena/Advanced%20DOM%20manupilation/img/logo.png - absolute version
console.log(logo.getAttribute("src")); //img/logo.png - relative version
logo.alt = "Cool looking logo";
console.log(logo.alt); //Cool looking logo

//Data attributes
console.log(logo.dataset.versionNumber); //3.0
*/

////////////////////////////////////////////////////////////
/*
//Smooth scrolling implimentation
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", () => {
  section1.scrollIntoView({ behavior: "smooth" });
});
*/

/////////////////////////////////////////////
/*
//types of events and event handlers
const h1 = document.querySelector("h1");

//1
// h1.onmouseenter = () => {
//   console.log("onmouseenter: I see you reading XD");
// };

//2
// h1.addEventListener("mouseenter", () => {
//   alert("addEventListener: I see you reading XD");
// });

//3
const alertH1 = () => {
  alert("addEventListener: I see you reading XD");
  //h1.removeEventListener("mouseenter", alertH1);
};

h1.addEventListener("mouseenter", alertH1);

setTimeout(() => {
  h1.removeEventListener("mouseenter", alertH1);
}, 3000); //removed after 3 sec
*/
///////////////////////////////////////////////
//Event propagation
/*
//rgb(255, 255, 255)
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomColor = () => {
  return `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(
    0,
    255
  )})`;
};
console.log(randomColor());

const navLink = document.querySelectorAll(".nav__link");

navLink.forEach((link) => {
  link.addEventListener("click", function (e) {
    // console.log("click");
    this.style.backgroundColor = randomColor();
    console.log("LINK", e.target, e.currentTarget);
    console.log(this === e.currentTarget); //true

    //stop propergation
    // e.stopPropagation();
  });
});

const navLink = document.querySelector(".nav__links");
navLink.addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("CONTAINER", e.target, e.currentTarget);
  console.log(this === e.currentTarget); //true
});

const nav = document.querySelector(".nav");
nav.addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("NAV", e.target, e.currentTarget);
  console.log(this === e.currentTarget); //true
});
*/

///////////////////////////////////////////////////////
/*
//DOM traversing
const h1 = document.querySelector("h1");

//going dowards: child
console.log(h1.querySelectorAll(".highlight")); //NodeList(2) [span.highlight, span.highlight]
console.log(h1.childNodes); //NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]

// h1.childNodes.forEach((child) => {
//   // console.log(child.tagName);
//   if (child.tagName === "SPAN") {
//     // console.log(child);
//     child.style.color = "#FFF";
//   }
// });

console.log(h1.children); //HTMLCollection(3) [span.highlight, br, span.highlight]
h1.firstElementChild.style.color = "#fff";
h1.lastElementChild.style.color = "blue";

// h1.style.color = "Yellow";

//Going downwards: parents
console.log(h1.parentNode); //<div class="header__title">…</div>
console.log(h1.parentElement); //<div class="header__title">…</div>

h1.closest(".header").style.background = "var(--gradient-secondary)";
h1.closest("h1").style.background = "var(--gradient-primary)";

//Going sideways: siblings
console.log(h1.previousElementSibling); //null
console.log(h1.nextElementSibling); //<h4>A simpler banking experience for a simpler life.</h4>;

console.log(h1.parentElement.children); //HTMLCollection(4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img]
[...h1.parentElement.children].forEach((child) => {
  if (child !== h1) {
    child.style.transform = "scale(0.5)";
  }
});
*/

// document.addEventListener("DOMContentLoaded", (e) => {
//   console.log("HTML parsed and DOM tree built", e);
// });
