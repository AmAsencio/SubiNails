$(function () {
    $('#abrir').on('click', function () {
        $('#nav').addClass('visible');
    });

    $('#cerrar').on('click', function () {
        $('#nav').removeClass('visible');
    });
});
