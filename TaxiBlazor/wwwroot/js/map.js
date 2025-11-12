window.initKornatiTourMap = async () => {
    const map = L.map('kornatiMap').setView([43.74, 15.5], 9);

    // Osnovni sloj - OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Bathymetry sloj iz OpenSeaMap
    L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenSeaMap contributors'
    }).addTo(map);


    const route = [
        [43.7337, 15.8910],   // Šibenik
        [43.7280, 15.8778],
        [43.7274, 15.8687],
        [43.7231, 15.8539],
        [43.7213, 15.8506],
        [43.7034, 15.7726],
        [43.7128, 15.7405],
        [43.7206, 15.6895],
        [43.7409, 15.5825],
        [43.7352, 15.4653],
        [43.7314, 15.4572],
        [43.7395, 15.4528],  // Opat
        [43.7346, 15.4507],
        [43.7324, 15.3894],
        [43.7503, 15.3563],
        [43.7555, 15.3570],
        [43.7598, 15.3440], // Piškera
        [43.7576, 15.3498],
        [43.7542, 15.3469],
        [43.7783, 15.2947],
        [43.8010, 15.2670],   // Mana
        [43.7989, 15.2619],
        [43.8027, 15.2565],
        [43.8120, 15.2630],
        [43.8159, 15.2459],
        [43.8206, 15.2503],  // Levrnaka
        [43.8159, 15.2459],
        [43.8110, 15.2723],
        [43.7912, 15.2971],
        [43.7717, 15.3494],
        [43.7616, 15.3773],
        [43.7568, 15.3685], //Lavsa
        [43.7616, 15.3773],
        [43.7196, 15.4705],
        [43.7107, 15.5382],
        [43.7133, 15.6536],
        [43.6902, 15.6966],
        [43.6883, 15.7085],  // Kaprije
    ];

    const polyline = L.polyline(route, {
        color: '#0078D7',
        weight: 4,
        opacity: 0.8,
        lineJoin: 'round',
        smoothFactor: 1,
    }).addTo(map);

    map.fitBounds(polyline.getBounds());

    const stops = [
        {
            coords: [43.7337, 15.8910],
            title: "Departure from Šibenik",
            description: "Departure from Šibenik waterfront at 9 am",
            image: "/images/sibenik.jpg"
        },
        {
            coords: [43.7395, 15.4528],
            title: "Entrance to the Kornati National Park",
            description: "Entering the national park and first stop to have a coffee and enjoy the view in a small bay.",
            image: "/images/Opat_Kornat.jpg"
        },
        {
            coords: [43.7598, 15.3440],
            title: "The island of Piškera",
            description: "Another stop and swimming in the clear sea, as well as sightseeing of nature and cliffs",
            image: "/images/Piskera.jpg"
        },
        {
            coords: [43.8010, 15.2670],
            title: "Mana Island",
            description: "A short tour of the ruins and a panoramic view.",
            image: "/images/Mana.jpeg"
        },
        {
            coords: [43.8206, 15.2503],
            title: "Levrnaka Bay",
            description: "Anchoring and swimming in the most popular beach in Kornati National Park.",
            image: "/images/Levrnaka.jpeg"
        },
        {
            coords: [43.7568, 15.3685],
            title: "Lavsa Island",
            description: "Anchoring and swimming in one of the more private coves.",
            image: "/images/Lavsa.jpg"
        },
        {
            coords: [43.6883, 15.7085],
            title: "Island of Kaprije",
            description: "A beautiful place with an excellent restaurant that we recommend (Restaurant Neptun)",
            image: "/images/Kaprije.jpg"
        },
    ];


    stops.forEach(stop => {
        L.marker(stop.coords)
            .addTo(map)
            .bindPopup(`
                <b>${stop.title}</b><br>
                <img src="${stop.image}" width="120" style="border-radius:8px;"><br>
                ${stop.description}
            `);
    });
};

