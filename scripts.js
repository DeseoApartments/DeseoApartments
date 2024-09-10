const images = [
    {
        src: "images/casa1.jpg",
        descriptions: {
            it: "Elegante appartamento nel centro storico di Bologna. Circondato da luoghi di interesse storico-culturale.",
            en: "Elegant apartment in the historic center of Bologna. Surrounded by historical and cultural sites.",
            fr: "Appartement élégant dans le centre historique de Bologne. Entouré de sites historiques et culturels.",
            es: "Elegante apartamento en el centro histórico de Bolonia. Rodeado de lugares de interés histórico y cultural."
        },
        buttonText: { it: "PRENOTA ORA", en: "BOOK NOW", fr: "RÉSERVEZ MAINTENANT", es: "RESERVA AHORA" },
        link: "battisti.html"
    },
    {
        src: "images/casa2.jpg",
        descriptions: {
            it: "Luminoso appartamento con terrazza, vicino al centro di Bologna e ai Giardini Margherita. Ideale per famiglie, coppie o amici.",
            en: "Bright apartment with terrace, near the center of Bologna and the Margherita Gardens. Ideal for families, couples or friends.",
            fr: "Appartement lumineux avec terrasse, près du centre de Bologna et des Jardins Margherita. Idéal pour les familles, les couples ou les amis.",
            es: "Apartamento luminoso con terraza, cerca del centro de Bologna y los Jardines Margherita. Ideal para familias, parejas o amigos."
        },
        buttonText: { it: "PRENOTA ORA", en: "BOOK NOW", fr: "RÉSERVEZ MAINTENANT", es: "RESERVA AHORA" },
        link: "cavazza.html"
    },
    {
        src: "images/casa3.jpg",
        descriptions: {
            it: "Accogliente monolocale a Bologna al piano terra, ideale per single o coppie e ideale per professionisti.",
            en: "Cozy studio in Bologna on the ground floor, ideal for singles or couples and for professionals.",
            fr: "Studio confortable à Bologne au rez-de-chaussée, idéal pour les célibataires ou les couples et pour les professionnels.",
            es: "Acogedor estudio a Bologna en la planta baja, ideal para solteros o parejas y para profesionales."
        },
        buttonText: { it: "PRENOTA ORA", en: "BOOK NOW", fr: "RÉSERVEZ MAINTENANT", es: "RESERVA AHORA" },
        link: "castelmerlo.html"
    },
    {
        src: "images/casa4.jpg",
        descriptions: {
            it: "Tranquillo trilocale a Bologna distante 50 metri dall'ospedale Sant'Orsola.",
            en: "Bologna. Quiet three-room apartment 50 meters from Sant'Orsola hospital.",
            fr: "Bologne. Tranquille appartement de trois pièces à 50 mètres de l'hôpital Sant'Orsola.",
            es: "Bolonia. Tranquilo apartamento de tres habitaciones a 50 metros del hospital Sant'Orsola."
        },
        buttonText: { it: "PRENOTA ORA", en: "BOOK NOW", fr: "RÉSERVEZ MAINTENANT", es: "RESERVA AHORA" },
        link: "https://www.airbnb.it/rooms/1173767918171033040?source_impression_id=p3_1725895144_P3dFWxA4gCELbg9w"
    }
];

let currentIndex = 0;
const totalImages = images.length;
const imageWrapper = document.getElementById('image-wrapper');
const descriptionText = document.getElementById('description-text');
const descriptionButton = document.querySelector('.description-button');

// Funzione per rilevare la lingua della pagina
function getLanguage() {
    const lang = document.documentElement.lang || navigator.language.split('-')[0];
    return ['it', 'en', 'fr', 'es'].includes(lang) ? lang : 'en'; // Default 'en' se la lingua non è supportata
}

