// JUEGO DE MEMORIA
const terminosMemoria = [
  "Anorexia", "Pérdida peso",
  "Bulimia", "Atracón-purgación",
  "Binge Eating", "Comer en exceso",
  "RATCA", "Red de ayuda",
  "Autoestima", "Relacionada con TCA",
  "Nutrición", "Alimentación saludable",
  "Psicólogo", "Profesional ayuda",
  "Adolescencia", "Etapa de riesgo"
];

let tarjetas = [];
let tarjeta1 = null;
let tarjeta2 = null;
let bloqueo = false;
let puntajeMemoria = 0;

function iniciarMemoria() {
  const tablero = document.querySelector(".tablero-memoria");
  tablero.innerHTML = "";
  puntajeMemoria = 0;
  document.querySelector(".puntaje-memoria span").textContent = puntajeMemoria;

  // Mezclar términos
  const terminosMezclados = [...terminosMemoria].sort(() => Math.random() - 0.5);

  terminosMezclados.forEach(termino => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-memoria");
    tarjeta.dataset.termino = termino;
    tarjeta.textContent = "";
    tarjeta.addEventListener("click", girarTarjeta);
    tablero.appendChild(tarjeta);
    tarjetas.push(tarjeta);
  });
}

function girarTarjeta(e) {
  const tarjeta = e.target;

  if (bloqueo || tarjeta === tarjeta1 || tarjeta.classList.contains("encontrada")) return;

  tarjeta.classList.add("girada");
  tarjeta.textContent = tarjeta.dataset.termino;

  if (!tarjeta1) {
    tarjeta1 = tarjeta;
    return;
  }

  tarjeta2 = tarjeta;
  bloqueo = true;

  if (tarjeta1.dataset.termino !== tarjeta2.dataset.termino) {
    setTimeout(() => {
      tarjeta1.classList.remove("girada");
      tarjeta2.classList.remove("girada");
      tarjeta1.textContent = "";
      tarjeta2.textContent = "";
      tarjeta1 = null;
      tarjeta2 = null;
      bloqueo = false;
    }, 1000);
  } else {
    setTimeout(() => {
      tarjeta1.classList.add("encontrada");
      tarjeta2.classList.add("encontrada");
      tarjeta1 = null;
      tarjeta2 = null;
      bloqueo = false;
      puntajeMemoria += 10;
      document.querySelector(".puntaje-memoria span").textContent = puntajeMemoria;
    }, 500);
  }
}


// CUESTIONARIO INTERACTIVO
const preguntasCuestionario = [
  {
    pregunta: "¿Cuál es el número de línea de ayuda psicológica gratuita del Ministerio de Salud Pública?",
    opciones: [
      "1800-10-1010",
      "1800-20-2020",
      "1800-30-3030"
    ],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Qué significa RATCA?",
    opciones: [
      "Red de Atención a Trastornos de Conducta Alimentaria",
      "Red de Atención a Trastornos Cardíacos",
      "Red de Ayuda a Trastornos de Ansiedad"
    ],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Cuál de estas es una característica de la bulimia?",
    opciones: [
      "Pérdida extrema de peso sin comer",
      "Episodios de atracón seguidos de purgas",
      "Comer en exceso sin control pero sin purgas"
    ],
    respuestaCorrecta: 1
  },
  {
    pregunta: "¿Qué aplicación móvil ofrece información sobre TCA en Ecuador?",
    opciones: [
      "Salud Adulto EC",
      "Salud Adolescente EC",
      "Salud Infantil EC"
    ],
    respuestaCorrecta: 1
  }
];

let puntajeCuestionario = 0;

function iniciarCuestionario() {
  const contenedor = document.querySelector(".cuestionario-contenedor");
  contenedor.innerHTML = "";
  puntajeCuestionario = 0;
  document.querySelector(".resultado-cuestionario span:first-child").textContent = puntajeCuestionario;
  document.querySelector(".resultado-cuestionario span:last-child").textContent = preguntasCuestionario.length;

  preguntasCuestionario.forEach((pregunta, indice) => {
    const divPregunta = document.createElement("div");
    divPregunta.classList.add("pregunta-cuestionario");
    divPregunta.innerHTML = <p><strong>${indice + 1}. ${pregunta.pregunta}</strong></p>;

    const divOpciones = document.createElement("div");
    divOpciones.classList.add("opciones-cuestionario");

    pregunta.opciones.forEach((opcion, i) => {
  const input = document.createElement("input");
  input.type = "radio";
  input.name = pregunta-${indice};
  input.value = i;
  input.addEventListener("change", () => verificarRespuesta(indicePregunta, i));

  const label = document.createElement("label");
  label.textContent = opcion;
  label.prepend(input);

  divOpciones.appendChild(label);
});

    divPregunta.appendChild(divOpciones);
    contenedor.appendChild(divPregunta);
  });
}

function verificarRespuesta(indicePregunta, indiceRespuesta) {
  if (indiceRespuesta === preguntasCuestionario[indicePregunta].respuestaCorrecta) {
    puntajeCuestionario++;
  }
  document.querySelector(".resultado-cuestionario span:first-child").textContent = puntajeCuestionario;
}

function reiniciarCuestionario() {
  iniciarCuestionario();
}

// Iniciar juegos cuando cargue la página
window.addEventListener("load", () => {
  iniciarMemoria();
  iniciarCuestionario();
});
