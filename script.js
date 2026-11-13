document.addEventListener("DOMContentLoaded", () => {

    // ACTUALIZAR AÑO
    const anio = document.getElementById("anio");

    if (anio) {
        anio.textContent = new Date().getFullYear();
    }

    // DUPLICAR ELEMENTOS DE LAS FRANJAS ANIMADAS
    const pistas = document.querySelectorAll(".pista");

    pistas.forEach((pista) => {
        const elementos = Array.from(pista.children);

        elementos.forEach((elemento) => {
            const copia = elemento.cloneNode(true);
            copia.setAttribute("aria-hidden", "true");
            pista.appendChild(copia);
        });
    });

    // CARRUSEL DE LOS OCHO DOCTORES
    const listaDoctores = document.getElementById("listaDoctores");
    const anteriorDoctor = document.getElementById("doctorAnterior");
    const siguienteDoctor = document.getElementById("doctorSiguiente");
    const contadorDoctores = document.getElementById("contadorDoctores");

    let posicionDoctor = 0;

    const doctores = listaDoctores
        ? Array.from(listaDoctores.children)
        : [];

    function obtenerVisibles() {
        if (window.innerWidth <= 500) return 1;
        if (window.innerWidth <= 750) return 2;
        if (window.innerWidth <= 1050) return 3;
        return 4;
    }

    function actualizarDoctores() {
        if (!listaDoctores || doctores.length === 0) return;

        const visibles = obtenerVisibles();
        const maximo = Math.max(0, doctores.length - visibles);

        posicionDoctor = Math.min(posicionDoctor, maximo);

        const tarjeta = doctores[0];
        const estilos = window.getComputedStyle(listaDoctores);
        const espacio = parseFloat(estilos.gap) || 0;
        const anchoTarjeta = tarjeta.getBoundingClientRect().width;

        const desplazamiento =
            posicionDoctor * (anchoTarjeta + espacio);

        listaDoctores.style.transform =
            `translateX(-${desplazamiento}px)`;

        if (contadorDoctores) {
            contadorDoctores.textContent =
                `Mostrando ${posicionDoctor + 1} - ` +
                `${Math.min(posicionDoctor + visibles, doctores.length)} ` +
                `de ${doctores.length} profesionales`;
        }

        if (anteriorDoctor) {
            anteriorDoctor.disabled = posicionDoctor === 0;
        }

        if (siguienteDoctor) {
            siguienteDoctor.disabled = posicionDoctor >= maximo;
        }
    }

    if (anteriorDoctor) {
        anteriorDoctor.addEventListener("click", () => {
            if (posicionDoctor > 0) {
                posicionDoctor--;
                actualizarDoctores();
            }
        });
    }

    if (siguienteDoctor) {
        siguienteDoctor.addEventListener("click", () => {
            const maximo =
                Math.max(0, doctores.length - obtenerVisibles());

            if (posicionDoctor < maximo) {
                posicionDoctor++;
                actualizarDoctores();
            }
        });
    }

    window.addEventListener("resize", actualizarDoctores);
    actualizarDoctores();

    // GALERÍA DE FOTOGRAFÍAS
    const fotos = [
        "img/galeria1.png",
        "img/galeria2.png",
        "img/galeria3.png",
        "img/galeria4.png"
    ];

    let indiceFoto = 0;

    const foto = document.getElementById("foto");
    const contador = document.getElementById("contador");
    const botonAnterior = document.getElementById("anterior");
    const botonSiguiente = document.getElementById("siguiente");

    function mostrarFoto() {
        if (!foto || !contador) return;

        foto.src = fotos[indiceFoto];
        foto.alt = `Fotografía ${indiceFoto + 1} de mascotas`;
        contador.textContent =
            `Foto ${indiceFoto + 1} de ${fotos.length}`;
    }

    if (botonAnterior) {
        botonAnterior.addEventListener("click", () => {
            indiceFoto =
                (indiceFoto - 1 + fotos.length) % fotos.length;

            mostrarFoto();
        });
    }

    if (botonSiguiente) {
        botonSiguiente.addEventListener("click", () => {
            indiceFoto = (indiceFoto + 1) % fotos.length;
            mostrarFoto();
        });
    }

    mostrarFoto();

    // FECHA MÍNIMA DEL FORMULARIO
    const fecha = document.getElementById("fecha");

    const ahora = new Date();

    const fechaLocal = new Date(
        ahora.getTime() - ahora.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    if (fecha) {
        fecha.min = fechaLocal;
    }

    // FORMULARIO DE CITAS
    const formulario = document.getElementById("formCita");
    const mensaje = document.getElementById("mensaje");

    if (formulario && mensaje) {

        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();

            if (!formulario.checkValidity()) {
                formulario.reportValidity();
                return;
            }

            const dueno =
                document.getElementById("dueno").value.trim();

            const apellido =
                document.getElementById("apellido").value.trim();

            const mascota =
                document.getElementById("mascota").value.trim();

            const servicio =
                document.getElementById("servicio").value;

            const fechaElegida =
                document.getElementById("fecha").value;

            const folio =
                "HUE-" +
                Math.random()
                    .toString(36)
                    .substring(2, 8)
                    .toUpperCase();

            mensaje.textContent =
                `¡Gracias, ${dueno} ${apellido}! ` +
                `La solicitud para ${mascota} ha sido preparada. ` +
                `Servicio: ${servicio}. ` +
                `Fecha solicitada: ${fechaElegida}. ` +
                `Folio: ${folio}. ` +
                `Esta solicitud no representa una cita confirmada.`;

            mensaje.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        });

        formulario.addEventListener("reset", () => {
            mensaje.textContent = "";
        });
    }

});