window.initKrkaRivieraTourMap = () => {
    const map = L.map('krkaRivieraMap').setView([43.8, 15.9], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenSeaMap contributors'
    }).addTo(map);

    const route = [
        [43.7337, 15.8910],  // Šibenik
        [43.7459, 15.8717],
        [43.7622, 15.8500],
        [43.7746, 15.8416],
        [43.7781, 15.8469],
        [43.7812, 15.8462],
        [43.7836, 15.8511],
        [43.790257, 15.850084],
        [43.789364, 15.862636],
        [43.809420, 15.882772],
        [43.806347, 15.909116],
        [43.809993, 15.918571],
        [43.813795, 15.920448],
        [43.8162, 15.9228], // Skradin
        [43.813795, 15.920448],
        [43.809993, 15.918571],
        [43.806347, 15.909116],
        [43.809420, 15.882772],
        [43.789364, 15.862636],
        [43.790257, 15.850084],
        [43.7836, 15.8511],
        [43.7812, 15.8462],
        [43.7781, 15.8469],
        [43.7746, 15.8416],
        [43.7622, 15.8500],
        [43.7459, 15.8717],
        [43.729596, 15.882998],
        [43.7280, 15.8778],
        [43.7274, 15.8687],
        [43.7231, 15.8539],
        [43.7213, 15.8506],
        [43.704591, 15.828340],
        [43.6995, 15.8335], // Zlarin
        [43.712036, 15.777013],
        [43.7170, 15.7700],  // Tijat
        [43.712036, 15.777013],
        [43.715045, 15.782249],
        [43.7340, 15.7865] // Prvić
    ];

    const polyline = L.polyline(route, {
        color: '#28a745',
        weight: 5,
        opacity: 0.9,
        lineJoin: 'round'
    }).addTo(map);

    map.fitBounds(polyline.getBounds());

    const stops = [
        {
            coords: [43.7337, 15.8910],
            title: "Departure from Šibenik",
            description: "Departure from Šibenik waterfront at 9 am",
            image: "/images/sibenik.jpg"
        },
        {
            coords: [43.8162, 15.9228],
            title: "Skradin",
            description: "Entrance to the Krka National Park, where you board the national park boat and we wait for you to continue your journey",
            image: "/images/skradin.jpg"
        },
        {
            coords: [43.6995, 15.8335],
            title: "Island of Zlarin",
            description: "Known for its corals and ancient maritime tradition.",
            image: "/images/Zlarin.jpg"
        },
        {
            coords: [43.7170, 15.7700],
            title: "Tijašnica Bay (Tijat Island)",
            description: "A quiet and popular bay with crystal clear sea.",
            image: "/images/Tijat.jpg"
        },
        {
            coords: [43.7340, 15.7865],
            title: "Prvić Šepurine (island of Prvić)",
            description: "A historic place with Mediterranean architecture where life is somewhat calmer.",
            image: "/images/PrvićŠepurine.jpg"
        }
    ];

    stops.forEach(stop => {
        L.marker(stop.coords)
            .addTo(map)
            .bindPopup(`
            <b>${stop.title}</b><br>
            <img src="${stop.image}" width="120" style="border-radius:8px;"><br>
            ${stop.description}
            `);
    });
};

