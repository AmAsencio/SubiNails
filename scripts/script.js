$(function () {

    /*******************************************************************************
     * 
     * Seccion servicios
     * 
     *******************************************************************************/

    const servicesData = [
        { img: "./imagenes/carousel/acrilicas/1.webp", title: "Unas Acri­licas", price: "Desde $50", direccion: "unasacrilicas" },
        { img: "./imagenes/carousel/gel/gel-8.webp", title: "Unas de Gel", price: "Desde $30", direccion: "unasgel" },
        { img: "./imagenes/carousel/manicuraRusa/manicura-rusa-5.webp", title: "Manicura Rusa", price: "Desde $40", direccion: "manicurarusa" },
        { img: "./imagenes/carousel/decoracion3d/decoracion3d-8.webp", title: "Decoracion 3D", price: "Desde $70", direccion: "decoracion3d" }
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
            ? 'Este sistema te permite reutilizar tus unas personalizadas en minutos con una aplicacion adhesiva.<br><br> ¡Contactanos para mas info!'
            : 'Este novedoso sistema de diseno personalizado de unas permitira la reutilizacion de las mismas rapidamente con una aplicacion adhesiva cuando y donde quieras en cuestion de minutos.<br><br>¡Contacta con nosotros y dinos lo que quieres para darte un presupuesto!<br><br>'
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

    function showToast(message, icon) {
        const toast = $('<div class="toast"></div>');

        toast.html(`<i class="bi ${icon}"></i>${message}<div class="toast-progress"></div>`);

        $('#toast-container').append(toast);

        setTimeout(() => toast.addClass('show'), 10);

        const progress = toast.find('.toast-progress');
        progress.animate({ width: '100%' }, 3000);

        setTimeout(() => {
            toast.removeClass('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    $('#cta-whatsapp').on('click', function () {
        var textToCopy = $(this).text().trim();

        var tempInput = $('<input>');
        $('body').append(tempInput);
        tempInput.val(textToCopy).select();

        document.execCommand('copy');
        tempInput.remove();

        showToast('¡Número copiado al portapapeles!', 'bi-whatsapp');
    });

    $('#cta-mail').on('click', function () {
        var textToCopy = $(this).text().trim();

        var tempInput = $('<input>');
        $('body').append(tempInput);
        tempInput.val(textToCopy).select();

        document.execCommand('copy');
        tempInput.remove();

        showToast('¡Email copiado al portapapeles!', 'bi-envelope-open-heart');
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

            $('.faq-item').removeClass('active');

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
            $(this).closest('.booking-step').find('.error-message').hide();
        });

        // Manejar la selección de fechas
        $(document).on('click', '.calendar-day:not(.disabled)', function () {
            $('.calendar-day').removeClass('selected');
            $(this).addClass('selected');
            $(this).closest('.booking-step').find('.error-message').hide();
        });

        // Manejar la selección de horas
        $(document).on('click', '.time-slot:not(.unavailable)', function () {
            $('.time-slot').removeClass('selected');
            $(this).addClass('selected');
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
        });

        $('.confirm-booking').on('click', function (e) {
            // Limpiar errores anteriores
            $('.booking-step[data-step="4"] input[required], .booking-step[data-step="4"] textarea[required]').removeClass('input-error');
            $('#mensajeErrorCampos').hide();

            let hayError = false;

            // Comprobar cada campo obligatorio
            $('.booking-step[data-step="4"] input[required], .booking-step[data-step="4"] textarea[required]').each(function () {
                if (!$(this).val().trim()) {
                    $(this).addClass('input-error');
                    hayError = true;
                }
            });

            // Si hay error, mostrar mensaje y detener el envío
            if (hayError) {
                $('.booking-step[data-step="4"] .input-error').first().focus();
                e.preventDefault();
                return false;
            }
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

                if (validateForm()) {
                    $('#summary-service').text($('.service-card.selected h4').text());
                    $('#summary-date').text($('.calendar-day.selected').text() + ' de Abril, 2025');
                    $('#summary-time').text($('.time-slot.selected').text());
                    $('.booking-step').removeClass('active');
                    $('#step-confirmation').addClass('active');
                }
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

        /*******************************************************************************
         * 
         * Funcionalidad del calendario para selección de fecha
         * 
         *******************************************************************************/

        let currentDate = new Date();

        function updateCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const today = new Date();

            // Actualizar el texto del mes actual
            $('#current-month').text(currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }));

            // Limpiar y regenerar los días del calendario
            $('.calendar-grid').empty();

            // Agregar los encabezados de los días de la semana
            const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
            weekdays.forEach(day => {
                $('.calendar-grid').append(`<div class="calendar-day-header">${day}</div>`);
            });

            // Agregar celdas vacías para los días antes del primer día del mes
            let startingDay = firstDay.getDay() - 1;
            if (startingDay === -1) startingDay = 6;
            for (let i = 0; i < startingDay; i++) {
                $('.calendar-grid').append('<div class="calendar-day disabled"></div>');
            }

            // Agregar los días del mes
            for (let i = 1; i <= lastDay.getDate(); i++) {
                const currentDateCheck = new Date(year, month, i);
                const dayOfWeek = currentDateCheck.getDay();

                // Verificar si es fin de semana (0 = domingo, 6 = sábado) o si es un día pasado
                const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
                const isPastDay = currentDateCheck < new Date(today.getFullYear(), today.getMonth(), today.getDate());

                // Determinar la clase CSS basada en las condiciones
                let dayClass = 'calendar-day';
                if (isWeekend || isPastDay) {
                    dayClass += ' disabled';
                } else {
                    dayClass += ' available';
                }

                // Crear el elemento del día
                const dayElement = $(`<div class="${dayClass}">${i}</div>`);

                // Marcar el día actual
                if (currentDateCheck.toDateString() === today.toDateString()) {
                    dayElement.addClass('today');
                }

                $('.calendar-grid').append(dayElement);
            }
        }

        // Selección de día
        $(document).on('click', '.calendar-day.available', function () {
            $('.calendar-day').removeClass('selected');
            $(this).addClass('selected');
        });


        $(document).ready(function () {
            // Inicializar el calendario cuando se cargue la página
            updateCalendar();

            // Botón de mes anterior
            $('#prev-month').click(function () {
                currentDate.setMonth(currentDate.getMonth() - 1);
                updateCalendar();
            });

            // Botón de mes siguiente
            $('#next-month').click(function () {
                currentDate.setMonth(currentDate.getMonth() + 1);
                updateCalendar();
            });

            // Selección de día
            $(document).on('click', '.calendar-day.available', function () {
                $('.calendar-day').removeClass('selected');
                $(this).addClass('selected');
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
        let testimoniosPerView = window.innerWidth < 768 ? 1 : 2;
        let prevWindowWidth = window.innerWidth;
        const tabletMinWidth = 768;
        const tabletMaxWidth = 1024;

        // Configuración inicial
        function setupSlider() {
            if (window.innerWidth < 768) {
                // Para móviles: un testimonio a la vez, ancho completo
                $testimonios.css('flex', '0 0 100%');
                $testimonios.css('min-width', '100%');
            } else {
                // Para tablets y escritorio
                $testimonios.css('flex', `0 0 ${100 / testimoniosPerView}%`);
                $testimonios.css('min-width', `${100 / testimoniosPerView}%`);
            }

            updateActiveTestimonios();
        }


        function updateActiveTestimonios() {
            $testimonios.removeClass('active');
            for (let i = 0; i < testimoniosPerView; i++) {
                const index = (currentIndex + i) % $testimonios.length;
                $testimonios.eq(index).addClass('active');
            }
        }

        function showTestimonios(index) {
            currentIndex = index;

            // Obtener el ancho del contenedor y de cada testimonio
            const containerWidth = $(".testimonios-carousel").width() - 120;
            const testimonioWidth = $testimonios.first().outerWidth(true);

            // Calcular el offset para centrar los testimonios
            let offset;

            if (window.innerWidth <= 1024) {
                // Para móvil - centrar el único testimonio visible
                offset = (index * testimonioWidth) + 10;
            } else {
                // Para escritorio - centrar los dos testimonios visibles
                offset = (index * testimonioWidth) + 20;
            }

            $testimonioContainer.css('transform', `translateX(-${offset}px)`);

            updateActiveTestimonios();
        }

        function nextTestimonio() {
            const maxIndex = $testimonios.length - testimoniosPerView;
            if (currentIndex < maxIndex) {
                showTestimonios(currentIndex + 1);
            } else {
                // Transición suave al volver al principio
                $testimonioContainer.css('transition', 'none');
                showTestimonios(0);
                setTimeout(() => {
                    $testimonioContainer.css('transition', 'transform 0.5s ease');
                }, 50);
            }
        }

        function prevTestimonio() {
            if (currentIndex > 0) {
                showTestimonios(currentIndex - 1);
            } else {
                // Transición suave al ir al final
                $testimonioContainer.css('transition', 'none');
                showTestimonios($testimonios.length - testimoniosPerView);
                setTimeout(() => {
                    $testimonioContainer.css('transition', 'transform 0.5s ease');
                }, 50);
            }
        }

        // Función para detectar si estamos en vista de tablet
        function isTabletView() {
            return window.innerWidth >= tabletMinWidth && window.innerWidth < tabletMaxWidth;
        }

        // Función para reiniciar el carrusel completamente
        function resetCarousel() {
            $testimonioContainer.finish();

            currentIndex = 0;

            setupSlider();

            $testimonioContainer.css('transition', 'none');
            showTestimonios(0);

            setTimeout(() => {
                $testimonioContainer.css('transition', 'transform 0.5s ease');
            }, 100);
        }

        // Event listeners para los botones
        $nextButton.on('click', nextTestimonio);
        $prevButton.on('click', prevTestimonio);

        // Escuchar el evento resize de la ventana - versión mejorada
        $(window).on('resize', function () {
            const currentWidth = window.innerWidth;
            const newTestimoniosPerView = currentWidth < 768 ? 1 : 2;
            const wasTablet = (prevWindowWidth >= tabletMinWidth && prevWindowWidth < tabletMaxWidth);
            const isTablet = isTabletView();

            if (newTestimoniosPerView !== testimoniosPerView ||
                (wasTablet && !isTablet) || (!wasTablet && isTablet)) {

                testimoniosPerView = newTestimoniosPerView;
                resetCarousel();
            }

            prevWindowWidth = currentWidth;
        });

        // Inicializar el slider
        setupSlider();
        showTestimonios(0);

        // Asegurarse de que el carrusel esté correctamente posicionado al cargar la página
        $(window).on('load', function () {
            resetCarousel();
        });
    });


});