const swiper = new Swiper('.swiper-container', {
    loop: true, // Ripeti le slide all'infinito
    autoplay: {
      delay: 5000, // Cambia slide automaticamente dopo 5 secondi
      disableOnInteraction: false, // Continua l'autoplay anche dopo che l'utente ha interagito
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true, // Permette di cliccare sui puntini di navigazione
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    effect: 'slide', // Effetto di transizione tra slide
    grabCursor: true, // Il cursore cambia aspetto quando si interagisce con il touch
    touchRatio: 1, // Imposta la sensibilità del tocco, di default è 1
    threshold: 20, // Distanza minima in pixel per attivare lo swipe
  });
  