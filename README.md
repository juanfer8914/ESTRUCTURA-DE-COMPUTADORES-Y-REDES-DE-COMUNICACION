# Arquitectura, Redes y Ciberdelitos

Sitio académico interactivo sobre arquitectura de computadores, redes de comunicaciones y su aplicación en la investigación forense digital.

## Estructura

- `index.html`: contenido semántico, navegación y módulos académicos.
- `css/styles.css`: sistema visual responsive, tema oscuro y estilos de impresión.
- `js/script.js`: interacciones, navegación, persistencia del tema, animaciones y exportación.

## Ejecutar en Codespaces

Abre `index.html` con la extensión Live Server o ejecuta un servidor local desde la raíz:

```bash
python3 -m http.server 8000
```

Después abre el puerto 8000 en el navegador. La biblioteca `html2pdf.js` se carga desde CDN; si no está disponible, el botón de exportación utiliza el diálogo de impresión del navegador.

## Probar funciones

- **Tema:** pulsa `Tema oscuro`, recarga la página y comprueba que la preferencia permanece.
- **PDF:** pulsa `Exportar PDF` y verifica el archivo `arquitectura-redes-ciberdelitos.pdf`.
- **Interacciones:** selecciona componentes de CPU, fases del ciclo, niveles de memoria, direcciones y topologías.