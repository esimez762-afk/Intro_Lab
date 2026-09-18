// =========================================
// NAVEGACIÓN COMPARTIDA
// Menú desplegable accesible en táctil/teclado
// + resaltado del enlace de la página actual
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    // --- MENÚ DESPLEGABLE (clic para táctil, hover ya funciona por CSS) ---
    document.querySelectorAll(".dropdown").forEach(dropdown => {
        const boton = dropdown.querySelector(".dropbtn");
        if (!boton) return;

        boton.setAttribute("aria-expanded", "false");

        boton.addEventListener("click", (e) => {
            e.stopPropagation();
            const abierto = dropdown.classList.toggle("abierto");
            boton.setAttribute("aria-expanded", abierto ? "true" : "false");
        });
    });

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener("click", () => {
        document.querySelectorAll(".dropdown.abierto").forEach(d => {
            d.classList.remove("abierto");
            const boton = d.querySelector(".dropbtn");
            if (boton) boton.setAttribute("aria-expanded", "false");
        });
    });

    // Cerrar el menú con la tecla Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            document.querySelectorAll(".dropdown.abierto").forEach(d => {
                d.classList.remove("abierto");
            });
        }
    });

    // --- RESALTAR PÁGINA ACTUAL EN EL MENÚ ---
    const paginaActual = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("nav a").forEach(enlace => {
        const destino = enlace.getAttribute("href");
        if (destino === paginaActual) {
            enlace.classList.add("activo");
            enlace.setAttribute("aria-current", "page");
        }
    });
});
