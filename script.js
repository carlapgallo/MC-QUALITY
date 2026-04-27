var nivel = "";
var instructor = "";
var paquete = "";
var precio = "";

var opcionesNivel = document.querySelectorAll(".opcion");
var resumen = document.querySelector(".resumen");

opcionesNivel.forEach(function(opcion) {
  opcion.addEventListener("click", function() {
    opcionesNivel.forEach(function(item) {
      item.classList.remove("seleccionado");
    });

    opcion.classList.add("seleccionado");

    nivel = opcion.querySelector("h4").innerText;
    alert("Nivel seleccionado: " + nivel);
  });
});

var botonesReserva = document.querySelectorAll(".plan button");

botonesReserva.forEach(function(boton) {
  boton.addEventListener("click", function() {
    var plan = boton.parentElement;

    paquete = plan.querySelector("h3").innerText;
    precio = plan.querySelector("h4").innerText;

    document.getElementById("reserva").scrollIntoView({
      behavior: "smooth"
    });

    alert("Paquete seleccionado: " + paquete);
  });
});

var botonPago = document.querySelector(".boton-pago");

botonPago.addEventListener("click", function() {
  var nombre = document.querySelector('input[placeholder="Tu nombre"]').value;
  var email = document.querySelector('input[placeholder="tu@email.com"]').value;
  var telefono = document.querySelector('input[placeholder="+57 300 000 0000"]').value;

  if (nombre == "" || email == "" || telefono == "") {
    alert("Por favor completa todos los campos");
  } else {
    if (nivel == "") {
      nivel = "Principiante";
    }

    if (instructor == "") {
      instructor = "Pablo";
    }

    if (paquete == "") {
      paquete = "Clase Sencilla";
      precio = "$90,000";
    }

    document.querySelector(".confirmacion").style.display = "block";

    document.querySelector(".detalle").innerHTML = `
      <h3>Detalles de la Reserva</h3>
      <p><b>Nombre:</b> ${nombre}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Teléfono:</b> ${telefono}</p>
      <p><b>Nivel:</b> ${nivel}</p>
      <p><b>Instructor:</b> ${instructor}</p>
      <p><b>Paquete:</b> ${paquete}</p>
      <p><b>Total:</b> ${precio} COP</p>
      <p><b>Número de confirmación:</b> #MC${Math.floor(Math.random() * 9000 + 1000)}</p>
    `;

    document.querySelector(".confirmacion").scrollIntoView({
      behavior: "smooth"
    });
  }
});

var botonOtraReserva = document.querySelector(".confirmacion button");

botonOtraReserva.addEventListener("click", function() {
  location.reload();
});
