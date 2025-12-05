'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);





// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});





// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}





// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}



// product click -> open showcase page
const productCards = document.querySelectorAll('.product-main .showcase');

for (let i = 0; i < productCards.length; i++) {

  const card = productCards[i];
  const bannerImg =
    card.querySelector('.showcase-banner img.product-img.default') ||
    card.querySelector('.showcase-banner img');
  const titleEl = card.querySelector('.showcase-title');
  const priceEl = card.querySelector('.price');

  if (!bannerImg || !titleEl || !priceEl) continue;

  const goToShowcase = function (event) {
    event.preventDefault();

    const img = bannerImg.getAttribute('src');
    const title = titleEl.textContent.trim();
    const price = priceEl.textContent.trim();

    const params = new URLSearchParams();

    if (img) params.set('img', img);
    if (title) params.set('title', title);
    if (price) params.set('price', price);

    window.location.href = 'showcase.html?' + params.toString();
  };

  bannerImg.addEventListener('click', goToShowcase);
  titleEl.addEventListener('click', goToShowcase);

}
function ChangeImage(img) {
    // main big image
    var mainImg = document.getElementById("main-showcase-img");
    // main title + price box in Deal of the day
    var mainShowcase = document.querySelector('.product-featured .showcase');
    var mainTitle = mainShowcase ? mainShowcase.querySelector('.showcase-title') : null;
    var mainPriceBox = mainShowcase ? mainShowcase.querySelector('.price-box') : null;
    var mainPrice = mainPriceBox ? mainPriceBox.querySelector('.price') : null;
    var mainOldPrice = mainPriceBox ? mainPriceBox.querySelector('del') : null;

    // clicked card (small product)
    var card = img.closest('.showcase');
    var cardTitle = card ? card.querySelector('.showcase-title') : null;
    var cardPriceBox = card ? card.querySelector('.price-box') : null;
    var cardPrice = cardPriceBox ? cardPriceBox.querySelector('.price') : null;
    var cardOldPrice = cardPriceBox ? cardPriceBox.querySelector('del') : null;

    // update image
    if (mainImg) {
      mainImg.src = img.src;
    }

    // update title
    if (mainTitle && cardTitle) {
      mainTitle.textContent = cardTitle.textContent;
    }

    // update price and old price
    if (mainPrice && cardPrice) {
      mainPrice.textContent = cardPrice.textContent;
    }
    if (mainOldPrice && cardOldPrice) {
      mainOldPrice.textContent = cardOldPrice.textContent;
    }
  }
