let resultados = []; // Dados activos
let guardados = []; // Dados guardados
let turnos = 0; // Contador de turnos
let esModoClaro = false; // Modo noche por defecto

function tirarDados() {
    resultados = [];
    guardados = [];
    turnos = 1;
    for (let i = 0; i < 5; i++) {
        resultados.push(Math.floor(Math.random() * 6) + 1);
    }
    document.getElementById("relanzarBtn").style.display = "inline";
    document.getElementById("turnosRestantes").innerText = `${turnos}/3`;
    animarDados(resultados, true);
}

function relanzarDados() {
    if (turnos < 3) {
        turnos++;
        for (let i = 0; i < resultados.length; i++) {
            resultados[i] = Math.floor(Math.random() * 6) + 1;
        }
        document.getElementById("turnosRestantes").innerText = `${turnos}/3`;
        if (turnos === 3) {
            document.getElementById("relanzarBtn").style.display = "none";
        }
        animarDados(resultados, false);
    }
}

function moverDado(index, aGuardados) {
    if (aGuardados && resultados.length > 0) {
        let dado = resultados.splice(index, 1)[0];
        guardados.push(dado);
    } else if (!aGuardados && guardados.length > 0) {
        let dado = guardados.splice(index, 1)[0];
        resultados.push(dado);
    }
    actualizarDados();
}

function actualizarDados() {
    let ordenar = document.getElementById("ordenarAuto").checked;
    if (ordenar) {
        resultados.sort((a, b) => a - b);
        guardados.sort((a, b) => a - b);
    }

    let htmlActivos = "";
    for (let i = 0; i < resultados.length; i++) {
        htmlActivos += `<img src="img/${resultados[i]}.png" alt="Dado ${resultados[i]}" class="dado" onclick="moverDado(${i}, true)">`;
    }
    document.getElementById("resultado").innerHTML = htmlActivos;

    let htmlGuardados = "";
    for (let i = 0; i < guardados.length; i++) {
        htmlGuardados += `<img src="img/${guardados[i]}.png" alt="Dado ${guardados[i]}" class="dado guardado" onclick="moverDado(${i}, false)">`;
    }
    document.getElementById("guardados").innerHTML = htmlGuardados;

    // Calcular y mostrar la suma de los dados guardados
    let suma = guardados.reduce((acc, val) => acc + val, 0);
    document.getElementById("sumaGuardados").innerText = suma;

    document.getElementById("relanzarBtn").style.display = (resultados.length > 0 && turnos < 3) ? "inline" : "none";
}

function animarDados(dados, esLanzamientoInicial) {
    let html = "";
    for (let i = 0; i < dados.length; i++) {
        html += `<img src="img/1.png" alt="Dado" class="dado animando" data-index="${i}">`;
    }
    document.getElementById("resultado").innerHTML = html;

    const intervalo = 100;
    let contador = 0;
    const animacion = setInterval(() => {
        const dadosAnimados = document.querySelectorAll(".animando");
        dadosAnimados.forEach(dado => {
            const randomNum = Math.floor(Math.random() * 6) + 1;
            dado.src = `img/${randomNum}.png`;
        });
        contador++;
        if (contador >= 10) {
            clearInterval(animacion);
            mostrarResultadoFinal(dados);
        }
    }, intervalo);
}

function mostrarResultadoFinal(dados) {
    let html = "";
    for (let i = 0; i < dados.length; i++) {
        html += `<img src="img/${dados[i]}.png" alt="Dado ${dados[i]}" class="dado" onclick="moverDado(${i}, true)">`;
    }
    document.getElementById("resultado").innerHTML = html;
    actualizarDados();
}

function toggleModoNoche(modoClaro) {
    if (modoClaro && !esModoClaro) {
        document.body.classList.remove('dark-mode');
        document.getElementById("sol").style.display = "none";
        document.getElementById("luna").style.display = "inline";
        esModoClaro = true;
    } else if (!modoClaro && esModoClaro) {
        document.body.classList.add('dark-mode');
        document.getElementById("sol").style.display = "inline";
        document.getElementById("luna").style.display = "none";
        esModoClaro = false;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (!esModoClaro) {
        document.body.classList.add('dark-mode');
        document.getElementById("sol").style.display = "inline";
        document.getElementById("luna").style.display = "none";
    }
});