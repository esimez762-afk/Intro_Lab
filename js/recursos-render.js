// =========================================================
// DATOS DE LOS ARCHIVOS (ver js/recursos.js)
// =========================================================

const contenedor = document.getElementById("listaArchivos");
const buscador = document.getElementById("buscarArchivo");

function iconoPara(nombreArchivo) {
    const ext = nombreArchivo.split(".").pop().toLowerCase();
    const iconos = {
        pdf: "📄", doc: "📝", docx: "📝",
        xls: "📊", xlsx: "📊",
        ppt: "📽️", pptx: "📽️",
        zip: "🗜️", rar: "🗜️",
        png: "🖼️", jpg: "🖼️", jpeg: "🖼️", gif: "🖼️",
        mp4: "🎬", mp3: "🎵"
    };
    return iconos[ext] || "📎";
}

function renderArchivos(filtro = "") {
    contenedor.innerHTML = "";

    const filtroLimpio = filtro.trim().toLowerCase();
    const lista = ARCHIVOS.filter(item =>
        item.nombre.toLowerCase().includes(filtroLimpio) ||
        (item.categoria || "").toLowerCase().includes(filtroLimpio)
    );

    if (ARCHIVOS.length === 0) {
        contenedor.innerHTML = `
            <p class="archivos-vacio">
                Aún no hay archivos publicados. Consulta la sección
                "¿Cómo subo un archivo?" más abajo para agregar el primero.
            </p>`;
        return;
    }

    if (lista.length === 0) {
        contenedor.innerHTML = `<p class="archivos-vacio">No se encontraron archivos para "${filtro}".</p>`;
        return;
    }

    lista.forEach(item => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "archivo-item";

        tarjeta.innerHTML = `
            <div class="archivo-icono">${iconoPara(item.archivo)}</div>
            <div class="archivo-info">
                <h3>${item.nombre}</h3>
                ${item.descripcion ? `<p>${item.descripcion}</p>` : ""}
                ${item.categoria ? `<span class="archivo-categoria">${item.categoria}</span>` : ""}
            </div>
            <a class="archivo-descarga" href="${item.archivo}" download>Descargar</a>
        `;

        contenedor.appendChild(tarjeta);
    });
}

if (buscador) {
    buscador.addEventListener("input", () => renderArchivos(buscador.value));
}

renderArchivos();

