# Laboratorio JavaScript y AJAX

Proyecto académico para la asignatura Desarrollo de Aplicaciones en Red.

## Estructura
- `index.html`: estructura y contenido de la interfaz.
- `css/styles.css`: presentación visual adaptable.
- `js/javascript.js`: lógica de los cuatro ejercicios JavaScript.
- `js/ajax.js`: petición HTTP mediante XMLHttpRequest y visualización de la respuesta.



## Pruebas sugeridas
- Palíndromo: `Dábale arroz a la zorra el abad`.
- Comparación: `12` y `8`; después prueba `5` y `5`.
- Encontrar vocales: `Desarrollo web`.
- Contar vocales: `Hola, ¿cómo estás?`.

## AJAX
Al cargar la página, el campo de URL se rellena con la dirección actual.
Pulsa **Mostrar contenidos** para realizar una petición GET. Si la página se sirve
mediante Live Server, la petición a la propia URL permite observar la respuesta HTML
si el servidor y el navegador lo permiten.

Para consultar otros dominios, el servidor remoto debe permitir CORS. El navegador
también limita qué cabeceras de respuesta pueden ser consultadas desde JavaScript.

