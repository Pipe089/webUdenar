
// ==========================
// CAROUSEL
// ==========================
const container = document.querySelector(".carousel-container");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");

let index = 0;
const total = slides.length;

function updateCarousel() {
    container.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

// botones
nextBtn.addEventListener("click", () => {
    index = (index + 1) % total;
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    index = (index - 1 + total) % total;
    updateCarousel();
});

// dots
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        updateCarousel();
    });
});

// autoplay
setInterval(() => {
    index = (index + 1) % total;
    updateCarousel();
}, 8000);


// ==========================
// HERO FADE
// ==========================
const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;
    let fadeStart = 0;
    let fadeEnd = 400;

    let opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);

    if (opacity < 0) opacity = 0;
    if (opacity > 1) opacity = 1;

    hero.style.opacity = opacity;
});


// ==========================
// NAV -> CAROUSEL (CORREGIDO)
// ==========================
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {

        const text = link.textContent.trim().toLowerCase();

        if (text === "estudiantes") {
            e.preventDefault();
            index = 0;
            updateCarousel();
            document.querySelector("#info").scrollIntoView({
                behavior: "smooth"
            });
        }

        if (text === "docentes") {
            e.preventDefault();
            index = 1;
            updateCarousel();
            document.querySelector("#info").scrollIntoView({
                behavior: "smooth"
            });
        }

    });
});