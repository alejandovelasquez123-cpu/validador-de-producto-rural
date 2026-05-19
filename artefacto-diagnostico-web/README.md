# Validador de Producción Rural

Mini-solución web creada para la actividad **Semana 9 - Artefacto del entorno: mini-solución de diagnóstico web**.

## Propósito

Validar datos de producción rural antes de guardarlos, detectar errores comunes de entrada y mostrar mensajes de diagnóstico claros para el usuario.

## Estructura

```text
artefacto-diagnostico-web/
├── README.md
├── index.html
├── css/
│   └── styles.css
└── js/
    └── app.js
```

## Funcionalidades

- Captura producto, cantidad, unidad, día de registro y responsable.
- Valida campos vacíos.
- Verifica que la cantidad sea numérica y mayor que cero.
- Muestra mensajes de error, advertencia o éxito.
- Presenta un resumen final del registro cuando es válido.

## Cómo ejecutar

1. Abre la carpeta `artefacto-diagnostico-web`.
2. Ejecuta `index.html` en tu navegador.
3. Opcionalmente usa Live Server desde VS Code.

## Pruebas realizadas

- Registro completo y correcto.
- Producto vacío.
- Cantidad vacía.
- Cantidad con texto.
- Cantidad negativa o en cero.
- Unidad sin seleccionar.
- Fecha vacía.
- Responsable vacío.
- Fecha futura para revisar advertencia.
- Cantidad muy alta para mostrar observación.

## Reflexión final

### 1. ¿Qué error fue más difícil de detectar durante el desarrollo?
El error más difícil fue la validación de la cantidad cuando el dato parecía correcto visualmente, pero en realidad llegaba con formato inválido, por ejemplo con letras o espacios extra.

### 2. ¿Qué herramienta te ayudó más a revisar el funcionamiento del proyecto?
La consola del navegador ayudó mucho para comprobar que la lógica se ejecutara sin errores y para verificar los valores que se enviaban desde el formulario.

### 3. ¿Por qué es importante validar los datos antes de procesarlos?
Porque evita guardar información incorrecta, reduce fallos en los reportes y mejora la confiabilidad del sistema.

### 4. ¿Qué diferencia encontraste entre un error visible y un error lógico?
Un error visible se nota directamente en la interfaz o en la consola, mientras que un error lógico no siempre se ve de inmediato, pero afecta el resultado final aunque el programa siga funcionando.

### 5. ¿Cómo podrías mejorar este artefacto en una siguiente versión?
Podría agregar almacenamiento local, historial de registros, más reglas de validación y una exportación de datos a CSV o PDF.

### 6. ¿Cómo se relaciona esta actividad con la creación de páginas web reales?
Se relaciona porque en proyectos reales también es necesario validar formularios, guiar al usuario con mensajes claros y prevenir datos incorrectos antes de enviarlos a un servidor.

## Herramientas usadas

- HTML
- CSS
- JavaScript
- VS Code
- Navegador web
