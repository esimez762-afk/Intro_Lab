let chart;


// AGREGAR RESISTENCIAS
function agregarResistencia(tipo) {

    let container = document.getElementById(
        tipo === "serie" ? "resistenciasSerie" : "resistenciasParalelo"
    );

    let input = document.createElement("input");
    input.placeholder = "Resistencia (Ω)";
    input.classList.add("resistencia");

    container.appendChild(input);
}

// OBTENER RESISTENCIAS
function obtenerValores(containerId) {

    let inputs = document.querySelectorAll(`#${containerId} .resistencia`);
    let valores = [];

    inputs.forEach(input => {
        let val = parseFloat(input.value);
        if (!isNaN(val)) valores.push(val);
    });

    return valores;
}

// SERIE
function calcularSerie() {

    let resistencias = obtenerValores("resistenciasSerie");
    let V = parseFloat(document.getElementById("voltajeSerie").value);

    if (resistencias.length === 0 || isNaN(V)) {
        document.getElementById("resultadoSerie").innerText = "⚠️ Datos incompletos";
        return;
    }

    let Rt = resistencias.reduce((a, b) => a + b, 0);
    let I = V / Rt;

    document.getElementById("resultadoSerie").innerHTML =
        `Rt: ${Rt.toFixed(2)} Ω<br>
         I total: ${I.toFixed(2)} A`;

    generarGrafica(Rt);
}

// PARALELO
function calcularParalelo() {

    let resistencias = obtenerValores("resistenciasParalelo");
    let V = parseFloat(document.getElementById("voltajeParalelo").value);

    if (resistencias.length === 0 || isNaN(V)) {
        document.getElementById("resultadoParalelo").innerText = "⚠️ Datos incompletos";
        return;
    }

    let invRt = resistencias.reduce((a, b) => a + (1 / b), 0);
    let Rt = 1 / invRt;
    let I = V / Rt;

    // Corrientes por rama
    let corrientes = resistencias.map(r => (V / r).toFixed(2));

    document.getElementById("resultadoParalelo").innerHTML =
        `Rt: ${Rt.toFixed(2)} Ω<br>
         I total: ${I.toFixed(2)} A<br>
         Corrientes por rama: ${corrientes.join(" A, ")} A`;

    generarGrafica(Rt);
}

// GRÁFICA V-I
function generarGrafica(Rt) {

    let corriente = [];
    let voltaje = [];

    for (let i = 0; i <= 10; i++) {
        corriente.push(i);
        voltaje.push(i * Rt);
    }

    if (chart) chart.destroy();

    chart = new Chart(document.getElementById("grafica"), {
        type: "line",
        data: {
            labels: corriente,
            datasets: [{
                label: "V = I·R",
                data: voltaje,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// INICIALIZAR
agregarResistencia("serie");
agregarResistencia("paralelo");