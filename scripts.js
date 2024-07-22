function scrollToElement(imageName) {
    const element = document.querySelector(`img[src$="${imageName}"]`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

  

