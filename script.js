function toggleMobileNav() {
    const body = document.body;
    const header = document.getElementById('header');
    header.classList.toggle('nav-open');
    body.classList.toggle('nav-open');
}

function toggleAnswer(index) {
    const answer = document.getElementById(`answer-${index}`);
    const question = document.getElementsByClassName('question')[index - 1];
    const arrowIcon = question.querySelector('.arrow i');

    answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
    question.style.borderBottom = (answer.style.display === 'block') ? 'none' : '1px solid rgb(220,220,220, .2)';

    arrowIcon.classList.toggle('fa-angle-down');
    arrowIcon.classList.toggle('fa-angle-up');
}

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById('header');
    const scrollThreshold = 1;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.style.backgroundColor = 'rgba(26,30,31, 0.95)';
        } else {
            navbar.style.position = 'static';
            navbar.style.backgroundColor = 'transparent';
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    fetch('data/cardsData.json')
        .then(response => response.json())
        .then(data => {
            const courseCardsContainer = document.querySelector('.courses-cards');

            data.forEach(course => {
                const courseCard = document.createElement('article');
                courseCard.classList.add('course-card');

                const imageElement = document.createElement('img');
                imageElement.src = course.image;
                imageElement.alt = course.title;

                const titleElement = document.createElement('h5');
                titleElement.textContent = course.title;

                const contentElement = document.createElement('p');
                contentElement.textContent = course.content;

                const linkWrapper = document.createElement('div');
                const icon = document.createElement('span');
                icon.textContent = '→';
                const link = document.createElement('a');
                link.href = course.url;
                link.textContent = 'კურსის დეტალები';
                linkWrapper.appendChild(icon);
                linkWrapper.appendChild(link);

                courseCard.appendChild(imageElement);
                courseCard.appendChild(titleElement);
                courseCard.appendChild(contentElement);
                courseCard.appendChild(linkWrapper);

                courseCardsContainer.appendChild(courseCard);
            });
        })
        .catch(error => console.error('Error fetching course data:', error));
});

const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
let autoSlideInterval;

function showSlide(targetId) {
    slides.forEach(slide => slide.classList.remove("active"));
    const targetSlide = document.getElementById(targetId);
    targetSlide.classList.add("active");
}

function changeSlide(n) {
    let newSlideIndex = currentSlide + n;

    if (newSlideIndex === slides.length) {
        newSlideIndex = 0;
    } else if (newSlideIndex < 0) {
        newSlideIndex = slides.length - 1;
    }

    showSlide(`slide-${newSlideIndex}`);

    currentSlide = newSlideIndex;

    const activeIndicator = document.querySelector(".indicator.active");
    activeIndicator.classList.remove("active");
    document.querySelector(`.indicator[data-index="${currentSlide}"]`).classList.add("active");
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 6000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

const indicators = document.querySelectorAll(".indicator");

indicators.forEach(indicator => {
    indicator.addEventListener("click", () => {
        const slideIndex = Number(indicator.dataset.index);
        changeSlide(slideIndex - currentSlide);
    });
});

showSlide("slide-0");
startAutoSlide();

document.querySelector(".slideshow-container").addEventListener("mouseenter", stopAutoSlide);
document.querySelector(".slideshow-container").addEventListener("mouseleave", startAutoSlide);
