'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
if (modal && modalCloseOverlay && modalCloseBtn) {
  modalCloseOverlay.addEventListener('click', modalCloseFunc);
  modalCloseBtn.addEventListener('click', modalCloseFunc);
}





// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
if (toastCloseBtn && notificationToast) {
  toastCloseBtn.addEventListener('click', function () {
    notificationToast.classList.add('closed');
  });
}





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



// product click -> open showcase page (any product card)
const productCards = Array.from(document.querySelectorAll('.showcase'))
  .filter(function(card){ return card.id !== 'showcase'; });

for (let i = 0; i < productCards.length; i++) {

  const card = productCards[i];
  const bannerImg =
    card.querySelector('.showcase-banner img.product-img.default') ||
    card.querySelector('.showcase-banner img') ||
    card.querySelector('.showcase-img-box img') ||
    card.querySelector('img.showcase-img');
  const titleEl = card.querySelector('.showcase-title');
  const priceEl = card.querySelector('.price');

  if (!bannerImg || !titleEl) continue;

  const goToShowcase = function (event) {
    event.preventDefault();

    const img = bannerImg.getAttribute('src');
    const title = titleEl.textContent.trim();
    const price = priceEl ? priceEl.textContent.trim() : '';

    const params = new URLSearchParams();

    if (img) params.set('img', img);
    if (title) params.set('title', title);
    if (price) params.set('price', price);

    window.location.href = 'showcase.html?' + params.toString();
  };

  // Navigate on image or title click
  bannerImg.addEventListener('click', goToShowcase);
  titleEl.addEventListener('click', goToShowcase);

  // Also allow clicking the card itself, excluding action buttons
  card.addEventListener('click', function(e){
    if (e.target.closest('.showcase-actions') || e.target.closest('.btn-action')) return;
    if (e.target.closest('a') && e.target.closest('a').getAttribute('href') && e.target.closest('a').getAttribute('href') !== '#') return;
    goToShowcase(e);
  });

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



  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    var wrappers = document.querySelectorAll('.profile-wrapper');
    wrappers.forEach(function(wrapper) {
      var btn = wrapper.querySelector('.user-menu-btn');
      var menu = wrapper.querySelector('.popup-menu');
      if (!menu || !btn) return;
      menu.style.display = 'none';
      var show = function() { menu.style.display = 'flex'; };
      var hide = function() { menu.style.display = 'none'; };
      btn.addEventListener('mouseenter', show);
      btn.addEventListener('mouseleave', function() {
        setTimeout(function() { if (!menu.matches(':hover')) hide(); }, 120);
      });
      menu.addEventListener('mouseenter', show);
      menu.addEventListener('mouseleave', hide);
      document.addEventListener('click', function(e) {
        if (!wrapper.contains(e.target)) hide();
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    if (!/showcase\.html$/i.test(window.location.pathname)) return;
    var products = [
      { img: './assets/images/products/clothes-1.jpg', hover: './assets/images/products/clothes-1.jpg', title: 'Relaxed Short full Sleeve T-Shirt', category: 'Clothes', price: '₱660.00', oldPrice: '₱709.00' },
      { img: './assets/images/products/clothes-2.jpg', hover: './assets/images/products/clothes-2.jpg', title: 'Girls pnk Embro design Top', category: 'Clothes', price: '₱360.00', oldPrice: '₱532.00' },
      { img: './assets/images/products/clothes-3.jpg', hover: './assets/images/products/clothes-4.jpg', title: 'Black Floral Wrap Midi Skirt', category: 'Clothes', price: '₱4493.00', oldPrice: '1478.00' },
      { img: './assets/images/products/shirt-1.jpg', hover: './assets/images/products/shirt-2.jpg', title: 'Pure Garment Dyed Cotton Shirt', category: 'Mens Fashion', price: '₱4020.00', oldPrice: '₱1832.00' },
      { img: './assets/images/products/jacket-5.jpg', hover: './assets/images/products/jacket-6.jpg', title: 'MEN Yarn Fleece Full-Zip Jacket', category: 'Winter wear', price: '₱3606.00', oldPrice: '₱650.00' },
      { img: './assets/images/products/jacket-1.jpg', hover: './assets/images/products/jacket-2.jpg', title: 'Mens Winter Leathers Jackets', category: 'Winter wear', price: '₱1891.00', oldPrice: '₱1182.00' },
      { img: './assets/images/products/jacket-3.jpg', hover: './assets/images/products/jacket-4.jpg', title: 'Mens Winter Leathers Jackets', category: 'Jackets', price: '₱1200.00', oldPrice: '1478.00' },
      { img: './assets/images/products/shorts-1.jpg', hover: './assets/images/products/shorts-2.jpg', title: 'Better Basics French Terry Sweatshorts', category: 'Shorts', price: '₱1182.00', oldPrice: '₱591.00' },
      { img: './assets/images/products/sports-1.jpg', hover: './assets/images/products/sports-6.jpg', title: 'Running & Trekking Shoes - White', category: 'Sports', price: '₱696.00', oldPrice: '₱886.00' },
      { img: './assets/images/products/sports-2.jpg', hover: './assets/images/products/sports-4.jpg', title: 'Trekking & Running Shoes - black', category: 'Sports', price: '₱1600.00', oldPrice: '₱2128.00' },
      { img: './assets/images/products/party-wear-1.jpg', hover: './assets/images/products/party-wear-2.jpg', title: 'Womens Party Wear Shoes', category: 'Party wear', price: '₱1500.00', oldPrice: '₱2483.00' },
      { img: './assets/images/products/sports-3.jpg', hover: './assets/images/products/sports-3.jpg', title: "Sports Claw Women's Shoes", category: 'Sports', price: '₱3192.00', oldPrice: '₱3842.00' },
      { img: './assets/images/products/shoe-3.jpg', hover: './assets/images/products/shoe-3.jpg', title: 'Boot With Suede Detail', category: 'boots', price: '₱1182.00', oldPrice: '₱1173.00' },
      { img: './assets/images/products/shoe-1.jpg', hover: './assets/images/products/shoe-1_1.jpg', title: "Men's Leather Formal Wear shoes", category: 'formal', price: '₱3310.00', oldPrice: '₱4611.00' },
      { img: './assets/images/products/shoe-2.jpg', hover: './assets/images/products/shoe-2_1.jpg', title: "Casual Men's Brown shoes", category: 'Casual', price: '₱2956.00', oldPrice: '₱3251.00' },
      { img: './assets/images/products/watch-3.jpg', hover: './assets/images/products/watch-4.jpg', title: 'Pocket Watch Leather Pouch', category: 'Watches', price: '₱1999.00', oldPrice: '₱2010.00' },
      { img: './assets/images/products/jewellery-3.jpg', hover: './assets/images/products/jewellery-3.jpg', title: 'Silver Deer Heart Necklace', category: 'Jewellery', price: '₱1200.00', oldPrice: '₱1770.00' },
      { img: './assets/images/products/perfume.jpg', hover: './assets/images/products/perfume.jpg', title: 'Titan 100 Ml Womens Perfume', category: 'Perfume', price: '₱510.00', oldPrice: '₱590.00' },
      { img: './assets/images/products/belt.jpg', hover: './assets/images/products/belt.jpg', title: "Men's Leather Reversible Belt", category: 'Belt', price: '₱350.00', oldPrice: '₱500.00' },
      { img: './assets/images/products/jewellery-2.jpg', hover: './assets/images/products/jewellery-2.jpg', title: 'platinum Zircon Classic Ring', category: 'jewellery', price: '₱3500.00', oldPrice: '₱3840.00' },
      { img: './assets/images/products/watch-1.jpg', hover: './assets/images/products/watch-2.jpg', title: 'Smart watche Vital Plus', category: 'Watches', price: '₱4000.00', oldPrice: '₱4600.00' },
      { img: './assets/images/products/shampoo.jpg', hover: './assets/images/products/shampoo.jpg', title: 'shampoo conditioner packs', category: 'cosmetics', price: '₱1699.00', oldPrice: '₱1770.00' },
      { img: './assets/images/products/jewellery-1.jpg', hover: './assets/images/products/jewellery-1.jpg', title: 'Rose Gold Peacock Earrings', category: 'jewellery', price: '₱17000.00', oldPrice: '₱17700.00' }
    ];

    var cards = document.querySelectorAll('.product-main .product-grid .showcase');
    if (!cards.length) return;
    cards.forEach(function(card, idx){
      var p = products[idx % products.length];
      var defaultImg = card.querySelector('.showcase-banner img.product-img.default') || card.querySelector('.showcase-banner img');
      var hoverImg = card.querySelector('.showcase-banner img.product-img.hover');
      if (defaultImg) defaultImg.src = p.img;
      if (hoverImg) hoverImg.src = p.hover || p.img;
      var titleEl = card.querySelector('.showcase-title');
      var catEl = card.querySelector('.showcase-category');
      var priceBox = card.querySelector('.price-box');
      var priceEl = priceBox ? priceBox.querySelector('.price') : null;
      var oldEl = priceBox ? priceBox.querySelector('del') : null;
      if (titleEl) titleEl.textContent = p.title;
      if (catEl) catEl.textContent = p.category;
      if (priceEl) priceEl.textContent = p.price;
      if (oldEl) oldEl.textContent = p.oldPrice || '';
    });
  });

  document.addEventListener('click', function(e) {
    var anchorTop = e.target.closest('a[href="#"]');
    if (anchorTop) {
      e.preventDefault();
      return;
    }
    var anchor = e.target.closest('a[href^="#"]');
    if (anchor && anchor.getAttribute('href') !== '#') {
      e.preventDefault();
      var id = anchor.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    var params = new URLSearchParams(window.location.search);
    var img = params.get('img');
    var title = params.get('title');
    var price = params.get('price');
    if (!img && !title && !price) return;
    var mainImg = document.getElementById('main-showcase-img');
    var mainShowcase = document.querySelector('.product-featured .showcase');
    var mainTitle = mainShowcase ? mainShowcase.querySelector('.showcase-title') : null;
    var mainPriceBox = mainShowcase ? mainShowcase.querySelector('.price-box') : null;
    var mainPrice = mainPriceBox ? mainPriceBox.querySelector('.price') : null;
    var mainOldPrice = mainPriceBox ? mainPriceBox.querySelector('del') : null;
    if (mainImg && img) mainImg.src = img;
    if (mainTitle && title) mainTitle.textContent = title;
    if (mainPrice && price) mainPrice.textContent = price;
    if (mainOldPrice && price) mainOldPrice.textContent = '';
  });
