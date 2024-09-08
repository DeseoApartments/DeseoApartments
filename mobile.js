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
