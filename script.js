'use strict';

// Element selection

//nav bar elements
const navContainer = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');
const logo = document.getElementById('logo');

//modal
const btnOpenModal = document.querySelectorAll('.btn--show-modal');
const modalWindow = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');

// Operation tab changer
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const operationContent = document.querySelectorAll('.operations__content');

// lazy load by scrolling
const header = document.querySelector('.header');
const features = document.querySelector('.section--1');

// nav items hover effect
//my Way
const fader = function (e) {
  {
    e.preventDefault();
    const clicked = e.target;
    navLinks.forEach(i => {
      if (i !== clicked) i.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
navLinks.forEach(link => link.addEventListener('mouseenter', fader.bind(0.5)));
navLinks.forEach(link => link.addEventListener('mouseleave', fader.bind(1)));

//tutor way

//nav bar elements

// const fader = function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const clicked = e.target;
//     const links = clicked.closest('.nav').querySelectorAll('.nav__link');
//     const logo = clicked.closest('.nav').querySelector('img');
//     links.forEach(link => {
//       if (link !== clicked)
//       link.style.opacity = this;
//     });
//     logo.style.opacity = this;
//   }
// };

// navContainer.addEventListener('mouseover', fader.bind(0.5));
// navContainer.addEventListener('mouseout', fader.bind(1));

//MODAL

const openModal = function (e) {
  e.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) closeModal();
});

// button Learn-more - scrol to sec-1

const btnScrolToSec1 = document.querySelector('.btn--scroll-to');

const section1 = document.getElementById('section--1');

const headerSec = document.querySelector('.header');

btnScrolToSec1.addEventListener('click', function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

// page navigation from nav bar

navLinks.forEach(link => {
  if (!link.classList.contains('nav__link--btn')) {
    const id = link.getAttribute('href');
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    });
  }
});

// Operation tab changer

tabsContainer.addEventListener('click', function (e) {
  const cliked = e.target.closest('.operations__tab');

  if (!cliked) return;

  //remove active tab class
  tabs.forEach(tab => {
    if (tab !== cliked) tab.classList.remove('operations__tab--active');
  });

  //activate tab
  cliked.classList.add('operations__tab--active');

  //set active content and remove others' active class

  operationContent.forEach(tab => tab.classList.remove('operations__content--active'));

  document.querySelector(`.operations__content--${cliked.dataset.tab}`).classList.add('operations__content--active');
});

// My way

// tabsContainer.addEventListener('click', function (e) {
//   if (e.target.classList.contains('btn')) {
//     let cliked = e.target.getAttribute('data-tab');
//     tabs.forEach(tab => {
//       if (tab !== e.target) tab.classList.remove('operations__tab--active');
//       else tab.classList.add('operations__tab--active');
//     });

//     currentContent = document.querySelector(`.operations__content--${cliked}`);
//     currentContent.classList.add('operations__content--active');

//     operationContent.forEach(tab => {
//       if (tab !== currentContent) {
//         tab.classList.remove('operations__content--active');
//       }
//     });
//   }
// });

// Sticky Nav

const margin = navContainer.getBoundingClientRect().height;
const stickyNavbar = function (entries) {
  // console.log(entry);
  if (!entries[0].isIntersecting) navContainer.classList.add('sticky');
  else navContainer.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNavbar, { root: null, threshold: 0, rootMargin: `-${margin}px` });

headerObserver.observe(header);

// section reveal

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  else entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);

};

const sectionObserver = new IntersectionObserver(revealSection, { root: null, threshold: 0 });

allSections.forEach(sec => {
  sectionObserver.observe(sec);
  sec.classList.add('section--hidden');
});

//Lazy load images while scroll into images

const images = document.querySelectorAll('img[data-src]');

const lazyLoadImages = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  else entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
    // entry.target.src = entry.target.classList.dataset;
  });

  observer.unobserve(entry.target);
};

const imgOptions = { root: null, threshold: 0, rootMargin: '200px' };

const imageObserver = new IntersectionObserver(lazyLoadImages, imgOptions);

images.forEach(img => imageObserver.observe(img));

// Slider

const slider = function () {
  
  // element selection

  const slides = document.querySelectorAll('.slide');

  const btnNext = document.querySelector('.slider__btn--right');
  const btnPrevious = document.querySelector('.slider__btn--left');

  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const lastSlide = slides.length;

  // creating dots

  const creatDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
    });
  };

  // activate dot

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');

      document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    });
  };

  // go to slide

  const goToSlide = function (slide) {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
    activateDot(slide);
  };

  // initial state
  const init = function () {
    creatDots();
    goToSlide(0);
  };

  // Next slide

  const nextSlide = function () {
    if (curSlide === lastSlide - 1) {
      return;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  // previous slide

  const previousSlide = function () {
    if (curSlide === 0) {
      return;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  // Evenet handlers

  btnNext.addEventListener('click', nextSlide);
  btnPrevious.addEventListener('click', previousSlide);

  window.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && previousSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (!e.target.classList.contains('dots__dot')) return;
    else {
      let slide = e.target.getAttribute('data-slide');
      goToSlide(slide);
    }
  });

  init();
};

slider();
