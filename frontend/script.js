
/* HERITAGE INDIA - MULTI-PAGE JAVASCRIPT (script.js) */

document.addEventListener('DOMContentLoaded', function () {

  /* SECTION 1: ACTIVE NAVIGATION LINK  */
  var header = document.querySelector('.header');
  var navItems = document.querySelectorAll('.nav-links a');
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navItems.forEach(function (item) {
    var href = item.getAttribute('href');
    if (href === currentPath) {
      item.classList.add('active');
    }
  });

  if (header && !header.classList.contains('sticky')) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    });
  }

  /* SECTION 2: MOBILE HAMBURGER MENU */
  var hamburgerBtn = document.getElementById('hamburger-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      hamburgerBtn.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!hamburgerBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburgerBtn.classList.remove('active');
      }
    });
  }

  /* SECTION 2B: BACK TO TOP BUTTON */
  var backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* SECTION 3: HERO IMAGE SLIDESHOW (Runs on index.html) */
  var heroSlides = document.querySelectorAll('.hero-slide');
  var heroDots = document.querySelectorAll('.hero .dot');
  var heroPrevBtn = document.querySelector('.carousel-control.prev');
  var heroNextBtn = document.querySelector('.carousel-control.next');

  var currentHeroIndex = 0;
  var heroTimer = null;

  function showHeroSlide(targetIndex) {
    heroSlides.forEach(function (slide) {
      slide.classList.remove('active');
    });
    heroDots.forEach(function (dot) {
      dot.classList.remove('active');
    });

    currentHeroIndex = (targetIndex + heroSlides.length) % heroSlides.length;

    heroSlides[currentHeroIndex].classList.add('active');
    if (heroDots[currentHeroIndex]) {
      heroDots[currentHeroIndex].classList.add('active');
    }
  }

  function nextHeroSlide() {
    showHeroSlide(currentHeroIndex + 1);
  }

  function prevHeroSlide() {
    showHeroSlide(currentHeroIndex - 1);
  }

  function startHeroTimer() {
    stopHeroTimer();
    heroTimer = setInterval(nextHeroSlide, 5000);
  }

  function stopHeroTimer() {
    if (heroTimer !== null) {
      clearInterval(heroTimer);
    }
  }

  if (heroSlides.length > 0) {
    if (heroNextBtn) {
      heroNextBtn.addEventListener('click', function () {
        nextHeroSlide();
        startHeroTimer();
      });
    }

    if (heroPrevBtn) {
      heroPrevBtn.addEventListener('click', function () {
        prevHeroSlide();
        startHeroTimer();
      });
    }

    heroDots.forEach(function (dot) {
      dot.addEventListener('click', function (event) {
        var clickedIndex = parseInt(event.target.getAttribute('data-index'), 10);
        showHeroSlide(clickedIndex);
        startHeroTimer();
      });
    });

    startHeroTimer();
  }


  /* SECTION 4: ANIMATED COUNTER NUMBERS (Runs on about.html) */
  var counterElements = document.querySelectorAll('.stat-number');
  var animationSpeed = 150;

  function runCounterAnimation(counterElement) {
    var targetNumber = parseInt(counterElement.getAttribute('data-target'), 10);
    var currentCount = 0;
    var stepIncrement = targetNumber / animationSpeed;

    function updateCounter() {
      currentCount = currentCount + stepIncrement;

      if (currentCount < targetNumber) {
        counterElement.innerText = Math.ceil(currentCount);
        setTimeout(updateCounter, 15);
      } else {
        var plusSuffix = (targetNumber === 5000 || targetNumber === 40 || targetNumber === 100) ? '+' : '';
        counterElement.innerText = targetNumber + plusSuffix;
      }
    }

    updateCounter();
  }

  if (counterElements.length > 0) {
    counterElements.forEach(function (element) {
      runCounterAnimation(element);
    });
  }


  /* SECTION 5: GENERIC FILTER BUTTON SYSTEM (Monuments, Festivals, Cuisine, Culture) */
  var filterButtons = document.querySelectorAll('.filter-btn');

  if (filterButtons.length > 0) {
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function (event) {
        var selectedFilter = event.target.getAttribute('data-filter');

        filterButtons.forEach(function (b) {
          b.classList.remove('active');
        });
        event.target.classList.add('active');

        var cards = document.querySelectorAll('.card-item');
        cards.forEach(function (card) {
          var cardRegion = card.getAttribute('data-region') || '';
          var cardCategory = card.getAttribute('data-category') || '';

          if (
            selectedFilter === 'all' ||
            cardRegion.includes(selectedFilter) ||
            cardCategory.includes(selectedFilter)
          ) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }


  /* SECTION 6: FORM SUBMISSION & SUCCESS MODAL (Runs on contact.html)  */
  var tourForm = document.getElementById('tour-inquiry-form');
  var newsletterForm = document.getElementById('newsletter-form');
  var successPopupModal = document.getElementById('success-popup');
  var popupTitleElement = document.getElementById('success-popup-title');
  var popupMsgElement = document.getElementById('success-popup-msg');
  var popupCloseBtn = document.getElementById('success-close-btn');

  function openSuccessPopup(heading, message) {
    if (!successPopupModal || !popupTitleElement || !popupMsgElement) return;

    popupTitleElement.innerText = heading;
    popupMsgElement.innerText = message;
    successPopupModal.classList.add('show');
    successPopupModal.setAttribute('aria-hidden', 'false');
  }

  function closeSuccessPopup() {
    if (!successPopupModal) return;
    successPopupModal.classList.remove('show');
    successPopupModal.setAttribute('aria-hidden', 'true');
  }

  if (tourForm) {
    tourForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var userName = document.getElementById('form-name').value;
      var userEmail = document.getElementById('form-email').value;
      var userPhone = document.getElementById('form-phone').value;
      var userInterest = document.getElementById('form-interest').value;
      var userMessage = document.getElementById('form-message').value;

      if (userName && userEmail && userMessage) {
        // Send form data to the backend API (Node.js + MongoDB)
        fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: userName,
            email: userEmail,
            phone: userPhone,
            interest: userInterest,
            message: userMessage,
          }),
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            if (data.success) {
              openSuccessPopup(
                'Inquiry Submitted!',
                'Thank you, ' + userName + '! We have received your inquiry and saved it to our database. Our cultural tourism curators will contact you at ' + userEmail + ' within 24 hours.'
              );
              tourForm.reset();
            } else {
              alert('Error: ' + (data.error || 'Something went wrong. Please try again.'));
            }
          })
          .catch(function (error) {
            console.error('Fetch error:', error);
            alert('Could not connect to the server. Please make sure the backend is running.');
          });
      }
    });
  }

  if (popupCloseBtn) {
    popupCloseBtn.addEventListener('click', closeSuccessPopup);
  }

  if (successPopupModal) {
    successPopupModal.addEventListener('click', function (event) {
      if (event.target === successPopupModal) {
        closeSuccessPopup();
      }
    });
  }
});
