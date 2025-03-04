$(function () {
    // Efecto al pasar el ratón sobre el botón de abrir menú
    $('#abrir').on("mouseenter", function() {
        $(this).css("transform", "scale(1.2)"); 
    }).on("mouseleave", function() {
        $(this).css("transform", "scale(1)"); 
    });

    // Efecto al pasar el ratón sobre el botón de cerrar menú
    $('#cerrar').on("mouseenter", function() {
        $(this).css("transform", "scale(1.2)"); 
    }).on("mouseleave", function() {
        $(this).css("transform", "scale(1)"); 
    });

    // Funcionalidad de abrir y cerrar el menú
    $('#abrir').on('click', function () {
        $('#nav').stop(true, true).css('left', '-100%').show().animate({ left: '0' }, 300);
    });

    $('#cerrar').on('click', function () {
        $('#nav').animate({ left: '-100%' }, 300, function () {
            $(this).hide();
        });
    });
});
