function scrollToElement(imageName) {
    const element = document.querySelector(`img[src$="${imageName}"]`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function toggleMenu() {
    const menuList = document.querySelector('.menu-list');
    menuList.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", function() {
    const galleries = document.querySelectorAll('.gallery-container');

    galleries.forEach(galleryContainer => {
        let slideIndex = 0;
        const gallery = galleryContainer.querySelector('.gallery');
        const slides = gallery.getElementsByClassName("slide");

        function showSlides(n) {
            if (n >= slides.length) {
                slideIndex = 0;
            } else if (n < 0) {
                slideIndex = slides.length - 1;
            } else {
                slideIndex = n;
            }

            const offset = -slideIndex * 100;
            gallery.style.transform = `translateX(${offset}%)`;
        }

        function plusSlides(n) {
            showSlides(slideIndex + n);
        }

        galleryContainer.querySelector('.prev').addEventListener('click', () => plusSlides(-1));
        galleryContainer.querySelector('.next').addEventListener('click', () => plusSlides(1));

        showSlides(slideIndex);
    });
});



  

