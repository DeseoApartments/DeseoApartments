// Inizializza lo Swiper senza autoplay
const swiper = new Swiper('.swiper-container', {
  loop: true, // Ripeti le slide all'infinito
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  slidesPerView: 1, // Visualizza una slide per volta
  spaceBetween: 0,
  centeredSlides: true, // Mantiene la slide corrente centrata
  resistanceRatio: 0.85, // Imposta la resistenza durante lo swipe
});

// Collega le frecce custom nella barra di navigazione al comportamento di Swiper
document.getElementById('swiper-button-next-custom').addEventListener('click', function() {
  swiper.slideNext();
});

document.getElementById('swiper-button-prev-custom').addEventListener('click', function() {
  swiper.slidePrev();
});

window.addEventListener('load', function() {
  // Controlla se l'URL contiene un ancoraggio (hash)
  const hasHash = window.location.hash;

  if (hasHash) {
    // Se c'è un ancoraggio nell'URL, controlla se si riferisce a una slide
    const targetSlide = document.querySelector(hasHash);

    if (targetSlide && targetSlide.classList.contains('swiper-slide')) {
      // Se l'ID appartiene a una slide, scorri direttamente alla slide corrispondente
      const targetIndex = Array.from(targetSlide.parentNode.children).indexOf(targetSlide);
      swiper.slideTo(targetIndex);
    } else {
      // Se l'ID non appartiene a una slide, scorri direttamente alla sezione
      const targetElement = document.querySelector(hasHash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  } else {
    // Se non ci sono ancoraggi, esegui lo scorrimento automatico tra le slide
    swiper.slideTo(1, 300); // Scorri velocemente alla slide 2
    setTimeout(() => {
      swiper.slideTo(2, 1900); // Scorri velocemente alla slide 3
    }, 300);

    setTimeout(() => {
      swiper.slideTo(1, 1900, false); // Torna alla slide 1 senza passare dalla slide 5
    }, 1000);
  }
});


// Menù hamburger toggle
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', function () {
  menu.classList.toggle('show');
});

// Chiudere il menu quando si clicca su una voce del menu
document.querySelectorAll('.menu a').forEach(function(menuItem) {
  menuItem.addEventListener('click', function(e) {
    // Controlla se l'attributo data-slide esiste
    const targetSlide = this.getAttribute('data-slide');
    
    if (targetSlide) {
      e.preventDefault(); // Previene l'azione di default solo se è un link data-slide
      
      // Recupera l'ID della slide
      const targetElement = document.querySelector(targetSlide);
      
      if (targetElement) {
        const targetIndex = Array.from(targetElement.parentNode.children).indexOf(targetElement);
        
        // Vai alla slide corrispondente usando l'indice
        swiper.slideTo(targetIndex);
      }

      // Chiude il menu dopo lo scorrimento
      menu.classList.remove('show');
    } else {
      // Se non è un data-slide, lascia che il link href funzioni normalmente
      menu.classList.remove('show');
    }
  });
});

// Chiudere il menu quando si clicca su un input all'interno del menu
document.querySelectorAll('.menu input').forEach(function(menuInput) {
  menuInput.addEventListener('click', function() {
    // Chiude il menu
    menu.classList.remove('show');
  });
});

// CSS dinamico per il menù hamburger
const style = document.createElement('style');
style.innerHTML = `
  .show-menu {
    display: block;
    position: absolute;
    top: 50px;
    right: 0;
    background: #333;
    width: 100%;
    text-align: center;
  }

  .show-menu ul {
    padding: 10px;
  }
`;
document.head.appendChild(style);
