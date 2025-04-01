$(function () {
    const servicesData = [
        { img: "https://fotos-subinails.s3.us-east-1.amazonaws.com/imagenes/servicios/unasacrilicas.webp", title: "UÃ±as AcrÃ­licas", price: "Desde $50", direccion: "unasacrilicas" },
        { img: "https://fotos-subinails.s3.us-east-1.amazonaws.com/imagenes/servicios/unasgel.webp", title: "UÃ±as de Gel", price: "Desde $30", direccion: "unasgel" },
        { img: "https://fotos-subinails.s3.us-east-1.amazonaws.com/imagenes/servicios/manicurarusa.webp", title: "Manicura Rusa", price: "Desde $40", direccion: "manicurarusa" },
        { img: "https://fotos-subinails.s3.us-east-1.amazonaws.com/imagenes/servicios/decoracion3d.webp", title: "DecoraciÃ³n 3D", price: "Desde $70", direccion: "decoracion3d" }
    ];

    const $servicesContainer = $("#services-container");

    $.each(servicesData, function (index, service) {
        const serviceElement = `
            <div class="service">
                <img src="${service.img}" alt="${service.title}">
                <div class="service-info">
                    <h3>${service.title}</h3>
                    <p class="price">${service.price}</p>
                </div>
                <div>
                    <a class="learn-more" href="servicios/${service.direccion}.html">
                        <span class="circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                        </span>
                        <span class="button-text">Leer mÃ¡s</span>
                    </a>
                </div>
            </div>
        `;
        $servicesContainer.append(serviceElement);
    });

    // Funcion que hace que sea visible el menu en escritorio 
    function ajustarMenu() {
        if ($(window).width() > 750) {
            $("#nav").css("display", "block"); // Asegurar que el menÃº sea visible en escritorio
        } else {
            $("#nav").css("display", "none"); // Ocultar menÃº en mÃ³vil
        }
    }

    // Detectar cambios de tamaÃ±o de pantalla
    $(window).on('resize', function () {
        ajustarMenu();
    });

    // Ejecutar la funciÃ³n cuando la pÃ¡gina cargue
    ajustarMenu();

    // Efecto al pasar el ratÃ³n sobre el botÃ³n de abrir menÃº
    $('#abrir').on("mouseenter", function () {
        $(this).css("transform", "scale(1.2)");
    }).on("mouseleave", function () {
        $(this).css("transform", "scale(1)");
    });

    // Efecto al pasar el ratÃ³n sobre el botÃ³n de cerrar menÃº
    $('#cerrar').on("mouseenter", function () {
        $(this).css("transform", "scale(1.2)");
    }).on("mouseleave", function () {
        $(this).css("transform", "scale(1)");
    });

    // Abrir el menÃº (solo en mÃ³vil)
    $('#abrir').on('click', function () {
        if ($(window).width() <= 767) {
            $('#nav').stop(true, true).css('left', '-100%').show().animate({ left: '0' }, 300);
            $('body').addClass('no-scroll');
            $('body').addClass('menu-abierto');
        }
    });

    // Cerrar el menÃº (solo en mÃ³vil)
    $('#cerrar').on('click', function () {
        if ($(window).width() <= 767) {
            $('#nav').animate({ left: '-100%' }, 300, function () {
                $(this).hide();
                $('body').removeClass('no-scroll');
                $('body').removeClass('menu-abierto');
            });
        }
    });

    // Cerrar el menu al seleccionar una opcion 
    $('#nav a').on('click', function () {
        if ($(window).width() <= 768) {
            $('#nav').animate({ left: '-100%' }, 300, function () {
                $(this).hide();
                $('body').removeClass('no-scroll');
                $('body').removeClass('menu-abierto');
            });
        }
    });

    // Detectar cuando hacer scroll y mostrar/ocultar el botÃ³n volver-arriba
    $(window).on('scroll', function () {
        // Solo en mÃ³viles y cuando el menÃº NO estÃ© abierto
        if ($(this).scrollTop() > 300 && !$('body').hasClass('menu-abierto') && $(window).width() <= 1024) {
            $('.volver-arriba').stop(true).fadeIn(300);
        } else {
            $('.volver-arriba').stop(true).fadeOut(300);
        }
    });

    // Volver arriba cuando se haga click en el botÃ³n
    $('.volver-arriba').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 300);
    });

    //Hacer que el boton este siempre oculto hasta que se realice un scroll
    $('#volver-arriba').hide();

    // BotÃ³n volver arriba
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $('#volver-arriba').stop(true).fadeIn();
        } else {
            $('#volver-arriba').stop(true).fadeOut();
        }
    });

    $('#volver-arriba a').on("click", function (event) {
        event.preventDefault();
        $('html, body').stop(true).animate({ scrollTop: 0 }, 500);
    });

    // Cabecera siempre arriba con sticky
    var header = $("#top");
    $(window).on("scroll", function () {
        header.toggleClass("sticky", $(window).scrollTop() > 0);
    });

    let currentIndex = 0;
    const images = $(".slider-image");
    const totalImages = images.length;

    // FunciÃ³n para mostrar la imagen actual
    function showImage(index) {
        const newTransformValue = -index * 100 + "%";
        $(".slider-container").css("transform", "translateX(" + newTransformValue + ")");
    }

    // Mostrar la siguiente imagen
    $("#next").on("click", function () {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    });

    // Mostrar la imagen anterior
    $("#prev").on("click", function () {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    });

    // Mostrar la primera imagen al cargar
    showImage(currentIndex);

    function actualizarTexto() {
        const isMobile = $(window).width() <= 767;

        $('#cta-description').html(isMobile
            ? 'Este sistema te permite reutilizar tus uÃ±as personalizadas en minutos con una aplicaciÃ³n adhesiva.<br><br> Â¡ContÃ¡ctanos para mÃ¡s info!'
            : 'Este novedoso sistema de diseÃ±o personalizado de uÃ±as permitirÃ¡ la reutilizaciÃ³n de las mismas rÃ¡pidamente con una aplicaciÃ³n adhesiva cuando y donde quieras en cuestiÃ³n de minutos.<br><br>Â¡Contacta con nosotros y dinos lo que quieres para darte un presupuesto!<br><br>'
        );

        $('#cta-whatsapp').html('<i class="bi bi-whatsapp"></i> +34 666 66 66 66');
        $('#cta-slash').html('<i class="bi bi-slash-lg"></i>');
        $('#cta-mail').html('<i class="bi bi-envelope-open-heart"></i> info@nailstudio.com');
    }

    actualizarTexto();
    $(window).on('resize', actualizarTexto);

    //Codigo para copiar numero o mail

    // Detectar el clic en el pÃ¡rrafo de WhatsApp y copiar el texto
    $('#cta-whatsapp').on('click', function () {
        // Obtener el texto dentro del elemento
        var textToCopy = $(this).text().trim();

        // Crear un elemento temporal para copiar el texto
        var tempInput = $('<input>');
        $('body').append(tempInput);
        tempInput.val(textToCopy).select();

        // Copiar al portapapeles
        document.execCommand('copy');
        tempInput.remove(); // Eliminar el input temporal

        // Mostrar una alerta o mensaje de confirmaciÃ³n
        alert('Â¡Texto copiado al portapapeles!');
    });

    $('#cta-mail').on('click', function () {
        // Obtener el texto dentro del elemento
        var textToCopy = $(this).text().trim();

        // Crear un elemento temporal para copiar el texto
        var tempInput = $('<input>');
        $('body').append(tempInput);
        tempInput.val(textToCopy).select();

        // Copiar al portapapeles
        document.execCommand('copy');
        tempInput.remove(); // Eliminar el input temporal

        // Mostrar una alerta o mensaje de confirmaciÃ³n
        alert('Â¡Texto copiado al portapapeles!');
    });

    //formulario vacio error

    $(document).on('submit', 'form', function (event) {
        let ocasion = $('#ocasion').val();
        let estilo = $('#estilo').val();
        let forma = $('#forma').val();
        let metodo = $('#metodo').val();
        let fecha = $('#fecha').val();

        if (!ocasion || !estilo || !forma || !metodo || !fecha) {
            event.preventDefault(); // Evita el envÃ­o del formulario
            alert("Por favor, completa todos los campos antes de reservar.");
        }
    });

    $(document).on('submit', '#formulario', function (event) {
        event.preventDefault(); // Detiene el envÃ­o del formulario

        let valido = true;

        $('.validable').each(function () {
            if (!$(this).val()) {
                $(this).css('border', '2px solid red');
                valido = false;
            } else {
                $(this).css('border', '2px solid #f8a5c2');
            }
        });

        let fecha = $('#fecha').val();
        if (!fecha) {
            $('#fecha').css('border', '2px solid red');
            valido = false;
        } else {
            $('#fecha').css('border', '2px solid #f8a5c2');
        }

        if (!valido) {
            return; // Si hay errores, no mostramos el modal
        }

        // Obtener los valores seleccionados
        let ocasion = $('#ocasion').val();
        let estilo = $('#estilo').val();
        let forma = $('#forma').val();
        let metodo = $('#metodo').val();
        let fechaSeleccionada = $('#fecha').val();

        // Crear el mensaje de resumen
        let mensajeResumen = `
            <br><br>
            <strong>Fecha:</strong> ${fechaSeleccionada} <br><br>
            <strong>OcasiÃ³n:</strong> ${ocasion} <br><br>
            <strong>Estilo:</strong> ${estilo} <br><br>
            <strong>Forma:</strong> ${forma} <br><br>
            <strong>MÃ©todo:</strong> ${metodo} <br><br>
        `;

        // Mostrar el resumen en el modal
        $('#resumenTexto').html(mensajeResumen);
        $('#resumenModal').fadeIn();

        // Limpiar eventos previos y manejar la confirmaciÃ³n correctamente
        $('#confirmarReserva').off('click').on('click', function () {
            $('#resumenModal').fadeOut(); // Cierra el modal

            // Esperar a que el modal se cierre completamente antes de enviar el formulario
            setTimeout(function () {
                document.getElementById("formulario").submit();
            }, 300);
        });

        // Para cerrar el modal al hacer clic en la "X"
        $('.close').off('click').on('click', function () {
            $('#resumenModal').fadeOut();
        });

        // Cerrar el modal si el usuario hace clic fuera de Ã©l
        $(window).off('click').on('click', function (e) {
            if ($(e.target).is('#resumenModal')) {
                $('#resumenModal').fadeOut();
            }
        });
    });

    /**
     * Seccion preguntas frecuentes
     */

    $(document).ready(function () {
        $('.faq-question').on('click', function () {
            var $faqItem = $(this).closest('.faq-item');
            var isActive = $faqItem.hasClass('active');

            // Cerrar todos los items
            $('.faq-item').removeClass('active');

            // Si no estaba activo, abrirlo
            if (!isActive) {
                $faqItem.addClass('active');
            }
        });
    });

    /*
     * Seccion para pedir cita
     */
    $(document).ready(function () {
        // SelecciÃ³n de servicio
        $('.service-card').on('click', function () {
            $('.service-card').removeClass('selected');
            $(this).addClass('selected');
        });

        // SelecciÃ³n de fecha en el calendario
        $('.calendar-day:not(.disabled)').on('click', function () {
            $('.calendar-day').removeClass('selected');
            $(this).addClass('selected');
        });

        // SelecciÃ³n de hora
        $('.time-slot:not(.unavailable)').on('click', function () {
            $('.time-slot').removeClass('selected');
            $(this).addClass('selected');
        });

        // NavegaciÃ³n entre pasos
        $('.next-step').on('click', function () {
            var currentStep = $(this).closest('.booking-step');
            var nextStepId = $(this).data('next');

            currentStep.removeClass('active');
            $('#' + nextStepId).addClass('active');
        });

        $('.prev-step').on('click', function () {
            var currentStep = $(this).closest('.booking-step');
            var prevStepId = $(this).data('prev');

            currentStep.removeClass('active');
            $('#' + prevStepId).addClass('active');
        });

        // ConfirmaciÃ³n de reserva
        $('.confirm-booking').on('click', function () {
            // AquÃ­ irÃ­a la lÃ³gica para enviar los datos al servidor

            // Mostrar resumen de la reserva
            $('#summary-service').text($('.service-card.selected h4').text());
            $('#summary-date').text($('.calendar-day.selected').text() + ' de Abril, 2025');
            $('#summary-time').text($('.time-slot.selected').text());

            // Mostrar confirmaciÃ³n
            $('.booking-step').removeClass('active');
            $('#step-confirmation').addClass('active');
        });

        // Nueva reserva
        $('.new-booking').on('click', function () {
            $('.booking-step').removeClass('active');
            $('#step-service').addClass('active');

            // Resetear selecciones
            $('.service-card').removeClass('selected');
            $('.calendar-day').removeClass('selected');
            $('.time-slot').removeClass('selected');
            $('#nombre').val('');
            $('#email').val('');
            $('#telefono').val('');
            $('#comentarios').val('');
        });
    });

    /*
    * Seccion pedir cita
    */

    $(document).ready(function () {
        $('#show-booking-btn').on('click', function () {
            $(this).hide(); // Oculta el botón
            $('#booking-system')
                .removeClass('hidden')
                .addClass('visible')
                .css('display', 'block'); // Fuerza el display inicial
        });
    });

    $(document).ready(function () {
        // Función para cerrar la sección de pedir cita
        $('#close-button').on('click', function () {
            $('#booking-system')
                .removeClass('visible')
                .addClass('hidden')
                .css('display', 'none'); // Oculta la sección

            $('#show-booking-btn').show(); // Muestra el botón nuevamente
        });
        
    });
    
    








    /** 
    // Loader de la pagina web
    $(document).ready(function () {
        $('body').addClass('loading');
    
        $(window).on('load', function () {
            console.log("PÃ¡gina completamente cargada, ocultando loader...");
            
            setTimeout(function () {
                $('#loading-screen').fadeOut(300, function () {
                    $(this).remove();
                    $('body').removeClass('loading');
                    console.log("Loader eliminado correctamente.");
                });
            }, 500);
        });
    
        // Si despuÃ©s de 1.5 segundos el loader sigue visible, lo forzamos a desaparecer
        setTimeout(function () {
            if ($('#loading-screen').is(':visible')) {
                console.log("Loader aÃºn visible, forzando eliminaciÃ³n...");
                $('#loading-screen').fadeOut(300).promise().done(function () {
                    $(this).remove();
                    $('body').removeClass('loading');
                    console.log("Loader eliminado a la fuerza.");
                });
            }
        }, 1500); //segundos
    });
    */

});