window.initArchipelagoTourMap = () => {
    const map = L.map('archipelagoMap').setView([43.72, 15.8], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenSeaMap contributors'
    }).addTo(map);

    const route = [
        [43.7337, 15.8910],  // Šibenik
        [43.7280, 15.8778],
        [43.7274, 15.8687],
        [43.7231, 15.8539],
        [43.7213, 15.8506],
        [43.704591, 15.828340],
        [43.6995, 15.8335],   // Zlarin
        [43.704467, 15.816453],
        [43.685477, 15.779975],
        [43.678375, 15.771826],
        [43.673415, 15.732376],
        [43.664635, 15.714958],
        [43.673810, 15.616456],
        [43.6700, 15.6222],   // Žirje (Uvala Mikavica – okvirna pozicija)
        [43.673810, 15.616456],
        [43.676888, 15.696063],
        [43.690420, 15.693402],
        [43.6883, 15.7085],   // Otok Kaprije (mjesto)
        [43.690420, 15.693402],
        [43.676888, 15.696063],
        [43.666955, 15.724387],
        [43.673415, 15.732376],
        [43.678375, 15.771826],
        [43.685477, 15.779975],
        [43.712076, 15.776143],
        [43.7170, 15.7700],   // Uvala Tijašnica (otok Tijat)
        [43.712036, 15.777013],
        [43.715045, 15.782249],
        [43.7340, 15.7865]    // Prvić Šepurine
    ];

    const polyline = L.polyline(route, {
        color: '#c10fff',
        weight: 5,
        opacity: 0.9,
        lineJoin: 'round'
    }).addTo(map);

    map.fitBounds(polyline.getBounds());

    const stops = [
        {
            coords: [43.7337, 15.8910],
            title: "Šibenik",
            description: "Departure from Šibenik waterfront at 9 am",
            image: "/images/sibenik.jpg"
        },
        {
            coords: [43.6995, 15.8335],
            title: "Island of Zlarin",
            description: "Known for its corals and ancient maritime tradition.",
            image: "/images/Zlarin.jpg"
        },
        {
            coords: [43.6700, 15.6222],
            title: "Žirje Island - Mikavica Bay",
            description: "A hidden cove ideal for swimming and diving.",
            image: "/images/Mikavica_Žirje.jpg"
        },
        {
            coords: [43.6883, 15.7085],
            title: "Island of Kaprije",
            description: "A beautiful place with an excellent restaurant that we recommend (Restaurant Neptun)",
            image: "/images/Kaprije.jpg"
        },
        {
            coords: [43.7170, 15.7700],
            title: "Tijašnica Bay (Tijat Island)",
            description: "A quiet and popular bay with crystal clear sea.",
            image: "/images/Tijat.jpg"
        },
        {
            coords: [43.7340, 15.7865],
            title: "Prvić Šepurine (island of Prvić)",
            description: "A historic place with Mediterranean architecture where life is somewhat calmer.",
            image: "/images/PrvićŠepurine.jpg"
        }
    ];

    stops.forEach(stop => {
        L.marker(stop.coords)
            .addTo(map)
            .bindPopup(`
            <b>${stop.title}</b><br>
            <img src="${stop.image}" width="120" style="border-radius:8px;"><br>
            ${stop.description}
            `);
    });
};

window.initRivieraTourMap = () => {
    const map = L.map('RivieraMap').setView([43.72, 15.8], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenSeaMap contributors'
    }).addTo(map);

    const route = [
        [43.7337, 15.8910],  // Šibenik
        [43.7280, 15.8778],
        [43.7274, 15.8687],
        [43.7231, 15.8539],
        [43.7213, 15.8506],
        [43.704591, 15.828340],
        [43.6995, 15.8335],   // Zlarin
        [43.712036, 15.777013],
        [43.7170, 15.7700],  // Tijat
        [43.712036, 15.777013],
        [43.715045, 15.782249],
        [43.7340, 15.7865] // Prvić
    ];

    const polyline = L.polyline(route, {
        color: '#e6ff0f',
        weight: 5,
        opacity: 0.9,
        lineJoin: 'round'
    }).addTo(map);

    map.fitBounds(polyline.getBounds());

    const stops = [
        {
            coords: [43.7337, 15.8910],
            title: "Šibenik",
            description: "Departure from Šibenik waterfront at 9 am or 3 pm",
            image: "/images/sibenik.jpg"
        },
        {
            coords: [43.6995, 15.8335],
            title: "Island of Zlarin",
            description: "Known for its corals and ancient maritime tradition.",
            image: "/images/Zlarin.jpg"
        },
        {
            coords: [43.7170, 15.7700],
            title: "Tijašnica Bay (Tijat Island)",
            description: "A quiet and popular bay with crystal clear sea.",
            image: "/images/Tijat.jpg"
        },
        {
            coords: [43.7340, 15.7865],
            title: "Prvić Šepurine (island of Prvić)",
            description: "A historic place with Mediterranean architecture where life is somewhat calmer.",
            image: "/images/PrvićŠepurine.jpg"
        }
    ];

    stops.forEach(stop => {
        L.marker(stop.coords)
            .addTo(map)
            .bindPopup(`
            <b>${stop.title}</b><br>
            <img src="${stop.image}" width="120" style="border-radius:8px;"><br>
            ${stop.description}
            `);
    });
};