function updateContent() {
    const lang = getLanguage();
    
    // Ottieni la larghezza della viewport in pixel
    const viewportWidth = window.innerWidth;

    // Calcola lo spostamento in pixel basato sulla larghezza in vw
    const imageWidthInVW = 60; // Ogni immagine è larga 60vw
    const translateXValue = -currentIndex * (imageWidthInVW * viewportWidth / 100); // Calcola lo spostamento in pixel

    imageWrapper.style.transform = `translateX(${translateXValue}px)`; // Applica lo spostamento in pixel

    // Aggiorna descrizione e pulsante in base alla lingua
    descriptionText.innerHTML = images[currentIndex].descriptions[lang];
    descriptionButton.textContent = images[currentIndex].buttonText[lang];
    descriptionButton.href = images[currentIndex].link;
}

document.getElementById('left-arrow').addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
    updateContent();
});

document.getElementById('right-arrow').addEventListener('click', () => {
    currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
    updateContent();
});

// Aggiorna contenuto all'avvio
updateContent();





// VANTAGGI
const dropdownTitles = document.querySelectorAll('.dropdown-title, .dropdown-title1, .dropdown-title2');
const dropdownContents = document.querySelectorAll('.dropdown-content');

dropdownTitles.forEach((title, index) => {
    title.addEventListener('click', () => {
        dropdownContents.forEach((content, idx) => {
            if (index === idx) {
                // Attiva/disattiva la visibilità del contenuto
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
                
                // Aggiungi o rimuovi la classe attiva sul titolo
                if (content.style.display === 'block') {
                    title.classList.add('active');
                } else {
                    title.classList.remove('active');
                }
            } else {
                content.style.display = 'none'; // Chiude le altre sezioni
                dropdownTitles[idx].classList.remove('active'); // Rimuove la classe attiva dagli altri titoli
            }
        });

        // Invia l'altezza aggiornata al documento principale
        setTimeout(() => {
            const height = document.body.scrollHeight;
            window.parent.postMessage({ height: height }, '*');
        }, 300); // Timeout per attendere l'animazione di apertura/chiusura
    });
});

//cover flow servizi

const coverFlow = document.querySelector('.cover-flow');
const items = document.querySelectorAll('.cover-flow-item');
let flowCurrentIndex = 2; // Inizializza con l'indice 2 per partire dall'elemento 3

// Chiamata iniziale per visualizzare correttamente l'elemento n.3 all'apertura
updateCoverFlow();

document.querySelector('.next').addEventListener('click', () => {
    flowCurrentIndex = (flowCurrentIndex + 1) % items.length;
    updateCoverFlow();
});

document.querySelector('.prev').addEventListener('click', () => {
    flowCurrentIndex = (flowCurrentIndex - 1 + items.length) % items.length;
    updateCoverFlow();
});

function updateCoverFlow() {
    const totalItems = items.length;

    items.forEach((item, index) => {
        const offset = index - flowCurrentIndex;
        const isActive = index === flowCurrentIndex;

        item.classList.toggle('active', isActive);

        if (isActive) {
            item.style.transform = 'scale(1.3) translateZ(0)';
            item.style.opacity = '1';
        } else if (Math.abs(offset) === 1) {
            const scale = 1 - Math.abs(offset) * 0.2;
            const translateX = offset * 300; /* Aumenta ulteriormente la distanza tra gli elementi */
            const translateZ = -Math.abs(offset) * 200; /* Mantieni gli elementi più lontani sullo sfondo */
            const rotateY = offset * 20; /* Mantieni un angolo di rotazione per gli elementi meno inclinati */
            item.style.transform = `translateX(${translateX}px) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`;
            item.style.opacity = '0.6'; /* Imposta opacità a 0.6 per gli elementi immediatamente successivi */
        } else {
            const scale = 1 - Math.abs(offset) * 0.2;
            const translateX = offset * 300; /* Aumenta ulteriormente la distanza tra gli elementi */
            const translateZ = -Math.abs(offset) * 200; /* Mantieni gli elementi più lontani sullo sfondo */
            const rotateY = offset * 20; /* Mantieni un angolo di rotazione per gli elementi meno inclinati */
            item.style.transform = `translateX(${translateX}px) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`;
            item.style.opacity = '0.1'; /* Imposta opacità a 0.1 per gli elementi più lontani */
        }

        item.style.zIndex = totalItems - Math.abs(offset);
    });



}




