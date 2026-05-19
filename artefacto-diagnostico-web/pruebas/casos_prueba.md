# Casos de prueba

| Caso | Entrada | Resultado esperado |
| --- | --- | --- |
| 1 | Datos completos y válidos | Mensaje de éxito y resumen del registro |
| 2 | Producto vacío | Error indicando que el producto es obligatorio |
| 3 | Cantidad vacía | Error indicando que la cantidad no puede quedar vacía |
| 4 | Cantidad con texto | Error indicando que la cantidad debe ser numérica |
| 5 | Cantidad en cero | Error indicando que debe ser mayor que cero |
| 6 | Unidad sin seleccionar | Error indicando que debe elegir una unidad |
| 7 | Fecha vacía | Error indicando que debe indicar el día de registro |
| 8 | Responsable vacío | Error indicando que el responsable es obligatorio |
| 9 | Fecha futura | Advertencia con observación sobre la fecha |
| 10 | Cantidad muy alta | Advertencia con observación sobre la cantidad |
