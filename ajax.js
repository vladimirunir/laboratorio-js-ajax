// ============================================================
// LABORATORIO AJAX
// Peticiones HTTP asíncronas mediante XMLHttpRequest.
// ============================================================

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const urlInput = document.getElementById("ajax-url");
  const sendButton = document.getElementById("ajax-send");
  const clearButton = document.getElementById("ajax-clear");

  const stateOutput = document.getElementById("ajax-state");
  const readyStateOutput = document.getElementById("ajax-ready-state");
  const contentOutput = document.getElementById("ajax-content");
  const headersOutput = document.getElementById("ajax-headers");
  const statusCodeOutput = document.getElementById("ajax-status-code");
  const statusTextOutput = document.getElementById("ajax-status-text");
  const indicatorOutput = document.getElementById("ajax-indicator");

  let peticionActual = null;

  // AJAX 1: al cargar, mostrar la URL de la página actual.
  urlInput.value = window.location.href;

  const nombresEstados = {
    0: "No iniciada",
    1: "Conectando",
    2: "Cabeceras recibidas",
    3: "Recibiendo contenido",
    4: "Petición completada"
  };

  function actualizarEstado(readyState) {
    stateOutput.textContent = nombresEstados[readyState] || "Estado desconocido";
    readyStateOutput.textContent = `readyState: ${readyState}`;
  }

  function limpiarResultados() {
    contentOutput.textContent = "Aquí aparecerá el contenido devuelto por el servidor.";
    headersOutput.textContent = "Las cabeceras aparecerán cuando el servidor responda.";
    statusCodeOutput.textContent = "—";
    statusTextOutput.textContent = "Todavía no se ha realizado ninguna petición.";
    indicatorOutput.textContent = "En espera";
    actualizarEstado(0);
  }

  function mostrarError(mensaje) {
    contentOutput.textContent = mensaje;
    indicatorOutput.textContent = "Error";
    indicatorOutput.style.color = "#b54747";
  }

  // AJAX 2, 3, 4 y 5: solicitar y mostrar la respuesta HTTP.
  function mostrarContenidos() {
    const direccion = urlInput.value.trim();

    if (!direccion) {
      mostrarError("Introduce una URL antes de iniciar la petición.");
      stateOutput.textContent = "URL no válida";
      return;
    }

    let urlValidada;
    try {
      urlValidada = new URL(direccion);
      if (!["http:", "https:"].includes(urlValidada.protocol)) {
        throw new Error("El protocolo debe ser HTTP o HTTPS.");
      }
    } catch (error) {
      mostrarError("La dirección introducida no es una URL HTTP o HTTPS válida.");
      stateOutput.textContent = "URL no válida";
      return;
    }

    // Si había una petición anterior, la cancelamos antes de iniciar otra.
    if (peticionActual && peticionActual.readyState !== XMLHttpRequest.DONE) {
      peticionActual.abort();
    }

    const xhr = new XMLHttpRequest();
    peticionActual = xhr;

    contentOutput.textContent = "Preparando petición...";
    headersOutput.textContent = "Esperando las cabeceras de respuesta...";
    statusCodeOutput.textContent = "—";
    statusTextOutput.textContent = "Esperando respuesta del servidor...";
    indicatorOutput.textContent = "En curso";
    indicatorOutput.style.color = "";

    // Se actualiza la interfaz cada vez que cambia readyState.
    xhr.onreadystatechange = function () {
      actualizarEstado(xhr.readyState);

      // readyState 4 significa que la operación terminó.
      if (xhr.readyState === XMLHttpRequest.DONE) {
        contentOutput.textContent = xhr.responseText || "(La respuesta no contiene texto.)";

        // AJAX 4: todas las cabeceras HTTP que el navegador permite consultar.
        headersOutput.textContent =
          xhr.getAllResponseHeaders() || "(No hay cabeceras accesibles.)";

        // AJAX 5: código y texto de estado HTTP.
        statusCodeOutput.textContent = String(xhr.status);
        statusTextOutput.textContent = xhr.statusText || "Sin descripción";

        if (xhr.status >= 200 && xhr.status < 300) {
          indicatorOutput.textContent = "Respuesta correcta";
          indicatorOutput.style.color = "#137b58";
        } else if (xhr.status === 0) {
          indicatorOutput.textContent = "Sin respuesta HTTP";
          indicatorOutput.style.color = "#b54747";
          contentOutput.textContent =
            "No se pudo leer una respuesta HTTP. Comprueba la conexión, la URL y los permisos CORS.";
        } else {
          indicatorOutput.textContent = "Respuesta con error HTTP";
          indicatorOutput.style.color = "#b7791f";
        }
      }
    };

    // Error de red o bloqueo del navegador (por ejemplo, CORS).
    xhr.onerror = function () {
      stateOutput.textContent = "Error de red o CORS";
      mostrarError("No se pudo acceder a la respuesta. Comprueba la conexión y si el servidor permite CORS.");
      statusCodeOutput.textContent = String(xhr.status);
      statusTextOutput.textContent = xhr.statusText || "Error de red";
    };

    xhr.ontimeout = function () {
      stateOutput.textContent = "Tiempo de espera agotado";
      mostrarError("La petición ha superado el tiempo máximo de espera.");
    };

    xhr.onabort = function () {
      stateOutput.textContent = "Petición cancelada";
      indicatorOutput.textContent = "Cancelada";
    };

    xhr.timeout = 15000;
    xhr.open("GET", urlValidada.href, true);
    xhr.send();
  }

  sendButton.addEventListener("click", mostrarContenidos);

  urlInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") mostrarContenidos();
  });

  clearButton.addEventListener("click", () => {
    if (peticionActual && peticionActual.readyState !== XMLHttpRequest.DONE) {
      peticionActual.abort();
    }
    limpiarResultados();
  });
});
