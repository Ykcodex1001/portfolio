
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
// Memory Game Logic
const gameIcons = ['bxl-react', 'bxl-javascript', 'bxl-css3', 'bxl-html5', 'bxl-php', 'bxl-bootstrap', 'bx-bot', 'bx-data'];
let gameCards = [...gameIcons, ...gameIcons];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let gameTimer;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // تأكد مسح أي محتوى سابق
    shuffleArray(gameCards);
    
    gameCards.forEach((icon, index) => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `<i class='bx ${icon} card-icon'></i>`;
        card.addEventListener('click', () => flipCard(card, icon, index));
        gameBoard.appendChild(card);
    });

    // reset stats
    matchedPairs = 0;
    moves = 0;
    timer = 0;
    document.getElementById('moves').textContent = moves;
    document.getElementById('timer').textContent = timer;

    startTimer();
}

function flipCard(cardElement, icon, index) {
    if (flippedCards.length === 2 || cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) {
        return;
    }

    cardElement.classList.add('flipped');
    flippedCards.push({ element: cardElement, icon, index });

    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.icon === card2.icon) {
        setTimeout(() => {
            card1.element.classList.add('matched');
            card2.element.classList.add('matched');
            matchedPairs++;
            
            if (matchedPairs === gameIcons.length) {
                setTimeout(() => {
                    endGame();
                }, 500);
            }
            
            flippedCards = [];
        }, 500);
    } else {
        setTimeout(() => {
            card1.element.classList.remove('flipped');
            card2.element.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    clearInterval(gameTimer);
    gameTimer = setInterval(() => {
        timer++;
        document.getElementById('timer').textContent = timer;
    }, 1000);
}

function endGame() {
    clearInterval(gameTimer);
    setTimeout(() => {
        document.getElementById('gameOverlay').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 1000);
}

function skipGame() {
    clearInterval(gameTimer);
    document.getElementById('gameOverlay').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Navigation functionality (إذا أردت إعادة استخدامه)
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect (يمكن تركه)
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflow = 'hidden';
    createGameBoard();
});

// Scroll animations (إذا كنت تستخدمها في موقعك)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .certificate-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
