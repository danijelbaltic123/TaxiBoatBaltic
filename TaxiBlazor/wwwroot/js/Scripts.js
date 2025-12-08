window.waitForImagesToLoad = async (selector) => {
    const images = document.querySelectorAll(selector);
    if (!images.length) return;

    await Promise.all(Array.from(images).map(img => {
        return img.complete ? Promise.resolve() : new Promise(resolve => {
            img.addEventListener("load", resolve);
            img.addEventListener("error", resolve);
        });
    }));
};

window.expandSeparator = function () {
    let separator = document.querySelector(".carousel-item.active .separator");
    if (separator) {
        separator.style.width = "60%";
        separator.style.opacity = "1";
    }
};

window.collapseSeparator = function () {
    let separator = document.querySelector(".carousel-item.active .separator");
    if (separator) {
        separator.style.width = "0%";
        separator.style.opacity = "0";
    }
};

window.showText = function () {
    let activeSlide = document.querySelector(".carousel-item.active");
    if (!activeSlide) return;

    let title = activeSlide.querySelector(".carousel-title");
    let description = activeSlide.querySelector(".carousel-description");

    if (title) {
        setTimeout(() => {
            title.style.transform = "translateY(0)";
            title.style.opacity = "1";
        }, 50);
    }

    if (description) {
        setTimeout(() => {
            description.style.transform = "translateY(0)";
            description.style.opacity = "1";
        }, 50);
    }
};

window.hideText = function () {
    let activeSlide = document.querySelector(".carousel-item.active");
    if (!activeSlide) return;

    let title = activeSlide.querySelector(".carousel-title");
    let description = activeSlide.querySelector(".carousel-description");

    if (title) {
        title.style.transform = "translateY(20px)";
        title.style.opacity = "0";
    }
    if (description) {
        description.style.transform = "translateY(-20px)";
        description.style.opacity = "0";
    }
};

window.shrinkImage = function () {
    let activeSlide = document.querySelector(".carousel-item.active");
    if (!activeSlide) {
        console.error("shrinkImage: Nema aktivnog slajda u DOM-u!");
        return;
    }

    let img = activeSlide.querySelector("img");
    if (!img) {
        console.error("shrinkImage: Nije pronađena slika u aktivnom slajdu!");
        return;
    }

    img.style.transform = "scale(0.5) translate(-50%)";
};

window.growImage = function () {
    let activeSlide = document.querySelector(".carousel-item.active");
    if (!activeSlide) {
        console.error("growImage: Nema aktivnog slajda u DOM-u!");
        return;
    }

    let img = activeSlide.querySelector("img");
    if (!img) {
        console.error("growImage: Nije pronađena slika u aktivnom slajdu!");
        return;
    }

    img.style.transform = "scale(1)";
};

window.resetCarouselState = () => {
    const activeSlide = document.querySelector(".carousel-item.active");
    if (activeSlide) {
        const img = activeSlide.querySelector("img");
        if (img) {
            img.style.transform = "scale(1)";
        }
    }
    if (window.hideText) {
        window.hideText(); // Sakrij tekst
    }
    if (window.collapseSeparator) {
        window.collapseSeparator(); // Sakrij separator
    }
    setTimeout(() => {
        if (window.expandSeparator) {
            window.expandSeparator(); // Prikaži separator
        }
        if (window.showText) {
            window.showText(); // Prikaži tekst
        }
    }, 500);
};


window.getWindowWidth = () => {
    return window.innerWidth;
};

window.setNavbarScrollEffect = (dotNetHelper) => {
    const navbar = document.getElementById("mainNavbar");

    function checkScroll() {
        const atTop = window.scrollY < 50;
        dotNetHelper.invokeMethodAsync("UpdateNavbarState", atTop);
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Pokreni odmah da postavi početno stanje
};



window.resetNavbarState = () => {
    window.scrollTo(0, 0); // Resetiraj scroll na vrh
    setTimeout(() => {
        const event = new Event("scroll");
        window.dispatchEvent(event); // Forsiraj ponovnu provjeru
    }, 50);
};