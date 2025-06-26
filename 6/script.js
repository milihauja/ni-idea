const tablero = document.getElementById("tablero");
const fichas = document.getElementById("fichas");
const resultado = document.getElementById("resultado");
const botonVerificar = document.getElementById("verificar");

const letrasDisponibles = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const diccionario = ["GATO", "CASA", "PERRO", "LUNA", "SOL", "RISA", "MESA", "SAL", "MAR", "RAYO", "RATA", "SILLA", "LIBRO", "MOTO"];

const valoresLetra = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1,
  J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1,
  S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
};

function crearTablero() {
  tablero.innerHTML = "";
  for (let i = 0; i < 25; i++) {
    const casilla = document.createElement("div");
    casilla.classList.add("casilla");
    casilla.setAttribute("data-index", i);
    casilla.addEventListener("dragover", e => e.preventDefault());
    casilla.addEventListener("drop", colocarFicha);
    casilla.addEventListener("click", () => quitarFicha(casilla));
    tablero.appendChild(casilla);
  }
}

function generarFichas(n = 7) {
  fichas.innerHTML = "";
  for (let i = 0; i < n; i++) {
    const letra = letrasDisponibles[Math.floor(Math.random() * letrasDisponibles.length)];
    const div = document.createElement("div");
    div.className = "ficha";
    div.textContent = letra;
    div.setAttribute("draggable", true);
    div.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", letra);
      e.target.classList.add("arrastrando");
    });
    fichas.appendChild(div);
  }
}

function colocarFicha(e) {
  const letra = e.dataTransfer.getData("text");
  if (e.target.textContent === "") {
    const div = document.querySelector(`.ficha.arrastrando`);
    if (div) div.remove();
    e.target.textContent = letra;
  }
}

function quitarFicha(casilla) {
  const letra = casilla.textContent;
  if (letra !== "") {
    casilla.textContent = "";
    const nuevaFicha = document.createElement("div");
    nuevaFicha.className = "ficha";
    nuevaFicha.textContent = letra;
    nuevaFicha.setAttribute("draggable", true);
    nuevaFicha.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", letra);
      e.target.classList.add("arrastrando");
    });
    fichas.appendChild(nuevaFicha);
  }
}

function calcularPuntaje(palabra) {
  return palabra.split("").reduce((acc, letra) => acc + (valoresLetra[letra] || 0), 0);
}

botonVerificar.addEventListener("click", () => {
  const letrasEnTablero = Array.from(document.querySelectorAll(".casilla"))
    .map(c => c.textContent)
    .filter(c => c !== "")
    .join("");

  if (diccionario.includes(letrasEnTablero)) {
    const puntos = calcularPuntaje(letrasEnTablero);
    resultado.textContent = `✅ ¡"${letrasEnTablero}" es válida! Puntos: ${puntos}`;
    resultado.style.color = "green";
  } else {
    resultado.textContent = `❌ "${letrasEnTablero}" no está en el diccionario.`;
    resultado.style.color = "red";
  }
});

crearTablero();
generarFichas();
