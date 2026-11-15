// ============================================================
// LABORATORIO JAVASCRIPT
// Contiene la lógica de los cuatro ejercicios solicitados.
// ============================================================

"use strict";

// Devuelve el elemento HTML cuyo identificador se indica.
const obtenerElemento = (id) => document.getElementById(id);

// Muestra un mensaje y aplica una clase visual según el resultado.
function mostrarResultado(id, mensaje, tipo = "normal") {
  const elemento = obtenerElemento(id);
  elemento.textContent = mensaje;
  elemento.className = "result";

  if (tipo === "correcto") elemento.classList.add("success");
  if (tipo === "error") elemento.classList.add("error");
}

// EJERCICIO 1: detectar palíndromos.
function comprobarPalindromo() {
  const textoOriginal = obtenerElemento("palindrome-input").value.trim();

  if (!textoOriginal) {
    mostrarResultado("palindrome-result", "Introduce una palabra o frase.", "error");
    return;
  }

  // Normalizamos: minúsculas, sin tildes y solo letras o números.
  const textoLimpio = textoOriginal
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");

  if (!textoLimpio) {
    mostrarResultado("palindrome-result", "No hay letras ni números que comprobar.", "error");
    return;
  }

  const textoInvertido = [...textoLimpio].reverse().join("");
  const esPalindromo = textoLimpio === textoInvertido;

  mostrarResultado(
    "palindrome-result",
    esPalindromo
      ? `«${textoOriginal}» sí es un palíndromo.`
      : `«${textoOriginal}» no es un palíndromo.`,
    esPalindromo ? "correcto" : "normal"
  );
}

// EJERCICIO 2: comparar dos números.
function compararNumeros() {
  const valorUno = obtenerElemento("number-one").value.trim();
  const valorDos = obtenerElemento("number-two").value.trim();

  if (valorUno === "" || valorDos === "") {
    mostrarResultado("compare-result", "Debes introducir los dos números.", "error");
    return;
  }

  const numeroUno = Number(valorUno);
  const numeroDos = Number(valorDos);

  if (!Number.isFinite(numeroUno) || !Number.isFinite(numeroDos)) {
    mostrarResultado("compare-result", "Introduce dos números válidos.", "error");
    return;
  }

  let mensaje;
  if (numeroUno > numeroDos) {
    mensaje = `${numeroUno} es mayor que ${numeroDos}.`;
  } else if (numeroDos > numeroUno) {
    mensaje = `${numeroDos} es mayor que ${numeroUno}.`;
  } else {
    mensaje = `Los dos números son iguales (${numeroUno}).`;
  }

  mostrarResultado("compare-result", mensaje, "correcto");
}

// Función auxiliar: normaliza tildes para tratar á, é, í, ó y ú
// como sus vocales correspondientes.
function normalizarTexto(texto) {
  return texto.toLocaleLowerCase("es").normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// EJERCICIO 3: mostrar las vocales que aparecen, sin duplicados.
function encontrarVocales() {
  const frase = obtenerElemento("vowels-input").value.trim();

  if (!frase) {
    mostrarResultado("vowels-result", "Escribe una frase para buscar sus vocales.", "error");
    return;
  }

  const coincidencias = normalizarTexto(frase).match(/[aeiou]/g) || [];
  const vocalesUnicas = [...new Set(coincidencias)];

  mostrarResultado(
    "vowels-result",
    vocalesUnicas.length
      ? `Vocales encontradas: ${vocalesUnicas.join(", ").toUpperCase()}`
      : "La frase no contiene vocales.",
    vocalesUnicas.length ? "correcto" : "normal"
  );
}

// EJERCICIO 4: contar cuántas veces aparece cada vocal.
function contarVocales() {
  const frase = obtenerElemento("count-vowels-input").value.trim();

  if (!frase) {
    mostrarResultado("count-vowels-result", "Escribe una frase para contar sus vocales.", "error");
    return;
  }

  const texto = normalizarTexto(frase);
  const conteo = { a: 0, e: 0, i: 0, o: 0, u: 0 };

  for (const caracter of texto) {
    if (Object.hasOwn(conteo, caracter)) {
      conteo[caracter]++;
    }
  }

  const total = Object.values(conteo).reduce((suma, cantidad) => suma + cantidad, 0);
  const detalle = Object.entries(conteo)
    .map(([vocal, cantidad]) => `${vocal.toUpperCase()}: ${cantidad}`)
    .join("  ·  ");

  mostrarResultado(
    "count-vowels-result",
    `${detalle}\nTotal de vocales: ${total}`,
    total > 0 ? "correcto" : "normal"
  );
}

// Conectamos los botones con sus funciones cuando el HTML ya está cargado.
document.addEventListener("DOMContentLoaded", () => {
  obtenerElemento("palindrome-button").addEventListener("click", comprobarPalindromo);
  obtenerElemento("compare-button").addEventListener("click", compararNumeros);
  obtenerElemento("vowels-button").addEventListener("click", encontrarVocales);
  obtenerElemento("count-vowels-button").addEventListener("click", contarVocales);

  // Permite ejecutar los ejercicios pulsando Enter en los campos de texto.
  obtenerElemento("palindrome-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") comprobarPalindromo();
  });
  obtenerElemento("vowels-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") encontrarVocales();
  });
  obtenerElemento("count-vowels-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") contarVocales();
  });
});
