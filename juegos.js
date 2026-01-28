// ================== JUEGO DE MEMORIA ==================
let tarjeta1 = null;
let tarjeta2 = null;
let bloqueoMemoria = false;
let puntajeMemoria = 0;

const terminosMemoria = [
  "Anorexia", "Pérdida de peso",
  "Bulimia", "Atracón-purgación",
  "Binge Eating", "Comer en exceso",
  "RATCA", "Red de ayuda",
  "Autoestima", "Relacionada con TCA",
  "Nutrición", "Alimentación saludable",
  "Psicólogo", "Profesional de ayuda",
  "Adolescencia", "Etapa de riesgo"
];

function inicializarMemoria() {
  const tablero = document.querySelector(".tablero-memoria");
  const puntajeTexto = document.querySelector(".puntaje-memoria span");
  puntajeTexto.textContent = puntajeMemoria;

  // Mezclar términos
  const terminosMezclados = [...terminosMemoria, ...terminosMemoria];
  terminosMezclados.sort(() => Math.random() - 0.5);

  // Crear tarjetas
  tablero.innerHTML = "";
  terminosMezclados.forEach(termino => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-memoria");
    tarjeta.dataset.termino = termino;
    tarjeta.textContent = "?";
    tarjeta.addEventListener("click", girarTarjeta);
    tablero.appendChild(tarjeta);
  });
}

function girarTarjeta() {
  const tarjeta = this;

  if (bloqueoMemoria || tarjeta === tarjeta1 || tarjeta.classList.contains("encontrada")) {
    return;
  }

  tarjeta.classList.add("girada");
  tarjeta.textContent = tarjeta.dataset.termino;

  if (!tarjeta1) {
    tarjeta1 = tarjeta;
    return;
  }

  tarjeta2 = tarjeta;
  bloqueoMemoria = true;
  verificarPareja();
}

function verificarPareja() {
  const puntajeTexto = document.querySelector(".puntaje-memoria span");
  if (tarjeta1.dataset.termino === tarjeta2.dataset.termino) {
    tarjeta1.classList.add("encontrada");
    tarjeta2.classList.add("encontrada");
    puntajeMemoria += 10;
    puntajeTexto.textContent = puntajeMemoria;
    reiniciarTurnoMemoria();
  } else {
    setTimeout(() => {
      tarjeta1.classList.remove("girada");
      tarjeta2.classList.remove("girada");
      tarjeta1.textContent = "?";
      tarjeta2.textContent = "?";
      reiniciarTurnoMemoria();
    }, 1000);
  }
}

function reiniciarTurnoMemoria() {
  tarjeta1 = null;
  tarjeta2 = null;
  bloqueoMemoria = false;
}

// ================== CUESTIONARIO ==================
let puntajeCuestionario = 0;
const preguntasCuestionario = [
  {
    texto: "¿Qué significa TCA?",
    opciones: [
      "Trastornos de Conducta Alimentaria",
      "Trastornos de Crecimiento y Alimentación",
      "Trastornos Cardíacos Asociados"
    ],
    correcta: 0
  },
  {
    texto: "¿Cuál es un síntoma común de la anorexia nerviosa?",
    opciones: [
      "Aumento de peso repentino",
      "Refugio en la comida como mecanismo de afrontamiento",
      "Pérdida de peso extrema"
    ],
    correcta: 2
  },
  {
    texto: "¿Qué es importante para el tratamiento de los TCA?",
    opciones: [
      "Ignorar los síntomas",
      "Ayuda profesional multidisciplinaria",
      "Restringir completamente ciertos alimentos"
    ],
    correcta: 1
  }
];

function inicializarCuestionario() {
  const contenedor = document.querySelector(".cuestionario-contenedor");
  const puntajeTexto = document.querySelector(".resultado-cuestionario span");
  puntajeTexto.textContent = puntajeCuestionario;

  // Crear preguntas
  contenedor.innerHTML = "";
  preguntasCuestionario.forEach((pregunta, indice) => {
    const preguntaDiv = document.createElement("div");
    preguntaDiv.classList.add("pregunta-cuestionario");
    preguntaDiv.innerHTML = <h4>${indice + 1}. ${pregunta.texto}</h4>;

    pregunta.opciones.forEach((opcion, opIndice) => {
      const btn = document.createElement("button");
      btn.classList.add("opcion-cuestionario");
      btn.textContent = opcion;
      btn.addEventListener("click", () => responderPregunta(indice, opIndice));
      preguntaDiv.appendChild(btn);
    });

    contenedor.appendChild(preguntaDiv);
  });

  // Botón reiniciar
  const btnReiniciar = document.createElement("button");
  btnReiniciar.classList.add("reiniciar-cuestionario");
  btnReiniciar.textContent = "Reiniciar Cuestionario";
  btnReiniciar.addEventListener("click", reiniciarCuestionario);
  contenedor.appendChild(btnReiniciar);
}

function responderPregunta(indicePregunta, indiceOpcion) {
  const botones = document.querySelectorAll(.pregunta-cuestionario:nth-child(${indicePregunta + 1}) .opcion-cuestionario);
  botones.forEach(btn => btn.disabled = true);

  if (indiceOpcion === preguntasCuestionario[indicePregunta].correcta) {
    botones[indiceOpcion].style.backgroundColor = "#66BB6A";
    puntajeCuestionario++;
  } else {
    botones[indiceOpcion].style.backgroundColor = "#EF5350";
    botones[preguntasCuestionario[indicePregunta].correcta].style.backgroundColor = "#66BB6A";
  }

  document.querySelector(".resultado-cuestionario span").textContent = puntajeCuestionario;
}

function reiniciarCuestionario() {
  puntajeCuestionario = 0;
  inicializarCuestionario();
}

// ================== INICIALIZAR TODO ==================
document.addEventListener("DOMContentLoaded", () => {
  inicializarMemoria();
  inicializarCuestionario();
});
