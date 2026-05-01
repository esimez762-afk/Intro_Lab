// =========================
// CALCULADORA + GRÁFICA
// =========================

let chart;

function calcularOhm() {

    let V = parseFloat(document.getElementById("voltaje").value);
    let I = parseFloat(document.getElementById("corriente").value);
    let R = parseFloat(document.getElementById("resistencia").value);

    if (!isNaN(V) && !isNaN(I) && isNaN(R)) R = V / I;
    else if (!isNaN(V) && !isNaN(R) && isNaN(I)) I = V / R;
    else if (!isNaN(I) && !isNaN(R) && isNaN(V)) V = I * R;
    else {
        document.getElementById("resultadoOhm").innerHTML = "⚠️ Ingresa solo 2 valores";
        return;
    }

    document.getElementById("resultadoOhm").innerHTML =
        `Voltaje: ${V.toFixed(2)} V<br>
         Corriente: ${I.toFixed(2)} A<br>
         Resistencia: ${R.toFixed(2)} Ω`;

    // Datos gráfica
    let x = [], y = [];

    for (let i = 0; i <= I * 2; i += I / 10) {
        x.push(i);
        y.push(i * R);
    }

    if (chart) chart.destroy();

    chart = new Chart(document.getElementById("graficaVI"), {
        type: "line",
        data: {
            labels: x,
            datasets: [{
                label: "V = I·R",
                data: y,
                tension: 0.2
            }]
        },
        options: {
            scales: {
                x: { title: { display: true, text: "Corriente (A)" } },
                y: { title: { display: true, text: "Voltaje (V)" } }
            }
        }
    });
}

// =========================
// OSCILOSCOPIO
// =========================

const canvas = document.getElementById("osciloscopio");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 300;

let t = 0;

function dibujarOsciloscopio() {

    let modo = document.getElementById("modo").value;
    let V = document.getElementById("voltajeSlider").value;
    let R = document.getElementById("resistenciaSlider").value;
    let f = document.getElementById("frecuenciaSlider").value;

    let I = V / R;

    document.getElementById("freqValue").innerText = f + " Hz";

    // Fondo
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = "#0f0";
    ctx.lineWidth = 0.2;

    for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Señal
    ctx.strokeStyle = "#00ffcc";
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let x = 0; x < canvas.width; x++) {

        let y;

        if (modo === "cd") {
            y = canvas.height / 2 - (V * 5);
        } else {
            y = canvas.height / 2 - (V * 5 * Math.sin((x + t) * 0.02 * f));
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    ctx.stroke();

    // Datos
    ctx.fillStyle = "#0f0";
    ctx.font = "14px monospace";

    ctx.fillText(`Modo: ${modo.toUpperCase()}`, 10, 20);
    ctx.fillText(`V: ${V} V`, 10, 40);
    ctx.fillText(`R: ${R} Ω`, 10, 60);
    ctx.fillText(`I: ${I.toFixed(2)} A`, 10, 80);

    if (modo === "ca") {
        ctx.fillText(`f: ${f} Hz`, 10, 100);
    }

    t += 2;
    requestAnimationFrame(dibujarOsciloscopio);
}

dibujarOsciloscopio();

function calcularSerie(){
let Rt=+r1s.value+ +r2s.value;
let I=vs.value/Rt;
resultadoSerie.innerText="Rt="+Rt+" I="+I;
}

function calcularParalelo(){
let Rt=1/((1/r1p.value)+(1/r2p.value));
let I=vp.value/Rt;
resultadoParalelo.innerText="Rt="+Rt+" I="+I;
}