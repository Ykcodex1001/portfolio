
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
};
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider");

  sliders.forEach(slider => {
    const images = slider.querySelectorAll("img");
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");
    const dotsContainer = slider.querySelector(".dots");
    let index = 0;
    let interval;

    // إنشاء النقاط
    images.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToImage(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll("span");

    function updateSlider() {
      images.forEach(img => img.classList.remove("active"));
      dots.forEach(dot => dot.classList.remove("active"));
      images[index].classList.add("active");
      dots[index].classList.add("active");
    }

    function showNextImage() {
      index = (index + 1) % images.length;
      updateSlider();
    }

    function showPrevImage() {
      index = (index - 1 + images.length) % images.length;
      updateSlider();
    }

    function goToImage(i) {
      index = i;
      updateSlider();
    }

    function startAutoSlide() {
      interval = setInterval(showNextImage, 3000);
    }

    function stopAutoSlide() {
      clearInterval(interval);
    }

    prevBtn.addEventListener("click", () => { showPrevImage(); stopAutoSlide(); startAutoSlide(); });
    nextBtn.addEventListener("click", () => { showNextImage(); stopAutoSlide(); startAutoSlide(); });

    slider.addEventListener("mouseenter", stopAutoSlide);
    slider.addEventListener("mouseleave", startAutoSlide);

    updateSlider();
    startAutoSlide();
  });
});


