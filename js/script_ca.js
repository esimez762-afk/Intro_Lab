// =======================
// VARIABLES GLOBALES
// =======================
let chartCA;
let V_global = null;
let f_global = 10; // frecuencia por defecto

// =======================
// CALCULADORA + GRAFICAR
// =======================
function calcularCA() {

    let V = parseFloat(document.getElementById("voltajeCA").value);
    let I = parseFloat(document.getElementById("corrienteCA").value);
    let Z = parseFloat(document.getElementById("impedancia").value);

    if (!isNaN(V) && !isNaN(I) && isNaN(Z)) Z = V / I;
    else if (!isNaN(V) && !isNaN(Z) && isNaN(I)) I = V / Z;
    else if (!isNaN(I) && !isNaN(Z) && isNaN(V)) V = I * Z;
    else {
        document.getElementById("resultadoCA").innerHTML = "⚠️ Ingresa solo 2 valores";
        return;
    }

    // Guardar valores globales
    V_global = V;

    document.getElementById("resultadoCA").innerHTML =
        `Voltaje: ${V.toFixed(2)} V<br>
         Corriente: ${I.toFixed(2)} A<br>
         Impedancia: ${Z.toFixed(2)} Ω`;

    actualizarGraficaCA(); // 🔥 ahora sí usa el cálculo
}

// =======================
// GRÁFICA USANDO RESULTADOS
// =======================
function actualizarGraficaCA() {

    if (V_global === null) return; // no hay cálculo aún

    let tiempo = [];
    let datos = [];

    for (let t = 0; t < 100; t++) {
        tiempo.push(t);
        datos.push(V_global * Math.sin(t * 0.1 * f_global));
    }

    if (chartCA) chartCA.destroy();

    chartCA = new Chart(document.getElementById("graficaCA"), {
        type: "line",
        data: {
            labels: tiempo,
            datasets: [{
                label: "Señal CA",
                data: datos,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// =======================
// CONTROL DE FRECUENCIA
// =======================
document.getElementById("frecuenciaSliderCA").addEventListener("input", function() {
    f_global = this.value;
    document.getElementById("freqValueCA").innerText = f_global + " Hz";
    actualizarGraficaCA();
});

// =======================
// OSCILOSCOPIO
// =======================
const canvas = document.getElementById("osciloscopioCA");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 300;

let t = 0;

function dibujarOsciloscopioCA() {

    let V = V_global || 5;
    let f = f_global;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#0f0";
    ctx.lineWidth = 0.2;

    for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    ctx.strokeStyle = "#00ffcc";
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let x = 0; x < canvas.width; x++) {
        let y = canvas.height / 2 -
            (V * 5 * Math.sin((x + t) * 0.02 * f));

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    ctx.stroke();

    ctx.fillStyle = "#0f0";
    ctx.fillText(`V: ${V.toFixed(2)} V`, 10, 20);
    ctx.fillText(`f: ${f} Hz`, 10, 40);

    t += 2;
    requestAnimationFrame(dibujarOsciloscopioCA);
}

dibujarOsciloscopioCA();