window.initKrkaTourMap = () => {
    const map = L.map('KrkaMap').setView([43.72, 15.8], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenSeaMap contributors'
    }).addTo(map);

    const route = [
        [43.7337, 15.8910],  // Šibenik
        [43.7459, 15.8717],
        [43.7622, 15.8500],
        [43.7746, 15.8416],
        [43.7781, 15.8469],
        [43.7812, 15.8462],
        [43.7836, 15.8511],
        [43.790257, 15.850084],
        [43.789364, 15.862636],
        [43.809420, 15.882772],
        [43.806347, 15.909116],
        [43.809993, 15.918571],
        [43.813795, 15.920448],
        [43.8162, 15.9228], // Skradin
        [43.813795, 15.920448],
        [43.809993, 15.918571],
        [43.806347, 15.909116],
        [43.809420, 15.882772],
        [43.8172, 15.8879],   // Prukljan lake
    ];

    const polyline = L.polyline(route, {
        color: '#ff870f',
        weight: 5,
        opacity: 0.9,
        lineJoin: 'round'
    }).addTo(map);

    map.fitBounds(polyline.getBounds());

    const stops = [
        {
            coords: [43.7337, 15.8910],
            title: "Šibenik",
            description: "Departure from Šibenik waterfront at 9 am or 3 pm",
            image: "/images/sibenik.jpg"
        },
        {
            coords: [43.8162, 15.9228],
            title: "Skradin",
            description: "Entrance to the Krka National Park, where you board the national park boat and we wait for you to continue your journey",
            image: "/images/skradin.jpg"
        },
        {
            coords: [43.8172, 15.8879],
            title: "Prukljan Lake",
            description: "A quiet and popular bay with crystal clear sea.",
            image: "/images/Tijat.jpg"
        }
    ];

    stops.forEach(stop => {
        L.marker(stop.coords)
            .addTo(map)
            .bindPopup(`
            <b>${stop.title}</b><br>
            <img src="${stop.image}" width="120" style="border-radius:8px;"><br>
            ${stop.description}
            `);
    });
};

window.initPanoramaTourMap = () => {
    const map = L.map('PanoramaMap').setView([43.72, 15.8], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenSeaMap contributors'
    }).addTo(map);

    const route = [
        [43.7337, 15.8910],  // Šibenik
        [43.734998, 15.886970],
        [43.7416, 15.8809], // Banj
        [43.729307, 15.881091],
        [43.7280, 15.8778],
        [43.7274, 15.8687],
        [43.7231, 15.8539],
        [43.7222, 15.8542],   // Tvrđava svetog nikole
        [43.724702, 15.857960],
        [43.7274, 15.8687],
        [43.7274, 15.8745] // Hitlerove Oči
    ];

    const polyline = L.polyline(route, {
        color: '#ff0f21',
        weight: 5,
        opacity: 0.9,
        lineJoin: 'round'
    }).addTo(map);

    map.fitBounds(polyline.getBounds());

    const stops = [
        {
            coords: [43.7337, 15.8910],
            title: "Šibenik",
            description: "Departure from Šibenik waterfront at 9 am or 3 pm",
            image: "/images/sibenik.jpg"
        },
        {
            coords: [43.7416, 15.8809],
            title: "Skradin",
            description: "Entrance to the Krka National Park, where you board the national park boat and we wait for you to continue your journey",
            image: "/images/skradin.jpg"
        },
        {
            coords: [43.7222, 15.8542],
            title: "Prukljan Lake",
            description: "A quiet and popular bay with crystal clear sea.",
            image: "/images/Tijat.jpg"
        }, {
            coords: [43.7274, 15.8745],
            title: "Hitler's eyes",
            description: "A quiet and popular bay with crystal clear sea.",
            image: "/images/Tijat.jpg"
        }
    ];

    stops.forEach(stop => {
        L.marker(stop.coords)
            .addTo(map)
            .bindPopup(`
            <b>${stop.title}</b><br>
            <img src="${stop.image}" width="120" style="border-radius:8px;"><br>
            ${stop.description}
            `);
    });
};

window.initLocationMap = () => {
    const map = L.map('LocationMap').setView([43.72, 15.8], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const route = [
        [43.7338, 15.8910],  // Šibenik
    ];

    const polyline = L.polyline(route, {
        color: '#ff0f21',
        weight: 5,
        opacity: 0.9,
        lineJoin: 'round'
    }).addTo(map);

    map.fitBounds(polyline.getBounds());

    const stops = [
        {
            coords: [43.7338, 15.8910],
            title: "Šibenik waterfront",
            description: "When we're not at sea, we're usually here by the boat or at the information desk.",
            image: "/Logo bez pozadine topshit.png"
        }
    ];

    stops.forEach(stop => {
        L.marker(stop.coords)
            .addTo(map)
            .bindPopup(`
            <b>${stop.title}</b><br>
            <img src="${stop.image}" width="120" style="border-radius:8px;"><br>
            ${stop.description}
            `);
    });
};