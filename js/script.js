// ===========================
// MENÚ DESPLEGABLE
// ===========================
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}

// ===========================
// SCROLL SUAVE
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({
                behavior: "smooth"
            });
    });
});

// ===========================
// MENSAJE DINÁMICO
// ===========================
const mensaje = document.getElementById("mensaje");

if (mensaje) {
    const textos = [
        "Bienvenido al simulador de circuitos ⚡",
        "Explora Corriente Directa (CD)",
        "Analiza Corriente Alterna (CA)",
        "Realiza prácticas interactivas 🔧"
    ];

    let i = 0;

    setInterval(() => {
        mensaje.innerText = textos[i];
        i = (i + 1) % textos.length;
    }, 3000);
}

// ===========================
// ANIMACIÓN AL HACER SCROLL
// ===========================
const elementos = document.querySelectorAll(".animado");

function mostrarElementos() {
    let altura = window.innerHeight;

    elementos.forEach(el => {
        let distancia = el.getBoundingClientRect().top;

        if (distancia < altura - 100) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", mostrarElementos);

// ===========================
// EFECTO HOVER TARJETAS
// ===========================
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.05)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
    });
});