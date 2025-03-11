$(function () {
    const servicesData = [
        { img: "https://fotos-subinails.s3.us-east-1.amazonaws.com/imagenes/unas-acrilicas.jpg", title: "Uñas Acrílicas", price: "Desde $50" },
        { img: "https://fotos-subinails.s3.us-east-1.amazonaws.com/imagenes/unas-gel.jpg", title: "Uñas de Gel", price: "Desde $30" },
        { img: "https://fotos-subinails.s3.us-east-1.amazonaws.com/imagenes/manicura-rusa.jpg", title: "Manicura Rusa", price: "Desde $40" },
        { img: "https://fotos-subinails.s3.us-east-1.amazonaws.com/imagenes/decoracion-3d.png", title: "Decoración 3D", price: "Desde $70" }
    ];

    const $servicesContainer = $("#services-container");

    $.each(servicesData, function (index, service) {
        const serviceElement = `
            <div class="service">
                <img src="${service.img}" alt="${service.title}">
                <div class="service-info">
                    <h3>${service.title}</h3>
                    <p>${service.price}</p>
                </div>
            </div>
        `;
        $servicesContainer.append(serviceElement);
    });

    // Funcion que hace que sea visible el menu en escritorio 
    function ajustarMenu() {
        if ($(window).width() > 750) {
            $("#nav").css("display", "block"); // Asegurar que el menú sea visible en escritorio
        } else {
            $("#nav").css("display", "none"); // Ocultar menú en móvil
        }
    }

    // Detectar cambios de tamaño de pantalla
    $(window).on('resize', function () {
        ajustarMenu();
    });

    // Ejecutar la función cuando la página cargue
    ajustarMenu();

    // Efecto al pasar el ratón sobre el botón de abrir menú
    $('#abrir').on("mouseenter", function () {
        $(this).css("transform", "scale(1.2)");
    }).on("mouseleave", function () {
        $(this).css("transform", "scale(1)");
    });

    // Efecto al pasar el ratón sobre el botón de cerrar menú
    $('#cerrar').on("mouseenter", function () {
        $(this).css("transform", "scale(1.2)");
    }).on("mouseleave", function () {
        $(this).css("transform", "scale(1)");
    });

    // Abrir el menú (solo en móvil)
    $('#abrir').on('click', function () {
        if ($(window).width() <= 1024) {
            $('#nav').stop(true, true).css('left', '-100%').show().animate({ left: '0' }, 300);
            $('body').addClass('no-scroll');
            $('body').addClass('menu-abierto');
        }
    });

    // Cerrar el menú (solo en móvil)
    $('#cerrar').on('click', function () {
        if ($(window).width() <= 1024) {
            $('#nav').animate({ left: '-100%' }, 300, function () {
                $(this).hide();
                $('body').removeClass('no-scroll');
                $('body').removeClass('menu-abierto');
            });
        }
    });

    // Detectar cuando hacer scroll y mostrar/ocultar el botón volver-arriba
    $(window).on('scroll', function () {
        // Solo en móviles y cuando el menú NO esté abierto
        if ($(this).scrollTop() > 300 && !$('body').hasClass('menu-abierto') && $(window).width() <= 1024) {
            $('.volver-arriba').stop(true).fadeIn(300);
        } else {
            $('.volver-arriba').stop(true).fadeOut(300);
        }
    });

    // Volver arriba cuando se haga click en el botón
    $('.volver-arriba').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 300);
    });

    //Hacer que el boton este siempre oculto hasta que se realice un scroll
    $('#volver-arriba').hide();
    
    // Botón volver arriba
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

    // Función para mostrar la imagen actual
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
            ? 'Este sistema te permite reutilizar tus uñas personalizadas en minutos con una aplicación adhesiva.<br><br> ¡Contáctanos para más info!'
            : 'Este novedoso sistema de diseño personalizado de uñas permitirá la reutilización de las mismas rápidamente con una aplicación adhesiva cuando y donde quieras en cuestión de minutos.<br><br>¡Contacta con nosotros y dinos lo que quieres para darte un presupuesto!<br><br>'
        );

        $('#cta-whatsapp').html('<i class="bi bi-whatsapp"></i> +34 666 66 66 66');
        $('#cta-slash').html('<i class="bi bi-slash-lg"></i>');
        $('#cta-mail').html('<i class="bi bi-envelope-open-heart"></i> info@nailstudio.com');
    }

    actualizarTexto();
    $(window).on('resize', actualizarTexto);

    //Codigo para copiar numero o mail

    // Detectar el clic en el párrafo de WhatsApp y copiar el texto
    $('#cta-whatsapp').on('click', function() {
        // Obtener el texto dentro del elemento
        var textToCopy = $(this).text().trim();

        // Crear un elemento temporal para copiar el texto
        var tempInput = $('<input>');
        $('body').append(tempInput);
        tempInput.val(textToCopy).select();
        
        // Copiar al portapapeles
        document.execCommand('copy');
        tempInput.remove(); // Eliminar el input temporal
        
        // Mostrar una alerta o mensaje de confirmación
        alert('¡Texto copiado al portapapeles!');
    });

    $('#cta-mail').on('click', function() {
        // Obtener el texto dentro del elemento
        var textToCopy = $(this).text().trim();

        // Crear un elemento temporal para copiar el texto
        var tempInput = $('<input>');
        $('body').append(tempInput);
        tempInput.val(textToCopy).select();
        
        // Copiar al portapapeles
        document.execCommand('copy');
        tempInput.remove(); // Eliminar el input temporal
        
        // Mostrar una alerta o mensaje de confirmación
        alert('¡Texto copiado al portapapeles!');
    });

    //formulario vacio error

    $(document).on('submit', 'form', function(event) {
        let ocasion = $('#ocasion').val();
        let estilo = $('#estilo').val();
        let forma = $('#forma').val();
        let metodo = $('#metodo').val();
        let fecha = $('#fecha').val();
    
        if (!ocasion || !estilo || !forma || !metodo || !fecha) {
            event.preventDefault(); // Evita el envío del formulario
            alert("Por favor, completa todos los campos antes de reservar.");
        }
    });
    
    $(document).on('submit', '#formulario', function(event) {
        let valido = true;
        $('.validable').each(function() {
            if (!$(this).val()) {
                $(this).css('border', '2px solid red');
                valido = false;
            } else {
                $(this).css('border', '2px solid #f8a5c2');
            }
        });
    
        // Verificar si el campo de fecha está vacío (se considera vacío si es una cadena vacía)
        let fecha = $('#fecha').val();
        if (!fecha) {
            $('#fecha').css('border', '2px solid red');
            valido = false;
        } else {
            $('#fecha').css('border', '2px solid #f8a5c2');
        }
    
        if (!valido) {
            event.preventDefault();
        }
    });
    


});
