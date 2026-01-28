// =============================================
// JUEGO DE MEMORIA: TÉRMINOS SOBRE TCA
// =============================================
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

let tarjeta1 = null;
let tarjeta2 = null;
let bloqueo = false;
let puntajeMemoria = 0;

// Función para mezclar elementos
function mezclarArray(array) {
  let nuevoArray = [];
  let arrayTemp = [...array];
  while (arrayTemp.length > 0) {
    let indiceAleatorio = Math.floor(Math.random() * arrayTemp.length);
    nuevoArray.push(arrayTemp[indiceAleatorio]);
    arrayTemp.splice(indiceAleatorio, 1);
  }
  return nuevoArray;
}

// Función para iniciar el juego de memoria
function iniciarMemoria() {
  const tablero = document.querySelector(".tablero-memoria");
  tablero.innerHTML = "";
  puntajeMemoria = 0;
  document.querySelector(".puntaje-memoria span").textContent = puntajeMemoria;

  const terminosDuplicados = [...terminosMemoria, ...terminosMemoria];
  const terminosMezclados = mezclarArray(terminosDuplicados);

  for (let i = 0; i < terminosMezclados.length; i++) {
    const termino = terminosMezclados[i];
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-memoria");
    tarjeta.dataset.termino = termino;
    tarjeta.textContent = "?";
    tarjeta.onclick = girarTarjeta;
    tablero.appendChild(tarjeta);
  }
}

// Función para girar tarjetas
function girarTarjeta() {
  const tarjeta = this;

  if (bloqueo || tarjeta === tarjeta1 || tarjeta.classList.contains("encontrada")) {
    return;
  }

  tarjeta.classList.add("girada");
  tarjeta.textContent = tarjeta.dataset.termino.split('').reverse().join('');
  if (!tarjeta1) {
    tarjeta1 = tarjeta;
    return;
  }

  tarjeta2 = tarjeta;
  bloqueo = true;
  verificarPareja();
}

// Función para verificar si las tarjetas son pareja
function verificarPareja() {
  const indice1 = terminosMemoria.indexOf(tarjeta1.dataset.termino);
  const indice2 = terminosMemoria.indexOf(tarjeta2.dataset.termino);
  let esPareja = false;

  if ((indice1 % 2 === 0 && indice2 === indice1 + 1) || (indice2 % 2 === 0 && indice1 === indice2 + 1)) {
    esPareja = true;
  }

  if (esPareja) {
    mantenerTarjetas();
  } else {
    volverTarjetas();
  }
}

// Función si son pareja
function mantenerTarjetas() {
  tarjeta1.classList.add("encontrada");
  tarjeta2.classList.add("encontrada");
  puntajeMemoria++;
  document.querySelector(".puntaje-memoria span").textContent = puntajeMemoria;
  reiniciarTurno();
}

// Función si no son pareja
function volverTarjetas() {
  setTimeout(function() {
    tarjeta1.classList.remove("girada");
    tarjeta2.classList.remove("girada");
    tarjeta1.textContent = "?";
    tarjeta2.textContent = "?";
    reiniciarTurno();
  }, 1000);
}

// Función para reiniciar turno
function reiniciarTurno() {
  tarjeta1 = null;
  tarjeta2 = null;
  bloqueo = false;
}


// =============================================
// CUESTIONARIO: ¿QUÉ SABES SOBRE LOS TCA?
// =============================================
const preguntasCuestionario = [
  {
    pregunta: "¿Cuál es el trastorno caracterizado por restricción alimentaria y pérdida de peso extrema?",
    opciones: ["Bulimia Nerviosa", "Anorexia Nerviosa", "Binge Eating Disorder", "RATCA"],
    respuestaCorrecta: 1
  },
  {
    pregunta: "¿Qué significa la sigla RATCA?",
    opciones: ["Red de Apoyo a Trastornos de Conducta Alimentaria", "Registro de Atención a Trastornos Crónicos", "Riesgo Alto de Trastornos Alimentarios", "Ninguna de las anteriores"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿En qué etapa de la vida es más común el inicio de los TCA?",
    opciones: ["Infancia", "Adolescencia", "Adultez mayor", "Niñez temprana"],
    respuestaCorrecta: 1
  }
];

let puntajeCuestionario = 0;

// Función para generar el cuestionario
function generarCuestionario() {
  const contenedorPreguntas = document.querySelector(".cuestionario-contenedor");
  contenedorPreguntas.innerHTML = "";

  for (let indice = 0; indice < preguntasCuestionario.length; indice++) {
    const pregunta = preguntasCuestionario[indice];
    const divPregunta = document.createElement("div");
    divPregunta.className = "pregunta-cuestionario";
    divPregunta.innerHTML = "<h4>" + (indice + 1) + ". " + pregunta.pregunta + "</h4>";
    
    const divOpciones = document.createElement("div");
    divOpciones.className = "opciones-cuestionario";
    
    for (let i = 0; i < pregunta.opciones.length; i++) {
      const opcion = pregunta.opciones[i];
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "pregunta-" + indice;
      input.value = i;
      input.id = "opcion" + indice + i;
      
      const label = document.createElement("label");
      label.htmlFor = "opcion" + indice + i;
      label.textContent = opcion;
      
      input.onchange = function() {
        verificarRespuesta(indice, i);
      };
      
      divOpciones.appendChild(input);
      divOpciones.appendChild(label);
      divOpciones.appendChild(document.createElement("br"));
    }
    
    divPregunta.appendChild(divOpciones);
    contenedorPreguntas.appendChild(divPregunta);
  }
}

// Función para verificar respuestas
function verificarRespuesta(indicePregunta, indiceRespuesta) {
  if (indiceRespuesta === preguntasCuestionario[indicePregunta].respuestaCorrecta) {
    puntajeCuestionario++;
  }
  document.querySelector(".resultado-cuestionario span").textContent = puntajeCuestionario;
}

// Función para reiniciar el cuestionario
function reiniciarCuestionario() {
  puntajeCuestionario = 0;
  document.querySelector(".resultado-cuestionario span").textContent = 0;
  const inputs = document.querySelectorAll('input[type="radio"]');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].checked = false;
  }
}


// =============================================
// CARGAR TODO CUANDO LA PÁGINA ESTÉ LISTA
// =============================================
function cargarJuegos() {
  // Agregar botón de inicio al juego de memoria
  const btnIniciar = document.createElement("button");
  btnIniciar.textContent = "Iniciar Juego de Memoria";
  btnIniciar.onclick = iniciarMemoria;
  const contenedorMemoria = document.querySelector(".juego-contenedor");
  const tablero = document.querySelector(".tablero-memoria");
  contenedorMemoria.insertBefore(btnIniciar, tablero);

  // Generar el cuestionario automáticamente
  generarCuestionario();
}

// Cargar cuando la página esté lista
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", cargarJuegos);
} else {
  cargarJuegos();
}
