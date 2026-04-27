// ── Estado de la reserva ──────────────────────────────
    const reserva = {
      nivel: '',
      instructor: '',
      paquete: '',
      precio: '',
      nombre: '',
      email: '',
      telefono: ''
    };

    let pasoActual = 1;
    const totalPasos = 5;

    // ── Opciones seleccionables ───────────────────────────
    document.querySelectorAll('#panel-1 .opcion').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('#panel-1 .opcion').forEach(o => o.classList.remove('seleccionado'));
        el.classList.add('seleccionado');
        reserva.nivel = el.dataset.valor;
        document.getElementById('error-nivel').style.display = 'none';
      });
    });

    document.querySelectorAll('.instructor-card').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.instructor-card').forEach(o => o.classList.remove('seleccionado'));
        el.classList.add('seleccionado');
        reserva.instructor = el.dataset.valor;
        document.getElementById('error-instructor').style.display = 'none';
      });
    });

    document.querySelectorAll('#panel-3 .opcion').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('#panel-3 .opcion').forEach(o => o.classList.remove('seleccionado'));
        el.classList.add('seleccionado');
        reserva.paquete = el.dataset.valor;
        reserva.precio = el.dataset.precio;
        document.getElementById('error-paquete').style.display = 'none';
      });
    });

    // Botones "Seleccionar plan" desde la sección de servicios
    document.querySelectorAll('.btn-plan').forEach(btn => {
      btn.addEventListener('click', () => {
        const plan = btn.closest('.plan');
        reserva.paquete = plan.dataset.paquete;
        reserva.precio = plan.dataset.precio;
        document.getElementById('reserva').scrollIntoView({ behavior: 'smooth' });
        // Pre-seleccionar en panel 3
        setTimeout(() => {
          document.querySelectorAll('#panel-3 .opcion').forEach(op => {
            op.classList.toggle('seleccionado', op.dataset.valor === reserva.paquete);
          });
          irAPaso(3);
        }, 600);
      });
    });

    // ── Navegación de pasos ───────────────────────────────
    function actualizarProgress(paso) {
      for (let i = 1; i <= totalPasos; i++) {
        const p = document.getElementById(`paso-${i}`);
        p.classList.remove('activo', 'completado');
        if (i < paso) p.classList.add('completado');
        else if (i === paso) p.classList.add('activo');
      }
      for (let i = 1; i < totalPasos; i++) {
        const l = document.getElementById(`linea-${i}`);
        l.classList.toggle('completada', i < paso);
      }
    }

    function irAPaso(num) {
      document.querySelectorAll('.panel').forEach(p => p.classList.remove('activo'));
      document.getElementById(`panel-${num}`).classList.add('activo');
      pasoActual = num;
      actualizarProgress(num);
    }

    function avanzar(desde) {
      // Validaciones por paso
      if (desde === 1) {
        if (!reserva.nivel) {
          document.getElementById('error-nivel').style.display = 'block';
          return;
        }
      }
      if (desde === 2) {
        if (!reserva.instructor) {
          document.getElementById('error-instructor').style.display = 'block';
          return;
        }
      }
      if (desde === 3) {
        if (!reserva.paquete) {
          document.getElementById('error-paquete').style.display = 'block';
          return;
        }
      }
      if (desde === 4) {
        let valido = true;
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();

        document.getElementById('nombre').classList.remove('error');
        document.getElementById('email').classList.remove('error');
        document.getElementById('telefono').classList.remove('error');
        document.getElementById('err-nombre').style.display = 'none';
        document.getElementById('err-email').style.display = 'none';
        document.getElementById('err-telefono').style.display = 'none';

        if (!nombre) {
          document.getElementById('nombre').classList.add('error');
          document.getElementById('err-nombre').style.display = 'block';
          valido = false;
        }
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
          document.getElementById('email').classList.add('error');
          document.getElementById('err-email').style.display = 'block';
          valido = false;
        }
        if (!telefono) {
          document.getElementById('telefono').classList.add('error');
          document.getElementById('err-telefono').style.display = 'block';
          valido = false;
        }
        if (!valido) return;

        reserva.nombre = nombre;
        reserva.email = email;
        reserva.telefono = telefono;

        // Llenar resumen
        document.getElementById('res-nombre').textContent = reserva.nombre;
        document.getElementById('res-email').textContent = reserva.email;
        document.getElementById('res-tel').textContent = reserva.telefono;
        document.getElementById('res-nivel').textContent = reserva.nivel;
        document.getElementById('res-instructor').textContent = reserva.instructor;
        document.getElementById('res-paquete').textContent = reserva.paquete;
        document.getElementById('res-total').textContent = reserva.precio + ' COP';
      }

      irAPaso(desde + 1);
      window.scrollTo({ top: document.getElementById('reserva').offsetTop - 80, behavior: 'smooth' });
    }

    function retroceder(desde) {
      irAPaso(desde - 1);
      window.scrollTo({ top: document.getElementById('reserva').offsetTop - 80, behavior: 'smooth' });
    }

    function confirmarReserva() {
      const confirmacion = document.getElementById('confirmacion');
      const detalle = document.getElementById('detalle-confirmacion');
      const num = '#MC' + Math.floor(Math.random() * 9000 + 1000);

      detalle.innerHTML = `
        <h3>Detalles de la Reserva</h3>
        <div class="detalle-row"><span>Nombre</span><span>${reserva.nombre}</span></div>
        <div class="detalle-row"><span>Email</span><span>${reserva.email}</span></div>
        <div class="detalle-row"><span>Teléfono</span><span>${reserva.telefono}</span></div>
        <div class="detalle-row"><span>Nivel</span><span>${reserva.nivel}</span></div>
        <div class="detalle-row"><span>Instructor</span><span>${reserva.instructor}</span></div>
        <div class="detalle-row"><span>Paquete</span><span>${reserva.paquete}</span></div>
        <div class="detalle-row"><span>Total pagado</span><span><strong>${reserva.precio} COP</strong></span></div>
        <div class="detalle-row"><span>Confirmación</span><span style="color:var(--verde);font-weight:600">${num}</span></div>
      `;

      document.getElementById('reserva').style.display = 'none';
      confirmacion.style.display = 'block';
      confirmacion.scrollIntoView({ behavior: 'smooth' });
    }
