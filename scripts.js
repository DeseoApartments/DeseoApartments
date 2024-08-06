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

let slideIndex = 0;
const slides = document.getElementsByClassName("slide");
const gallery = document.querySelector('.gallery');

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

document.addEventListener("DOMContentLoaded", function() {
showSlides(slideIndex);
});

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

  

