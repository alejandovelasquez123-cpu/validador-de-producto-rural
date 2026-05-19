const form = document.getElementById('form-produccion');
const resultado = document.getElementById('resultado');
const resumen = document.getElementById('resumen');

const campos = {
  producto: document.getElementById('producto'),
  cantidad: document.getElementById('cantidad'),
  unidad: document.getElementById('unidad'),
  fecha: document.getElementById('fecha'),
  responsable: document.getElementById('responsable'),
};

const camposOrden = ['producto', 'cantidad', 'unidad', 'fecha', 'responsable'];

function limpiarEstadoCampos() {
  camposOrden.forEach((nombre) => {
    campos[nombre].removeAttribute('aria-invalid');
  });
}

function marcarCamposInvalidos(nombres) {
  limpiarEstadoCampos();

  nombres.forEach((nombre) => {
    campos[nombre].setAttribute('aria-invalid', 'true');
  });

  const primerCampo = nombres
    .map((nombre) => campos[nombre])
    .find((campo) => campo);

  if (primerCampo) {
    primerCampo.focus();
  }
}

function limpiarMensajes() {
  resultado.className = 'resultado';
  resultado.innerHTML = '';
  resumen.hidden = true;
  resumen.innerHTML = '';
}

function mostrarMensaje(tipo, titulo, detalle, lista = []) {
  resultado.className = `resultado ${tipo}`;

  const listaHtml = lista.length
    ? `<ul>${lista.map((item) => `<li>${item}</li>`).join('')}</ul>`
    : '';

  resultado.innerHTML = `
    <div class="mensaje ${tipo}">
      <span class="badge ${tipo}">${tipo}</span>
      <h3>${titulo}</h3>
      <p>${detalle}</p>
      ${listaHtml}
    </div>
  `;
}

function mostrarResumen(datos) {
  resumen.hidden = false;
  resumen.innerHTML = `
    <h3>Resumen del registro</h3>
    <div class="resumen-grid">
      <p><strong>Producto</strong>${datos.producto}</p>
      <p><strong>Cantidad</strong>${datos.cantidad}</p>
      <p><strong>Unidad</strong>${datos.unidad}</p>
      <p><strong>Día de registro</strong>${datos.fecha}</p>
      <p><strong>Responsable</strong>${datos.responsable}</p>
    </div>
  `;
}

function capitalizarTexto(valor) {
  return valor
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .replace(/(^|\s)([a-záéíóúñü])/gi, (coincidencia) => coincidencia.toUpperCase());
}

function formatoFecha(valor) {
  const fecha = new Date(`${valor}T00:00:00`);
  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(fecha);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  limpiarMensajes();
  limpiarEstadoCampos();

  const producto = capitalizarTexto(campos.producto.value);
  const cantidadTexto = campos.cantidad.value.trim().replace(',', '.');
  const unidad = campos.unidad.value.trim();
  const fecha = campos.fecha.value;
  const responsable = capitalizarTexto(campos.responsable.value);
  const errores = [];
  const advertencias = [];

  if (!producto) {
    errores.push('El campo producto es obligatorio.');
  }

  if (!cantidadTexto) {
    errores.push('La cantidad no puede quedar vacía.');
  }

  const cantidad = Number(cantidadTexto);
  if (cantidadTexto && Number.isNaN(cantidad)) {
    errores.push('La cantidad debe ser un valor numérico válido.');
  } else if (cantidadTexto && cantidad <= 0) {
    errores.push('La cantidad debe ser mayor que cero.');
  } else if (cantidadTexto && cantidad > 10000) {
    advertencias.push('La cantidad registrada es muy alta. Verifica si el dato es correcto.');
  }

  if (!unidad) {
    errores.push('Debes seleccionar una unidad de medida.');
  }

  if (!fecha) {
    errores.push('Debes indicar el día de registro.');
  } else {
    const fechaRegistro = new Date(`${fecha}T00:00:00`);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaRegistro > hoy) {
      advertencias.push('La fecha registrada es futura. Confirma si fue ingresada correctamente.');
    }
  }

  if (!responsable) {
    errores.push('El responsable del registro es obligatorio.');
  }

  if (errores.length > 0) {
    marcarCamposInvalidos(
      errores.map((mensaje) => {
        if (mensaje.includes('producto')) return 'producto';
        if (mensaje.includes('cantidad')) return 'cantidad';
        if (mensaje.includes('unidad')) return 'unidad';
        if (mensaje.includes('día')) return 'fecha';
        if (mensaje.includes('responsable')) return 'responsable';
        return null;
      }).filter(Boolean)
    );

    mostrarMensaje('error', 'Hay errores que debes corregir', 'El registro no se puede guardar todavía.', errores);
    return;
  }

  const fechaFormateada = formatoFecha(fecha);
  const mensajeBase = advertencias.length > 0
    ? 'El registro es válido, pero hay observaciones que conviene revisar.'
    : 'El registro pasó la validación correctamente.';

  mostrarMensaje(
    advertencias.length > 0 ? 'advertencia' : 'exito',
    advertencias.length > 0 ? 'Validación con observaciones' : 'Validación exitosa',
    mensajeBase,
    advertencias
  );

  mostrarResumen({
    producto,
    cantidad: cantidad.toLocaleString('es-CO'),
    unidad,
    fecha: fechaFormateada,
    responsable,
  });
});

form.addEventListener('reset', () => {
  limpiarMensajes();
  limpiarEstadoCampos();
  setTimeout(() => {
    resultado.className = 'resultado empty';
    resultado.innerHTML = '<p>Completa los datos y presiona <strong>Validar registro</strong>.</p>';
  }, 0);
});
