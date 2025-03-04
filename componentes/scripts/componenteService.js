$(function () {
    const servicesData = [
        { img: "/imagenes/Acrilicas1.png", title: "Uñas Acrílicas", price: "Desde $300" },
        { img: "/imagenes/Acrilicas1.png", title: "Uñas de Gel", price: "Desde $350" },
        { img: "/imagenes/Acrilicas1.png", title: "Manicura Rusa", price: "Desde $250" },
        { img: "/imagenes/Acrilicas1.png", title: "Decoración 3D", price: "Desde $400" }
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

    /** 
    *     $servicesContainer.on("click", ".cta-small", function (e) {
    *      e.preventDefault();
    *      alert("Más información sobre " + $(this).siblings(".service-info").find("h3").text());
    *      });
    */

});
