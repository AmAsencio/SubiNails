$(function () {
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
});
