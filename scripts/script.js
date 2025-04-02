$(function () {

    /*******************************************************************************
     * 
     * Seccion servicios
     * 
     *******************************************************************************/

    const servicesData = [
        { img: "https://fotos-subinails.s3.us-east-1.amazonaws.com/imagenes/servicios/unasacrilicas.webp", title: "Unas Acri­licas", price: "Desde $50", direccion: "unasacrilicas" },
        { img: "https://fotos-subinails.s3.us-east-1.amazonaws.com/imagenes/servicios/unasgel.webp", title: "Unas de Gel", price: "Desde $30", direccion: "unasgel" },
        { img: "https://fotos-subinails.s3.us-east-1.amazonaws.com/imagenes/servicios/manicurarusa.webp", title: "Manicura Rusa", price: "Desde $40", direccion: "manicurarusa" },
        { img: "https://fotos-subinails.s3.us-east-1.amazonaws.com/imagenes/servicios/decoracion3d.webp", title: "Decoracion 3D", price: "Desde $70", direccion: "decoracion3d" }
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
                        <span class="button-text">Leer mas</span>
                    </a>
                </div>
            </div>
        `;
        $servicesContainer.append(serviceElement);
    });

    /*******************************************************************************
     * 
     * Seccion menu
     * 
     *******************************************************************************/

    function ajustarMenu() {
        if ($(window).width() > 750) {
            $("#nav").css("display", "block"); // Asegurar que el menu sea visible en escritorio
        } else {
            $("#nav").css("display", "none"); // Ocultar menu en movil
        }
    }

    // Detectar cambios de tamano de pantalla
    $(window).on('resize', function () {
        ajustarMenu();
    });

    // Ejecutar la funcion cuando la pagina cargue
    ajustarMenu();

    // Efecto al pasar el raton sobre el boton de abrir menu
    $('#abrir').on("mouseenter", function () {
        $(this).css("transform", "scale(1.2)");
    }).on("mouseleave", function () {
        $(this).css("transform", "scale(1)");
    });

    // Efecto al pasar el raton sobre el boton de cerrar menu
    $('#cerrar').on("mouseenter", function () {
        $(this).css("transform", "scale(1.2)");
    }).on("mouseleave", function () {
        $(this).css("transform", "scale(1)");
    });

    // Abrir el menu (solo en movil)
    $('#abrir').on('click', function () {
        if ($(window).width() <= 767) {
            $('#nav').stop(true, true).css('left', '-100%').show().animate({ left: '0' }, 300);
            $('body').addClass('no-scroll');
            $('body').addClass('menu-abierto');
        }
    });

    // Cerrar el menu (solo en moviles)
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

    /*******************************************************************************
     * 
     * Seccion volver arriba
     * 
     *******************************************************************************/

    $(window).on('scroll', function () {
        // Solo en moviles y cuando el menu NO esta abierto
        if ($(this).scrollTop() > 300 && !$('body').hasClass('menu-abierto') && $(window).width() <= 1024) {
            $('.volver-arriba').stop(true).fadeIn(300);
        } else {
            $('.volver-arriba').stop(true).fadeOut(300);
        }
    });

    // Volver arriba cuando se haga click en el boton
    $('.volver-arriba').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 300);
    });

    //Hacer que el boton este siempre oculto hasta que se realice un scroll
    $('#volver-arriba').hide();

    // Boton volver arriba
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

    /*******************************************************************************
     * 
     * Sticky header
     * 
     *******************************************************************************/

    var header = $("#top");
    $(window).on("scroll", function () {
        header.toggleClass("sticky", $(window).scrollTop() > 0);
    });


    /*******************************************************************************
     * 
     * Seccion slider de imagenes
     * 
     *******************************************************************************/

    let currentIndex = 0;
    const images = $(".slider-image");
    const totalImages = images.length;

    function showImage(index) {
        const newTransformValue = -index * 100 + "%";
        $(".slider-container").css("transform", "translateX(" + newTransformValue + ")");
    }

    $("#next").on("click", function () {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    });

    $("#prev").on("click", function () {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    });

    showImage(currentIndex);

    /*******************************************************************************
     * 
     * Seccion press-on movil
     * 
     *******************************************************************************/

    function actualizarTexto() {
        const isMobile = $(window).width() <= 767;

        $('#cta-description').html(isMobile
            ? 'Este sistema te permite reutilizar tus unas personalizadas en minutos con una aplicacion adhesiva.<br><br> Â¡Contactanos para mas info!'
            : 'Este novedoso sistema de diseno personalizado de unas permitira la reutilizacion de las mismas rapidamente con una aplicacion adhesiva cuando y donde quieras en cuestion de minutos.<br><br>Â¡Contacta con nosotros y dinos lo que quieres para darte un presupuesto!<br><br>'
        );

        $('#cta-whatsapp').html('<i class="bi bi-whatsapp"></i> +34 666 66 66 66');
        $('#cta-slash').html('<i class="bi bi-slash-lg"></i>');
        $('#cta-mail').html('<i class="bi bi-envelope-open-heart"></i> info@nailstudio.com');
    }

    actualizarTexto();
    $(window).on('resize', actualizarTexto);

    
    /*******************************************************************************
     * 
     * Seccion de contacto copiar
     * 
     *******************************************************************************/

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

        // Mostrar una alerta o mensaje de confirmacion
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

        // Mostrar una alerta o mensaje de confirmacion
        alert('Â¡Texto copiado al portapapeles!');
    });


    /*******************************************************************************
     * 
     * Seccion preguntas frecuentes
     * 
     *******************************************************************************/

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

    /*******************************************************************************
     * 
     * Seccion para pedir cita
     * 
     *******************************************************************************/

    $(document).ready(function () {
        $('#show-booking-btn').on('click', function () {
            $(this).hide(); 
            $('#booking-system')
                .removeClass('hidden')
                .addClass('visible') 
                .css('display', 'block');
        });
    });

    // Función para cerrar la sección de pedir cita
    $(document).ready(function () {
        $('#close-button').on('click', function () {
            $('#booking-system')
                .removeClass('visible')
                .addClass('hidden')
                .css('display', 'none');

            $('#show-booking-btn').show();
        });

    });

    // Inicializar el sistema de reserva
    $(document).ready(function () {
        $('.booking-step').each(function () {
            if ($(this).find('.error-message').length === 0) {
                $(this).prepend('<div class="error-message"></div>');
            }
        });

        // Manejar la selección de servicios
        $(document).on('click', '.service-card', function () {
            $('.service-card').removeClass('selected');
            $(this).addClass('selected');
            // Ocultar mensaje de error cuando se selecciona un servicio
            $(this).closest('.booking-step').find('.error-message').hide();
        });

        // Manejar la selección de fechas
        $(document).on('click', '.calendar-day:not(.disabled)', function () {
            $('.calendar-day').removeClass('selected');
            $(this).addClass('selected');
            // Ocultar mensaje de error cuando se selecciona una fecha
            $(this).closest('.booking-step').find('.error-message').hide();
        });

        // Manejar la selección de horas
        $(document).on('click', '.time-slot:not(.unavailable)', function () {
            $('.time-slot').removeClass('selected');
            $(this).addClass('selected');
            // Ocultar mensaje de error cuando se selecciona una hora
            $(this).closest('.booking-step').find('.error-message').hide();
        });

        // Ocultar mensajes de error al escribir en los campos del formulario
        $(document).on('input', '.info-form input, .info-form textarea', function () {
            let allFilled = true;
            $('.info-form input, .info-form textarea').each(function () {
                if ($(this).val().trim() === '') {
                    allFilled = false;
                    return false;
                }
            });

            if (allFilled) {
                $(this).closest('.booking-step').find('.error-message').hide();
            }
        });

        // Función de validación para cada paso
        function validateStep(step) {
            let isValid = true;
            let errorMessage = "";

            if (step === 1) {
                if (!$('.service-card.selected').length) {
                    isValid = false;
                    errorMessage = "Debes elegir un servicio.";
                }
            } else if (step === 2) {
                if (!$('.calendar-day.selected').length) {
                    isValid = false;
                    errorMessage = "Debes elegir una fecha.";
                }
            } else if (step === 3) {
                if (!$('.time-slot.selected').length) {
                    isValid = false;
                    errorMessage = "Debes elegir una hora.";
                }
            } else if (step === 4) {
                let allFilled = true;
                $('.info-form input').not('[name="comments"]').each(function () {
                    if ($(this).val().trim() === '') {
                        allFilled = false;
                        return false; 
                    }
                });

                if (!allFilled) {
                    isValid = false;
                    errorMessage = "Debes rellenar todos los campos obligatorios.";
                }
            }

            // Mostrar u ocultar mensaje de error
            const $errorMessage = $(`.booking-step[data-step="${step}"] .error-message`);
            if (!isValid) {
                $errorMessage.text(errorMessage).show();
            } else {
                $errorMessage.hide();
            }

            return isValid;
        }

        $('.next-step').off('click');

        $(document).on('click', '.next-step', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const currentStep = parseInt($(this).closest('.booking-step').data('step'));

            const isValid = validateStep(currentStep);

            if (isValid) {
                $(`.booking-step[data-step="${currentStep}"]`).removeClass('active');
                $(`.booking-step[data-step="${currentStep + 1}"]`).addClass('active');
            }
            // Si no es válido, el mensaje de error ya se muestra y NO avanzamos
        });

        // Manejar el clic en los botones "Anterior"
        $(document).on('click', '.prev-step', function (e) {
            e.preventDefault();
            const currentStep = parseInt($(this).closest('.booking-step').data('step'));

            $(`.booking-step[data-step="${currentStep}"]`).removeClass('active');
            $(`.booking-step[data-step="${currentStep - 1}"]`).addClass('active');
        });

        $(document).ready(function () {
            function validateForm() {
                let isValid = true;
                let errorMessage = "";
    
                $('.info-form input').not('[name="comentarios"], [id="comentarios"]').each(function () {
                    if ($(this).val().trim() === '') {
                        isValid = false;
                        return false; 
                    }
                });
    
                if (!isValid) {
                    errorMessage = "Debes rellenar todos los campos obligatorios.";
                    $('#step-info .error-message').text(errorMessage).show();
                } else {
                    $('#step-info .error-message').hide();
                }
    
                return isValid;
            }
    
            // Confirmación de reserva
            $('.confirm-booking').on('click', function (e) {
                e.preventDefault();
    
                // Validar el formulario antes de confirmar
                if (validateForm()) {
                    $('#summary-service').text($('.service-card.selected h4').text());
                    $('#summary-date').text($('.calendar-day.selected').text() + ' de Abril, 2025');
                    $('#summary-time').text($('.time-slot.selected').text());
    
                    // Mostrar confirmación
                    $('.booking-step').removeClass('active');
                    $('#step-confirmation').addClass('active');
                }
                // Si no es válido, el mensaje de error ya se muestra y NO avanzamos
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
    
                // Ocultar mensajes de error
                $('.error-message').hide();
            });
    
            // Ocultar mensajes de error al escribir en los campos del formulario
            $('.info-form input').on('input', function () {
                if (validateForm()) {
                    $('#step-info .error-message').hide();
                }
            });
        });
    });

    /*******************************************************************************
     * 
     * Seccion testimonios
     * 
     *******************************************************************************/

    $(document).ready(function () {
        const $testimonioContainer = $('.testimonio-container');
        const $testimonios = $('.testimonio');
        const $prevButton = $('.testimonios-prev');
        const $nextButton = $('.testimonios-next');
        let currentIndex = 0;
        const testimoniosPerView = 2;
        const totalSlides = Math.ceil($testimonios.length / testimoniosPerView);

        // Configuración inicial
        function setupSlider() {
            let maxHeight = 0;
            $testimonios.each(function () {
                const height = $(this).outerHeight();
                if (height > maxHeight) {
                    maxHeight = height;
                }
            });

            // Aplicar la misma altura a todos los testimonios
            $testimonios.height(maxHeight);

            // Mostrar los primeros testimonios como activos
            updateActiveTestimonios();
        }

        function updateActiveTestimonios() {
            $testimonios.removeClass('active');
            for (let i = 0; i < testimoniosPerView; i++) {
                const index = (currentIndex * testimoniosPerView + i) % $testimonios.length;
                $testimonios.eq(index).addClass('active');
            }
        }

        function showTestimonios(index) {
            const slideWidth = 100 / testimoniosPerView;
            $testimonioContainer.css('transform', `translateX(-${index * slideWidth * testimoniosPerView}%)`);
            updateActiveTestimonios();
        }

        function nextTestimonio() {
            currentIndex = (currentIndex + 1) % Math.ceil($testimonios.length / testimoniosPerView);
            showTestimonios(currentIndex);
        }

        function prevTestimonio() {
            currentIndex = (currentIndex - 1 + Math.ceil($testimonios.length / testimoniosPerView)) % Math.ceil($testimonios.length / testimoniosPerView);
            showTestimonios(currentIndex);
        }

        $nextButton.on('click', nextTestimonio);
        $prevButton.on('click', prevTestimonio);

        // Inicializar el slider
        setupSlider();
        showTestimonios(currentIndex);
    });

});