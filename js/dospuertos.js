// =========================================
// DIBUJO RED DOS PUERTOS
// =========================================

const canvas = document.getElementById("dosPuertosCanvas");
const ctx = canvas.getContext("2d");

ctx.lineWidth = 2;

// CUADRO CENTRAL
ctx.strokeRect(150, 50, 200, 120);

// TEXTO
ctx.font = "16px Arial";
ctx.fillText("Red de Dos Puertos", 175, 110);

// LINEAS DE CONEXION
ctx.beginPath();

ctx.moveTo(50, 80);
ctx.lineTo(150, 80);

ctx.moveTo(50, 140);
ctx.lineTo(150, 140);

ctx.moveTo(350, 80);
ctx.lineTo(450, 80);

ctx.moveTo(350, 140);
ctx.lineTo(450, 140);

ctx.stroke();

// NOMBRES DE PUERTOS
ctx.fillText("Puerto 1", 60, 70);
ctx.fillText("Puerto 2", 360, 70);


// =========================================
// SIMULADOR PARAMETRO Z
// =========================================

function calcularZ(){

    // OBTENER VALORES
    let z11 = parseFloat(document.getElementById("z11").value);
    let z12 = parseFloat(document.getElementById("z12").value);

    let i1 = parseFloat(document.getElementById("i1").value);
    let i2 = parseFloat(document.getElementById("i2").value);

    // VALIDACION
    if(
        isNaN(z11) ||
        isNaN(z12) ||
        isNaN(i1) ||
        isNaN(i2)
    ){

        document.getElementById("resultadoZ").innerHTML =
            "Ingrese todos los valores correctamente.";

        return;
    }

    // ECUACION PARAMETRO Z
    let V1 = (z11 * i1) + (z12 * i2);

    // MOSTRAR RESULTADO
    document.getElementById("resultadoZ").innerHTML =
        "Voltaje V1 = <strong>" +
        V1.toFixed(2) +
        " V</strong>";
}


// =========================================
// ANIMACIONES SCROLL
// =========================================

const elementos = document.querySelectorAll(".animado");

function mostrarElementos(){

    elementos.forEach(elemento => {

        const top = elemento.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){

            elemento.classList.add("visible");

        }

    });

}

// EVENTO SCROLL
window.addEventListener("scroll", mostrarElementos);

// EJECUCION INICIAL
mostrarElementos();