let map;
let geocoder;
let autocomplete;
let marker;
let historicalCenters;
let pricePerNight = 0;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 42.8333, lng: 12.8333 }, // Default center to Italy
        zoom: 6
    });

    geocoder = new google.maps.Geocoder();

    // Calcola la media del range di prezzo
    function calculateAveragePrice(range) {
        return (range.min + range.max) / 2;
    }

    // Definizione dei range di prezzo
    const priceRanges = {
        "Agrigento": {
        "center": { min: 50, max: 100 },
        "outside": { min: 40, max: 80 }
    },
    "Alessandria": {
        "center": { min: 60, max: 150 },
        "outside": { min: 50, max: 100 }
    },
    "Ancona": {
        "center": { min: 60, max: 120 },
        "outside": { min: 50, max: 100 }
    },
    "Aosta": {
        "center": { min: 70, max: 140 },
        "outside": { min: 60, max: 120 }
    },
    "Arezzo": {
        "center": { min: 60, max: 120 },
        "outside": { min: 50, max: 100 }
    },
    "Ascoli Piceno": {
        "center": { min: 60, max: 110 },
        "outside": { min: 50, max: 90 }
    },
    "Asti": {
        "center": { min: 60, max: 110 },
        "outside": { min: 50, max: 90 }
    },
    "Avellino": {
        "center": { min: 50, max: 100 },
        "outside": { min: 40, max: 80 }
    },
    "Bari": {
        "center": { min: 70, max: 130 },
        "outside": { min: 50, max: 100 }
    },
    "Barletta": {
        "center": { min: 60, max: 120 },
        "outside": { min: 50, max: 90 }
    },
    "Andria": {
        "center": { min: 60, max: 120 },
        "outside": { min: 50, max: 90 }
    },
    "Trani": {
        "center": { min: 60, max: 120 },
        "outside": { min: 50, max: 90 }
    },
    "Belluno": {
        "center": { min: 60, max: 120 },
        "outside": { min: 50, max: 100 }
    },
    "Benevento": {
        "center": { min: 50, max: 100 },
        "outside": { min: 40, max: 80 }
    },
    "Bergamo": {
        "center": { min: 70, max: 130 },
        "outside": { min: 60, max: 110 }
    },
    "Biella": {
        "center": { min: 50, max: 100 },
        "outside": { min: 40, max: 80 }
    },
    "Bologna": {
        "center": { min: 90, max: 200 },
        "outside": { min: 80, max: 130 }
    },
    "Bolzano": {
        "center": { min: 100, max: 200 },
        "outside": { min: 80, max: 160 }
    },
    "Brescia": {
        "center": { min: 70, max: 140 },
        "outside": { min: 60, max: 120 }
    },
    "Brindisi": {
        "center": { min: 60, max: 120 },
        "outside": { min: 50, max: 90 }
    },
    "Cagliari": {
        "center": { min: 70, max: 150 },
        "outside": { min: 50, max: 100 }
    },
    "Caltanissetta": {
        "center": { min: 50, max: 100 },
        "outside": { min: 40, max: 80 }
    },
    "Campobasso": {
        "center": { min: 50, max: 100 },
        "outside": { min: 40, max: 80 }
    },
    "Caserta": {
        "center": { min: 60, max: 110 },
        "outside": { min: 50, max: 90 }
    },
    "Catania": {
        "center": { min: 70, max: 140 },
        "outside": { min: 60, max: 110 }
    },
    "Catanzaro": {
        "center": { min: 50, max: 100 },
        "outside": { min: 40, max: 80 }
    },
    "Chieti": {
        "center": { min: 60, max: 110 },
        "outside": { min: 50, max: 90 }
    },
    "Como": {
        "center": { min: 90, max: 180 },
        "outside": { min: 70, max: 140 }
    },
    "Cosenza": {
        "center": { min: 50, max: 100 },
        "outside": { min: 40, max: 80 }
    },
    "Cremona": {
        "center": { min: 60, max: 110 },
        "outside": { min: 50, max: 90 }
    },
    "Crotone": {
        "center": { min: 50, max: 100 },
        "outside": { min: 40, max: 80 }
    },
    "Cuneo": {
        "center": { min: 60, max: 120 },
        "outside": { min: 50, max: 100 }
    },
    "Enna": {
        "center": { min: 50, max: 100 },
        "outside": { min: 40, max: 80 }
    },
    "Fermo": {
        "center": { min: 60, max: 110 },
        "outside": { min: 50, max: 90 }
    },
    "Ferrara": {
        "center": { min: 70, max: 130 },
        "outside": { min: 60, max: 110 }
    },
    "Firenze": {
        "center": { min: 120, max: 250 },
        "outside": { min: 100, max: 200 }
    },
    "Foggia": {
        "center": { min: 50, max: 100 },
        "outside": { min: 40, max: 80 }
    },
    "Forlì-Cesena": {
        "center": { min: 60, max: 120 },
        "outside": { min: 50, max: 100 }
    },
    "Frosinone": {
        "center": { min: 50, max: 100 },
        "outside": { min: 40, max: 80 }
    },
    "Genova": {
        "center": { min: 90, max: 180 },
        "outside": { min: 70, max: 130 }
    },
    "Gorizia": {
        "center": { min: 60, max: 120 },
        "outside": { min: 50, max: 100 }
    },
    "Grosseto": {
        "center": { min: 70, max: 140 },
        "outside": { min: 60, max: 110 }
    },
    "Imperia": {
    "center": { min: 80, max: 150 },
    "outside": { min: 60, max: 120 }
},
"Isernia": {
    "center": { min: 50, max: 90 },
    "outside": { min: 40, max: 70 }
},
"L'Aquila": {
    "center": { min: 60, max: 110 },
    "outside": { min: 50, max: 90 }
},
"La Spezia": {
    "center": { min: 70, max: 140 },
    "outside": { min: 60, max: 120 }
},
"Latina": {
    "center": { min: 60, max: 120 },
    "outside": { min: 50, max: 100 }
},
"Lecce": {
    "center": { min: 70, max: 130 },
    "outside": { min: 50, max: 100 }
},
"Lecco": {
    "center": { min: 80, max: 150 },
    "outside": { min: 60, max: 120 }
},
"Livorno": {
    "center": { min: 70, max: 140 },
    "outside": { min: 50, max: 110 }
},
"Lodi": {
    "center": { min: 60, max: 110 },
    "outside": { min: 50, max: 90 }
},
"Lucca": {
    "center": { min: 80, max: 150 },
    "outside": { min: 60, max: 120 }
},
"Macerata": {
    "center": { min: 60, max: 120 },
    "outside": { min: 50, max: 100 }
},
"Mantova": {
    "center": { min: 70, max: 130 },
    "outside": { min: 60, max: 110 }
},
"Massa-Carrara": {
    "center": { min: 70, max: 140 },
    "outside": { min: 50, max: 110 }
},
"Matera": {
    "center": { min: 80, max: 160 },
    "outside": { min: 60, max: 130 }
},
"Messina": {
    "center": { min: 60, max: 120 },
    "outside": { min: 50, max: 100 }
},
"Milano": {
    "center": { min: 120, max: 250 },
    "outside": { min: 80, max: 180 }
},
"Modena": {
    "center": { min: 70, max: 140 },
    "outside": { min: 60, max: 110 }
},
"Monza e Brianza": {
    "center": { min: 80, max: 160 },
    "outside": { min: 60, max: 130 }
},
"Napoli": {
    "center": { min: 90, max: 180 },
    "outside": { min: 70, max: 140 }
},
"Novara": {
    "center": { min: 60, max: 120 },
    "outside": { min: 50, max: 100 }
},
"Nuoro": {
    "center": { min: 60, max: 110 },
    "outside": { min: 50, max: 90 }
},
"Oristano": {
    "center": { min: 50, max: 100 },
    "outside": { min: 40, max: 80 }
},
"Padova": {
    "center": { min: 80, max: 150 },
    "outside": { min: 60, max: 130 }
},
"Palermo": {
    "center": { min: 70, max: 140 },
    "outside": { min: 60, max: 110 }
},
"Parma": {
    "center": { min: 80, max: 150 },
    "outside": { min: 60, max: 120 }
},
"Pavia": {
    "center": { min: 70, max: 140 },
    "outside": { min: 50, max: 110 }
},
"Perugia": {
    "center": { min: 70, max: 140 },
    "outside": { min: 60, max: 110 }
},
"Pesaro e Urbino": {
    "center": { min: 60, max: 120 },
    "outside": { min: 50, max: 100 }
},
"Pescara": {
    "center": { min: 70, max: 130 },
    "outside": { min: 50, max: 100 }
},
"Piacenza": {
    "center": { min: 70, max: 130 },
    "outside": { min: 50, max: 110 }
},
"Pisa": {
    "center": { min: 80, max: 160 },
    "outside": { min: 60, max: 130 }
},
"Pistoia": {
    "center": { min: 70, max: 130 },
    "outside": { min: 50, max: 110 }
},
"Pordenone": {
    "center": { min: 60, max: 120 },
    "outside": { min: 50, max: 100 }
},
"Potenza": {
    "center": { min: 50, max: 100 },
    "outside": { min: 40, max: 80 }
},
"Prato": {
    "center": { min: 70, max: 140 },
    "outside": { min: 60, max: 110 }
},
"Ragusa": {
    "center": { min: 60, max: 110 },
    "outside": { min: 50, max: 90 }
},
"Ravenna": {
    "center": { min: 70, max: 130 },
    "outside": { min: 60, max: 110 }
},
"Reggio Calabria": {
    "center": { min: 60, max: 120 },
    "outside": { min: 50, max: 100 }
},
"Reggio Emilia": {
    "center": { min: 70, max: 130 },
    "outside": { min: 60, max: 110 }
},
"Rieti": {
    "center": { min: 50, max: 100 },
    "outside": { min: 40, max: 80 }
},
"Rimini": {
    "center": { min: 80, max: 150 },
    "outside": { min: 60, max: 120 }
},
"Roma": {
    "center": { min: 100, max: 250 },
    "outside": { min: 80, max: 180 }
},
"Rovigo": {
    "center": { min: 60, max: 110 },
    "outside": { min: 50, max: 90 }
},
"Salerno": {
    "center": { min: 70, max: 130 },
    "outside": { min: 60, max: 110 }
},
"Sassari": {
    "center": { min: 60, max: 110 },
    "outside": { min: 50, max: 90 }
},
"Savona": {
    "center": { min: 80, max: 150 },
    "outside": { min: 60, max: 120 }
},
"Siena": {
    "center": { min: 80, max: 160 },
    "outside": { min: 60, max: 130 }
},
"Siracusa": {
    "center": { min: 70, max: 130 },
    "outside": { min: 50, max: 110 }
},
"Sondrio": {
    "center": { min: 60, max: 120 },
    "outside": { min: 50, max: 100 }
},
"Sud Sardegna": {
    "center": { min: 70, max: 130 },
    "outside": { min: 50, max: 110 }
},
"Taranto": {
    "center": { min: 60, max: 120 },
    "outside": { min: 50, max: 100 }
},
"Teramo": {
    "center": { min: 60, max: 110 },
    "outside": { min: 50, max: 90 }
},
"Terni": {
    "center": { min: 60, max: 110 },
    "outside": { min: 50, max: 90 }
},
"Torino": {
    "center": { min: 80, max: 160 },
    "outside": { min: 60, max: 130 }
},
"Trapani": {
    "center": { min: 60, max: 120 },
    "outside": { min: 50, max: 100 }
},
"Trento": {
    "center": { min: 80, max: 150 },
    "outside": { min: 60, max: 120 }
},
"Treviso": {
    "center": { min: 70, max: 130 },
    "outside": { min: 60, max: 110 }
},
"Trieste": {
    "center": { min: 80, max: 150 },
    "outside": { min: 60, max: 120 }
},
"Udine": {
    "center": { min: 70, max: 130 },
    "outside": { min: 60, max: 110 }
},
"Varese": {
    "center": { min: 70, max: 130 },
    "outside": { min: 60, max: 110 }
},
"Venezia": {
    "center": { min: 120, max: 250 },
    "outside": { min: 80, max: 180 }
},
"Verbano-Cusio-Ossola": {
    "center": { min: 60, max: 120 },
    "outside": { min: 50, max: 100 }
},
"Vercelli": {
    "center": { min: 60, max: 110 },
    "outside": { min: 50, max: 90 }
},
"Verona": {
    "center": { min: 80, max: 160 },
    "outside": { min: 60, max: 130 }
},
"Vibo Valentia": {
    "center": { min: 50, max: 100 },
    "outside": { min: 40, max: 80 }
},
"Vicenza": {
    "center": { min: 70, max: 130 },
    "outside": { min: 60, max: 110 }
},
"Viterbo": {
    "center": { min: 60, max: 110 },
    "outside": { min: 50, max: 90 }
},
        // Aggiungi altre città qui
    };

    // Definisci i moltiplicatori stagionali
    const seasonalMultipliers = {
        "Agrigento": [0.8, 0.74, 0.87, 0.94, 1.06, 1.13, 1.26, 1.33, 1.2, 1, 0.87, 0.8],
"Alessandria": [0.85, 0.85, 0.85, 1.03, 1.05, 1.10, 1.15, 1.15, 1.10, 1.05, 0.85, 0.85],
"Ancona": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.25, 1.10, 0.90, 0.80],
"Aosta": [0.85, 0.90, 1.00, 1.10, 1.20, 1.25, 1.30, 1.25, 1.20, 1.10, 0.90, 0.85],
"Arezzo": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.25, 1.10, 0.90, 0.80],
"Ascoli Piceno": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.30, 1.20, 1.05, 0.85, 0.75],
"Asti": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Avellino": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Bari": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Barletta": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Andria": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Trani": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Belluno": [0.85, 0.90, 1.00, 1.10, 1.20, 1.25, 1.30, 1.25, 1.20, 1.10, 0.90, 0.85],
"Benevento": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Bergamo": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Biella": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Bologna": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.10, 1.30, 1.15, 0.95, 0.85],
"Bolzano": [0.90, 0.95, 1.05, 1.15, 1.25, 1.35, 1.40, 1.40, 1.35, 1.20, 1.00, 0.90],
"Brescia": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Brindisi": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Cagliari": [0.85, 0.90, 0.95, 1.00, 1.10, 1.25, 1.30, 1.30, 1.25, 1.10, 0.90, 0.85],
"Caltanissetta": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Campobasso": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Caserta": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.30, 1.20, 1.05, 0.85, 0.75],
"Catania": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Catanzaro": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Chieti": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Como": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Cosenza": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Cremona": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Crotone": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Cuneo": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Enna": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Fermo": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Ferrara": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Firenze": [0.85, 0.90, 1.00, 1.10, 1.20, 1.35, 1.40, 1.40, 1.35, 1.20, 0.95, 0.85],
"Foggia": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.35, 1.30, 1.15, 0.95, 0.80],
"Forlì-Cesena": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Frosinone": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Genova": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Gorizia": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Grosseto": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.25, 1.10, 0.90, 0.80],
"Imperia": [0.85, 0.90, 0.95, 1.05, 1.15, 1.25, 1.30, 1.30, 1.25, 1.10, 0.95, 0.85],
"Isernia": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"L'Aquila": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"La Spezia": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Latina": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.25, 1.10, 0.90, 0.80],
"Lecce": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Lecco": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Livorno": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Lodi": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Lucca": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Macerata": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Mantova": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Massa-Carrara": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Matera": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Messina": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Milano": [0.90, 0.95, 1.05, 1.15, 1.25, 1.35, 1.40, 1.40, 1.35, 1.20, 1.00, 0.90],
"Modena": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Monza e Brianza": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Napoli": [0.85, 0.90, 1.00, 1.10, 1.20, 1.35, 1.40, 1.40, 1.35, 1.20, 0.95, 0.85],
"Novara": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Nuoro": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Oristano": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Padova": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Palermo": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Parma": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Pavia": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Perugia": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Pesaro e Urbino": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Pescara": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Piacenza": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Pisa": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Pistoia": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Pordenone": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Potenza": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Prato": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Ragusa": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Ravenna": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Reggio Calabria": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Reggio Emilia": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Rieti": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Rimini": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Roma": [0.90, 0.95, 1.05, 1.15, 1.25, 1.35, 1.40, 1.40, 1.35, 1.20, 1.00, 0.90],
"Rovigo": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Salerno": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Sassari": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Savona": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Siena": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Siracusa": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Sondrio": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Sud Sardegna": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Taranto": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Teramo": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Terni": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Torino": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Trapani": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Trento": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Treviso": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Trieste": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Udine": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Varese": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Venezia": [0.90, 0.95, 1.05, 1.15, 1.25, 1.35, 1.40, 1.40, 1.35, 1.20, 1.00, 0.90],
"Verbano-Cusio-Ossola": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Vercelli": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Verona": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Vibo Valentia": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Vicenza": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Viterbo": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
        // Aggiungi altre città qui
    };

    // Definisci i limiti geografici e i prezzi medi per le città conosciute
    historicalCenters = {
        "Agrigento": {
        "center": { lat: 37.3111, lng: 13.5763 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(37.2980, 13.5610), // Sud-ovest
            new google.maps.LatLng(37.3250, 13.5900)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Agrigento"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Agrigento"].center) * 0.8
    },
    "Alessandria": {
        "center": { lat: 44.9122, lng: 8.6197 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(44.9050, 8.6100), // Sud-ovest
            new google.maps.LatLng(44.9200, 8.6300)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Alessandria"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Alessandria"].center) * 0.8
    },
    "Ancona": {
        "center": { lat: 43.6158, lng: 13.5189 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(43.6050, 13.5050), // Sud-ovest
            new google.maps.LatLng(43.6250, 13.5300)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Ancona"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Ancona"].center) * 0.8
    },
    "Aosta": {
        "center": { lat: 45.7370, lng: 7.3176 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.7300, 7.3050), // Sud-ovest
            new google.maps.LatLng(45.7450, 7.3300)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Aosta"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Aosta"].center) * 0.8
    },
    "Arezzo": {
        "center": { lat: 43.4633, lng: 11.8793 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(43.4550, 11.8700), // Sud-ovest
            new google.maps.LatLng(43.4700, 11.8900)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Arezzo"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Arezzo"].center) * 0.8
    },
    "Ascoli Piceno": {
        "center": { lat: 42.8512, lng: 13.5767 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(42.8400, 13.5600), // Sud-ovest
            new google.maps.LatLng(42.8600, 13.5900)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Ascoli Piceno"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Ascoli Piceno"].center) * 0.8
    },
    "Asti": {
        "center": { lat: 44.9006, lng: 8.2062 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(44.8900, 8.1950), // Sud-ovest
            new google.maps.LatLng(44.9100, 8.2150)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Asti"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Asti"].center) * 0.8
    },
    "Avellino": {
        "center": { lat: 40.9140, lng: 14.7871 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(40.9050, 14.7750), // Sud-ovest
            new google.maps.LatLng(40.9250, 14.8000)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Avellino"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Avellino"].center) * 0.8
    },
    "Bari": {
        "center": { lat: 41.1171, lng: 16.8719 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(41.1100, 16.8600), // Sud-ovest
            new google.maps.LatLng(41.1250, 16.8850)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Bari"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Bari"].center) * 0.8
    },

    "Barletta": {
    "center": { lat: 41.3210, lng: 16.2882 }, // Coordinate approssimative del centro di Barletta
    "bounds": new google.maps.LatLngBounds(
        new google.maps.LatLng(41.3100, 16.2730), // Sud-ovest
        new google.maps.LatLng(41.3320, 16.3030)  // Nord-est
    ),
    "priceInside": calculateAveragePrice(priceRanges["Barletta"].center),
    "priceOutside": calculateAveragePrice(priceRanges["Barletta"].center) * 0.8
},

"Trani": {
    "center": { lat: 41.2758, lng: 16.4135 }, // Coordinate approssimative del centro di Trani
    "bounds": new google.maps.LatLngBounds(
        new google.maps.LatLng(41.2650, 16.3980), // Sud-ovest
        new google.maps.LatLng(41.2870, 16.4280)  // Nord-est
    ),
    "priceInside": calculateAveragePrice(priceRanges["Trani"].center),
    "priceOutside": calculateAveragePrice(priceRanges["Trani"].center) * 0.8
},

"Andria": {
    "center": { lat: 41.2316, lng: 16.3070 }, // Coordinate approssimative del centro di Andria
    "bounds": new google.maps.LatLngBounds(
        new google.maps.LatLng(41.2200, 16.2920), // Sud-ovest
        new google.maps.LatLng(41.2430, 16.3220)  // Nord-est
    ),
    "priceInside": calculateAveragePrice(priceRanges["Andria"].center),
    "priceOutside": calculateAveragePrice(priceRanges["Andria"].center) * 0.8
},

    "Belluno": {
        "center": { lat: 46.1391, lng: 12.2175 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(46.1300, 12.2050), // Sud-ovest
            new google.maps.LatLng(46.1480, 12.2300)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Belluno"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Belluno"].center) * 0.8
    },
    "Benevento": {
        "center": { lat: 41.1295, lng: 14.7820 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(41.1200, 14.7700), // Sud-ovest
            new google.maps.LatLng(41.1380, 14.7950)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Benevento"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Benevento"].center) * 0.8
    },
    "Bergamo": {
        "center": { lat: 45.6983, lng: 9.6773 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.6900, 9.6650), // Sud-ovest
            new google.maps.LatLng(45.7070, 9.6900)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Bergamo"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Bergamo"].center) * 0.8
    },
    "Biella": {
        "center": { lat: 45.5643, lng: 8.0577 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.5550, 8.0450), // Sud-ovest
            new google.maps.LatLng(45.5750, 8.0700)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Biella"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Biella"].center) * 0.8
    },
    "Bologna": {
        "center": { lat: 44.4949, lng: 11.3426 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(44.4893, 11.3262), // Sud-ovest
            new google.maps.LatLng(44.5072, 11.3564)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Bologna"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Bologna"].center) * 0.8
    },
    "Bolzano": {
        "center": { lat: 46.4983, lng: 11.3548 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(46.4900, 11.3450), // Sud-ovest
            new google.maps.LatLng(46.5050, 11.3650)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Bolzano"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Bolzano"].center) * 0.8
    },
    "Brescia": {
        "center": { lat: 45.5398, lng: 10.2195 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.5300, 10.2050), // Sud-ovest
            new google.maps.LatLng(45.5500, 10.2350)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Brescia"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Brescia"].center) * 0.8
    },
    "Brindisi": {
        "center": { lat: 40.6366, lng: 17.9372 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(40.6250, 17.9250), // Sud-ovest
            new google.maps.LatLng(40.6450, 17.9500)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Brindisi"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Brindisi"].center) * 0.8
    },
    "Cagliari": {
        "center": { lat: 39.2238, lng: 9.1217 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(39.2150, 9.1100), // Sud-ovest
            new google.maps.LatLng(39.2300, 9.1300)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Cagliari"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Cagliari"].center) * 0.8
    },

    "Caltanissetta": {
        "center": { lat: 37.4907, lng: 14.0629 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(37.4800, 14.0500), // Sud-ovest
            new google.maps.LatLng(37.5000, 14.0750)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Caltanissetta"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Caltanissetta"].center) * 0.8
    },
    "Campobasso": {
        "center": { lat: 41.5603, lng: 14.6687 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(41.5500, 14.6550), // Sud-ovest
            new google.maps.LatLng(41.5700, 14.6800)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Campobasso"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Campobasso"].center) * 0.8
    },
    "Caserta": {
        "center": { lat: 41.0730, lng: 14.3320 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(41.0650, 14.3200), // Sud-ovest
            new google.maps.LatLng(41.0800, 14.3450)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Caserta"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Caserta"].center) * 0.8
    },
    "Catania": {
        "center": { lat: 37.5079, lng: 15.0830 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(37.5000, 15.0700), // Sud-ovest
            new google.maps.LatLng(37.5150, 15.0950)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Catania"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Catania"].center) * 0.8
    },
    "Catanzaro": {
        "center": { lat: 38.9054, lng: 16.5942 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(38.8950, 16.5800), // Sud-ovest
            new google.maps.LatLng(38.9150, 16.6050)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Catanzaro"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Catanzaro"].center) * 0.8
    },
    "Chieti": {
        "center": { lat: 42.3512, lng: 14.1675 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(42.3400, 14.1550), // Sud-ovest
            new google.maps.LatLng(42.3600, 14.1800)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Chieti"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Chieti"].center) * 0.8
    },
    "Como": {
        "center": { lat: 45.8081, lng: 9.0852 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.8000, 9.0700), // Sud-ovest
            new google.maps.LatLng(45.8150, 9.0950)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Como"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Como"].center) * 0.8
    },
    "Cosenza": {
        "center": { lat: 39.2983, lng: 16.2539 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(39.2900, 16.2400), // Sud-ovest
            new google.maps.LatLng(39.3050, 16.2650)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Cosenza"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Cosenza"].center) * 0.8
    },
    "Cremona": {
        "center": { lat: 45.1333, lng: 10.0234 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.1250, 10.0100), // Sud-ovest
            new google.maps.LatLng(45.1400, 10.0350)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Cremona"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Cremona"].center) * 0.8
    },
    "Crotone": {
        "center": { lat: 39.0851, lng: 17.1219 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(39.0750, 17.1100), // Sud-ovest
            new google.maps.LatLng(39.0950, 17.1350)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Crotone"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Crotone"].center) * 0.8
    },
    "Cuneo": {
        "center": { lat: 44.3848, lng: 7.5428 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(44.3750, 7.5300), // Sud-ovest
            new google.maps.LatLng(44.3950, 7.5550)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Cuneo"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Cuneo"].center) * 0.8
    },
    "Enna": {
        "center": { lat: 37.5671, lng: 14.2794 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(37.5550, 14.2650), // Sud-ovest
            new google.maps.LatLng(37.5800, 14.2950)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Enna"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Enna"].center) * 0.8
    },
    "Fermo": {
        "center": { lat: 43.1609, lng: 13.7217 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(43.1500, 13.7100), // Sud-ovest
            new google.maps.LatLng(43.1700, 13.7350)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Fermo"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Fermo"].center) * 0.8
    },

    "Ferrara": {
        "center": { lat: 44.8350, lng: 11.6198 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(44.8250, 11.6050), // Sud-ovest
            new google.maps.LatLng(44.8450, 11.6350)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Ferrara"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Ferrara"].center) * 0.8
    },
    "Foggia": {
        "center": { lat: 41.4622, lng: 15.5446 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(41.4500, 15.5300), // Sud-ovest
            new google.maps.LatLng(41.4750, 15.5600)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Foggia"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Foggia"].center) * 0.8
    },
    "Forlì-Cesena": {
        "center": { lat: 44.2226, lng: 12.0406 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(44.2100, 12.0250), // Sud-ovest
            new google.maps.LatLng(44.2350, 12.0550)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Forlì-Cesena"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Forlì-Cesena"].center) * 0.8
    },
    "Frosinone": {
        "center": { lat: 41.6412, lng: 13.3454 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(41.6300, 13.3300), // Sud-ovest
            new google.maps.LatLng(41.6500, 13.3600)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Frosinone"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Frosinone"].center) * 0.8
    },
    "Genova": {
        "center": { lat: 44.4056, lng: 8.9463 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(44.3950, 8.9300), // Sud-ovest
            new google.maps.LatLng(44.4150, 8.9600)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Genova"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Genova"].center) * 0.8
    },
    "Gorizia": {
        "center": { lat: 45.9402, lng: 13.6216 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.9300, 13.6050), // Sud-ovest
            new google.maps.LatLng(45.9500, 13.6350)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Gorizia"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Gorizia"].center) * 0.8
    },
    "Grosseto": {
        "center": { lat: 42.7603, lng: 11.1137 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(42.7500, 11.1000), // Sud-ovest
            new google.maps.LatLng(42.7700, 11.1250)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Grosseto"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Grosseto"].center) * 0.8
    },
    "Imperia": {
        "center": { lat: 43.8897, lng: 8.0314 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(43.8800, 8.0150), // Sud-ovest
            new google.maps.LatLng(43.9000, 8.0450)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Imperia"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Imperia"].center) * 0.8
    },
    "Isernia": {
        "center": { lat: 41.5943, lng: 14.2307 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(41.5850, 14.2150), // Sud-ovest
            new google.maps.LatLng(41.6050, 14.2450)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Isernia"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Isernia"].center) * 0.8
    },
    "L'Aquila": {
        "center": { lat: 42.3498, lng: 13.3995 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(42.3400, 13.3850), // Sud-ovest
            new google.maps.LatLng(42.3600, 13.4150)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["L'Aquila"].center),
        "priceOutside": calculateAveragePrice(priceRanges["L'Aquila"].center) * 0.8
    },
    "La Spezia": {
        "center": { lat: 44.1070, lng: 9.8241 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(44.0950, 9.8100), // Sud-ovest
            new google.maps.LatLng(44.1150, 9.8350)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["La Spezia"].center),
        "priceOutside": calculateAveragePrice(priceRanges["La Spezia"].center) * 0.8
    },
    "Latina": {
        "center": { lat: 41.4673, lng: 12.9037 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(41.4550, 12.8900), // Sud-ovest
            new google.maps.LatLng(41.4800, 12.9150)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Latina"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Latina"].center) * 0.8
    },
    "Lecce": {
        "center": { lat: 40.3528, lng: 18.1741 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(40.3400, 18.1600), // Sud-ovest
            new google.maps.LatLng(40.3600, 18.1800)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Lecce"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Lecce"].center) * 0.8
    },
    "Lecco": {
        "center": { lat: 45.8530, lng: 9.3906 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.8450, 9.3750), // Sud-ovest
            new google.maps.LatLng(45.8600, 9.4050)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Lecco"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Lecco"].center) * 0.8
    },

    "Livorno": {
        "center": { lat: 43.5485, lng: 10.3106 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(43.5400, 10.2950), // Sud-ovest
            new google.maps.LatLng(43.5550, 10.3250)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Livorno"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Livorno"].center) * 0.8
    },
    "Lodi": {
        "center": { lat: 45.3140, lng: 9.5036 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.3050, 9.4900), // Sud-ovest
            new google.maps.LatLng(45.3220, 9.5150)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Lodi"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Lodi"].center) * 0.8
    },
    "Lucca": {
        "center": { lat: 43.8430, lng: 10.5089 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(43.8350, 10.4950), // Sud-ovest
            new google.maps.LatLng(43.8500, 10.5200)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Lucca"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Lucca"].center) * 0.8
    },
    "Macerata": {
        "center": { lat: 43.2993, lng: 13.4527 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(43.2900, 13.4400), // Sud-ovest
            new google.maps.LatLng(43.3100, 13.4650)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Macerata"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Macerata"].center) * 0.8
    },
    "Mantova": {
        "center": { lat: 45.1564, lng: 10.7914 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.1470, 10.7750), // Sud-ovest
            new google.maps.LatLng(45.1650, 10.8050)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Mantova"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Mantova"].center) * 0.8
    },
    "Massa-Carrara": {
        "center": { lat: 44.0358, lng: 10.1405 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(44.0250, 10.1250), // Sud-ovest
            new google.maps.LatLng(44.0450, 10.1550)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Massa-Carrara"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Massa-Carrara"].center) * 0.8
    },
    "Matera": {
        "center": { lat: 40.6665, lng: 16.6044 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(40.6550, 16.5900), // Sud-ovest
            new google.maps.LatLng(40.6750, 16.6150)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Matera"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Matera"].center) * 0.8
    },
    "Messina": {
        "center": { lat: 38.1938, lng: 15.5540 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(38.1850, 15.5400), // Sud-ovest
            new google.maps.LatLng(38.2030, 15.5700)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Messina"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Messina"].center) * 0.8
    },
    "Milano": {
    "center": { lat: 45.4642, lng: 9.1900 },
    "bounds": new google.maps.LatLngBounds(
        new google.maps.LatLng(45.4590, 9.1800), // Sud-ovest
        new google.maps.LatLng(45.4700, 9.2000)  // Nord-est
    ),
    "priceInside": calculateAveragePrice(priceRanges["Milano"].center),
    "priceOutside": calculateAveragePrice(priceRanges["Milano"].center) * 0.8
},
    "Modena": {
        "center": { lat: 44.6471, lng: 10.9252 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(44.6350, 10.9100), // Sud-ovest
            new google.maps.LatLng(44.6550, 10.9400)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Modena"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Modena"].center) * 0.8
    },
    "Monza e Brianza": {
        "center": { lat: 45.5845, lng: 9.2744 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.5750, 9.2600), // Sud-ovest
            new google.maps.LatLng(45.5950, 9.2900)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Monza e Brianza"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Monza e Brianza"].center) * 0.8
    },
    "Napoli": {
        "center": { lat: 40.8522, lng: 14.2681 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(40.8450, 14.2600), // Sud-ovest
            new google.maps.LatLng(40.8600, 14.2750)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Napoli"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Napoli"].center) * 0.8
    },
    "Novara": {
        "center": { lat: 45.4448, lng: 8.6223 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.4350, 8.6050), // Sud-ovest
            new google.maps.LatLng(45.4550, 8.6400)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Novara"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Novara"].center) * 0.8
    },
    "Nuoro": {
        "center": { lat: 40.3212, lng: 9.3319 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(40.3100, 9.3150), // Sud-ovest
            new google.maps.LatLng(40.3300, 9.3450)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Nuoro"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Nuoro"].center) * 0.8
    },
    "Oristano": {
        "center": { lat: 39.9036, lng: 8.5944 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(39.8900, 8.5800), // Sud-ovest
            new google.maps.LatLng(39.9150, 8.6100)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Oristano"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Oristano"].center) * 0.8
    },
    "Padova": {
        "center": { lat: 45.4064, lng: 11.8768 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.3950, 11.8600), // Sud-ovest
            new google.maps.LatLng(45.4150, 11.8900)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Padova"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Padova"].center) * 0.8
    },

    "Palermo": {
        "center": { lat: 38.1157, lng: 13.3615 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(38.1050, 13.3500), // Sud-ovest
            new google.maps.LatLng(38.1250, 13.3700)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Palermo"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Palermo"].center) * 0.8
    },
    "Parma": {
        "center": { lat: 44.8015, lng: 10.3279 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(44.7900, 10.3150), // Sud-ovest
            new google.maps.LatLng(44.8100, 10.3400)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Parma"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Parma"].center) * 0.8
    },
    "Pavia": {
        "center": { lat: 45.1850, lng: 9.1605 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.1750, 9.1450), // Sud-ovest
            new google.maps.LatLng(45.1950, 9.1750)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Pavia"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Pavia"].center) * 0.8
    },
    "Perugia": {
        "center": { lat: 43.1107, lng: 12.3908 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(43.1000, 12.3750), // Sud-ovest
            new google.maps.LatLng(43.1200, 12.4050)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Perugia"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Perugia"].center) * 0.8
    },
    "Pesaro e Urbino": {
        "center": { lat: 43.9083, lng: 12.9125 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(43.9000, 12.8950), // Sud-ovest
            new google.maps.LatLng(43.9200, 12.9300)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Pesaro e Urbino"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Pesaro e Urbino"].center) * 0.8
    },
    "Pescara": {
        "center": { lat: 42.4618, lng: 14.2161 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(42.4500, 14.2000), // Sud-ovest
            new google.maps.LatLng(42.4700, 14.2300)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Pescara"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Pescara"].center) * 0.8
    },
    "Piacenza": {
        "center": { lat: 45.0522, lng: 9.6924 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.0400, 9.6750), // Sud-ovest
            new google.maps.LatLng(45.0600, 9.7100)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Piacenza"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Piacenza"].center) * 0.8
    },
    "Pisa": {
        "center": { lat: 43.7169, lng: 10.4037 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(43.7050, 10.3900), // Sud-ovest
            new google.maps.LatLng(43.7300, 10.4150)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Pisa"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Pisa"].center) * 0.8
    },
    "Pistoia": {
        "center": { lat: 43.9305, lng: 10.9226 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(43.9200, 10.9050), // Sud-ovest
            new google.maps.LatLng(43.9400, 10.9400)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Pistoia"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Pistoia"].center) * 0.8
    },
    "Pordenone": {
        "center": { lat: 45.9547, lng: 12.6605 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.9450, 12.6450), // Sud-ovest
            new google.maps.LatLng(45.9650, 12.6750)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Pordenone"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Pordenone"].center) * 0.8
    },
    "Potenza": {
        "center": { lat: 40.6401, lng: 15.8086 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(40.6300, 15.7950), // Sud-ovest
            new google.maps.LatLng(40.6500, 15.8200)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Potenza"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Potenza"].center) * 0.8
    },
    "Prato": {
        "center": { lat: 43.8809, lng: 11.0961 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(43.8700, 11.0800), // Sud-ovest
            new google.maps.LatLng(43.8900, 11.1100)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Prato"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Prato"].center) * 0.8
    },
    "Ragusa": {
        "center": { lat: 36.9282, lng: 14.7310 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(36.9180, 14.7150), // Sud-ovest
            new google.maps.LatLng(36.9380, 14.7450)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Ragusa"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Ragusa"].center) * 0.8
    },
    "Ravenna": {
        "center": { lat: 44.4184, lng: 12.2035 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(44.4100, 12.1900), // Sud-ovest
            new google.maps.LatLng(44.4300, 12.2150)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Ravenna"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Ravenna"].center) * 0.8
    },
    "Reggio Calabria": {
        "center": { lat: 38.1143, lng: 15.6501 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(38.1050, 15.6350), // Sud-ovest
            new google.maps.LatLng(38.1250, 15.6650)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Reggio Calabria"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Reggio Calabria"].center) * 0.8
    },
    "Reggio Emilia": {
        "center": { lat: 44.6980, lng: 10.6297 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(44.6850, 10.6150), // Sud-ovest
            new google.maps.LatLng(44.7100, 10.6450)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Reggio Emilia"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Reggio Emilia"].center) * 0.8
    },
    "Rieti": {
        "center": { lat: 42.4026, lng: 12.8576 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(42.3900, 12.8400), // Sud-ovest
            new google.maps.LatLng(42.4150, 12.8750)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Rieti"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Rieti"].center) * 0.8
    },
    "Rimini": {
        "center": { lat: 44.0678, lng: 12.5695 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(44.0550, 12.5550), // Sud-ovest
            new google.maps.LatLng(44.0800, 12.5850)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Rimini"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Rimini"].center) * 0.8
    },
    "Roma": {
        "center": { lat: 41.9028, lng: 12.4964 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(41.8962, 12.4865), // Sud-ovest
            new google.maps.LatLng(41.9094, 12.5063)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Roma"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Roma"].center) * 0.8
    },
    "Rovigo": {
        "center": { lat: 45.0712, lng: 11.7886 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.0600, 11.7750), // Sud-ovest
            new google.maps.LatLng(45.0800, 11.8050)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Rovigo"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Rovigo"].center) * 0.8
    },

    "Salerno": {
        "center": { lat: 40.6824, lng: 14.7681 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(40.6700, 14.7550), // Sud-ovest
            new google.maps.LatLng(40.6950, 14.7800)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Salerno"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Salerno"].center) * 0.8
    },
    "Sassari": {
        "center": { lat: 40.7259, lng: 8.5608 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(40.7150, 8.5450), // Sud-ovest
            new google.maps.LatLng(40.7350, 8.5750)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Sassari"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Sassari"].center) * 0.8
    },
    "Savona": {
        "center": { lat: 44.3083, lng: 8.4813 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(44.3000, 8.4650), // Sud-ovest
            new google.maps.LatLng(44.3150, 8.4950)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Savona"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Savona"].center) * 0.8
    },
    "Siena": {
        "center": { lat: 43.3188, lng: 11.3308 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(43.3100, 11.3150), // Sud-ovest
            new google.maps.LatLng(43.3250, 11.3450)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Siena"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Siena"].center) * 0.8
    },
    "Siracusa": {
        "center": { lat: 37.0755, lng: 15.2866 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(37.0650, 15.2700), // Sud-ovest
            new google.maps.LatLng(37.0850, 15.3000)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Siracusa"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Siracusa"].center) * 0.8
    },
    "Sondrio": {
        "center": { lat: 46.1699, lng: 9.8712 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(46.1600, 9.8550), // Sud-ovest
            new google.maps.LatLng(46.1800, 9.8850)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Sondrio"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Sondrio"].center) * 0.8
    },
    "Taranto": {
        "center": { lat: 40.4644, lng: 17.2470 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(40.4550, 17.2300), // Sud-ovest
            new google.maps.LatLng(40.4750, 17.2600)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Taranto"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Taranto"].center) * 0.8
    },
    "Teramo": {
        "center": { lat: 42.6612, lng: 13.6986 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(42.6500, 13.6850), // Sud-ovest
            new google.maps.LatLng(42.6700, 13.7100)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Teramo"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Teramo"].center) * 0.8
    },
    "Terni": {
        "center": { lat: 42.5636, lng: 12.6435 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(42.5500, 12.6300), // Sud-ovest
            new google.maps.LatLng(42.5750, 12.6550)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Terni"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Terni"].center) * 0.8
    },
    "Torino": {
        "center": { lat: 45.0703, lng: 7.6869 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.0600, 7.6800), // Sud-ovest
            new google.maps.LatLng(45.0800, 7.6900)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Torino"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Torino"].center) * 0.8
    },
    "Trapani": {
        "center": { lat: 38.0185, lng: 12.5113 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(38.0100, 12.4950), // Sud-ovest
            new google.maps.LatLng(38.0300, 12.5250)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Trapani"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Trapani"].center) * 0.8
    },
    "Trento": {
        "center": { lat: 46.0664, lng: 11.1217 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(46.0550, 11.1050), // Sud-ovest
            new google.maps.LatLng(46.0750, 11.1350)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Trento"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Trento"].center) * 0.8
    },
    "Treviso": {
        "center": { lat: 45.6669, lng: 12.2425 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.6550, 12.2250), // Sud-ovest
            new google.maps.LatLng(45.6750, 12.2550)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Treviso"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Treviso"].center) * 0.8
    },
    "Trieste": {
        "center": { lat: 45.6495, lng: 13.7768 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(45.6400, 13.7600), // Sud-ovest
            new google.maps.LatLng(45.6600, 13.7900)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Trieste"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Trieste"].center) * 0.8
    },
    "Udine": {
        "center": { lat: 46.0658, lng: 13.2376 },
        "bounds": new google.maps.LatLngBounds(
            new google.maps.LatLng(46.0550, 13.2200), // Sud-ovest
            new google.maps.LatLng(46.0750, 13.2500)  // Nord-est
        ),
        "priceInside": calculateAveragePrice(priceRanges["Udine"].center),
        "priceOutside": calculateAveragePrice(priceRanges["Udine"].center) * 0.8
    },

    "Varese": {
    "center": { lat: 45.8206, lng: 8.8257 },
    "bounds": new google.maps.LatLngBounds(
        new google.maps.LatLng(45.8100, 8.8100), // Sud-ovest
        new google.maps.LatLng(45.8300, 8.8400)  // Nord-est
    ),
    "priceInside": calculateAveragePrice(priceRanges["Varese"].center),
    "priceOutside": calculateAveragePrice(priceRanges["Varese"].center) * 0.8
},

"Venezia": {
    "center": { lat: 45.4408, lng: 12.3155 },
    "bounds": new google.maps.LatLngBounds(
        new google.maps.LatLng(45.4300, 12.3000), // Sud-ovest
        new google.maps.LatLng(45.4500, 12.3300)  // Nord-est
    ),
    "priceInside": calculateAveragePrice(priceRanges["Venezia"].center),
    "priceOutside": calculateAveragePrice(priceRanges["Venezia"].center) * 0.8
},

"Verbano-Cusio-Ossola": {
    "center": { lat: 45.9213, lng: 8.5512 },
    "bounds": new google.maps.LatLngBounds(
        new google.maps.LatLng(45.9100, 8.5350), // Sud-ovest
        new google.maps.LatLng(45.9300, 8.5650)  // Nord-est
    ),
    "priceInside": calculateAveragePrice(priceRanges["Verbano-Cusio-Ossola"].center),
    "priceOutside": calculateAveragePrice(priceRanges["Verbano-Cusio-Ossola"].center) * 0.8
},

"Vercelli": {
    "center": { lat: 45.3239, lng: 8.4199 },
    "bounds": new google.maps.LatLngBounds(
        new google.maps.LatLng(45.3130, 8.4050), // Sud-ovest
        new google.maps.LatLng(45.3340, 8.4350)  // Nord-est
    ),
    "priceInside": calculateAveragePrice(priceRanges["Vercelli"].center),
    "priceOutside": calculateAveragePrice(priceRanges["Vercelli"].center) * 0.8
},
"Verona": {
    "center": { lat: 45.4384, lng: 10.9916 },
    "bounds": new google.maps.LatLngBounds(
        new google.maps.LatLng(45.4280, 10.9800), // Sud-ovest
        new google.maps.LatLng(45.4480, 11.0000)  // Nord-est
    ),
    "priceInside": calculateAveragePrice(priceRanges["Verona"].center),
    "priceOutside": calculateAveragePrice(priceRanges["Verona"].center) * 0.8
},

"Vibo Valentia": {
    "center": { lat: 38.6761, lng: 16.1007 },
    "bounds": new google.maps.LatLngBounds(
        new google.maps.LatLng(38.6650, 16.0850), // Sud-ovest
        new google.maps.LatLng(38.6850, 16.1150)  // Nord-est
    ),
    "priceInside": calculateAveragePrice(priceRanges["Vibo Valentia"].center),
    "priceOutside": calculateAveragePrice(priceRanges["Vibo Valentia"].center) * 0.8
},

"Vicenza": {
    "center": { lat: 45.5455, lng: 11.5354 },
    "bounds": new google.maps.LatLngBounds(
        new google.maps.LatLng(45.5350, 11.5200), // Sud-ovest
        new google.maps.LatLng(45.5550, 11.5500)  // Nord-est
    ),
    "priceInside": calculateAveragePrice(priceRanges["Vicenza"].center),
    "priceOutside": calculateAveragePrice(priceRanges["Vicenza"].center) * 0.8
},

"Viterbo": {
    "center": { lat: 42.4192, lng: 12.1055 },
    "bounds": new google.maps.LatLngBounds(
        new google.maps.LatLng(42.4100, 12.0900), // Sud-ovest
        new google.maps.LatLng(42.4300, 12.1200)  // Nord-est
    ),
    "priceInside": calculateAveragePrice(priceRanges["Viterbo"].center),
    "priceOutside": calculateAveragePrice(priceRanges["Viterbo"].center) * 0.8
},
        // Aggiungi altre città qui
    };

    autocomplete = new google.maps.places.Autocomplete(document.getElementById("address"));
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            document.getElementById("result").textContent = "Nessun dettaglio di luogo trovato.";
            return;
        }

        if (marker) {
            marker.setMap(null);
        }

        marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

        map.setCenter(place.geometry.location);
        map.setZoom(15);

        checkHistoricCenter(); // Aggiorna anche il risultato della rendita
    });
}

function checkHistoricCenter() {
    document.getElementById("price-result").textContent = "";

    const place = autocomplete.getPlace();
    if (!place || !place.geometry) {
        const address = document.getElementById("address").value;
        geocodeAddress(address);
    } else {
        const latLng = place.geometry.location;
        updateResult(latLng, place.address_components);
    }

    calculatePrice();
}

function geocodeAddress(address) {
    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status === 'OK' && results[0]) {
            const location = results[0].geometry.location;
            updateResult(location, results[0].address_components);
        } else {
            document.getElementById("result").textContent = "Indirizzo non trovato.";
        }
    });
}

function updateResult(latLng, addressComponents) {
    let city = null;

    for (let i = 0; i < addressComponents.length; i++) {
        if (addressComponents[i].types.includes("locality")) {
            city = addressComponents[i].long_name;
            break;
        }
    }

    if (!city) {
        document.getElementById("result").textContent = "Città non identificata.";
        return;
    }

    document.getElementById("price-form").classList.add("hidden");

    if (historicalCenters[city]) {
        const bounds = historicalCenters[city].bounds;
        if (bounds.contains(latLng)) {
            pricePerNight = historicalCenters[city].priceInside;
            document.getElementById("result").innerHTML = `
                <span style="color: black;font-size:15px;">Tariffa media a notte nella zona:</span>
                <span style="color: green;font-size:20px;">${pricePerNight} €</span> *`;
        } else {
            pricePerNight = historicalCenters[city].priceOutside;
            document.getElementById("result").innerHTML = `
                <span style="color: black;font-size:15px;">Tariffa media a notte nella zona:</span>
                <span style="color: green;font-size:20px;">${pricePerNight} €</span> *`;
        }
        document.getElementById("price-form").classList.remove("hidden");
    } else {
        const nearestCity = findNearestCity(latLng);
        if (nearestCity) {
            const discountRate = 0.80;
            const nearestCityPriceRange = historicalCenters[nearestCity].priceInside;
            const discountedPricePerNight = nearestCityPriceRange * discountRate;
            pricePerNight = discountedPricePerNight;

            document.getElementById("result").innerHTML = `
                <span style="color: black;font-size:15px;">Tariffa media a notte nella zona:</span>
                <span style="color: green;font-size:20px;">${pricePerNight.toFixed(2)} €</span> *`;
            document.getElementById("price-form").classList.remove("hidden");
        } else {
            document.getElementById("result").textContent = "Contattaci per saperne di più su questa località!";
        }
    }
}

function findNearestCity(latLng) {
    let nearestCity = null;
    let minDistance = Number.MAX_VALUE;

    for (let city in historicalCenters) {
        const centerLatLng = new google.maps.LatLng(
            historicalCenters[city].center.lat,
            historicalCenters[city].center.lng
        );
        const distance = google.maps.geometry.spherical.computeDistanceBetween(latLng, centerLatLng);

        if (distance < minDistance) {
            minDistance = distance;
            nearestCity = city;
        }
    }

    return nearestCity;
}

function updateNightsLabel() {
    const nights = document.getElementById("nights").value;
    document.getElementById("nights-label").textContent = `${nights} ${nights > 1 ? 'notti' : 'notte'}`;
}

function calculatePrice() {
    const nights = document.getElementById("nights").value || 1;
    const beds = document.getElementById("beds").value;
    const currentMonth = new Date().getMonth();
    const place = autocomplete.getPlace();
    let city = place && place.address_components.find(comp => comp.types.includes("locality")) 
               ? place.address_components.find(comp => comp.types.includes("locality")).long_name 
               : null;

    let priceMultiplier = 1;

    if (historicalCenters[city]) {
        const isInCenter = historicalCenters[city].bounds.contains(marker.getPosition());
        const priceRange = isInCenter ? historicalCenters[city].priceInside : historicalCenters[city].priceOutside;
        const seasonalMultiplier = getSeasonalMultiplier(city, currentMonth);

        priceMultiplier = getBedsMultiplier(city, parseInt(beds));

        const totalPrice = Math.floor(nights * priceRange * seasonalMultiplier * priceMultiplier);
        document.getElementById("price-result").innerHTML = `
            <div><span style="color: black;margin-top:20px;margin-bottom:35px;">INCOME</span></div>
            <span style="color: rgba(44, 44, 44, 0.701);font-size: 5vh;margin-top:3vh;">${totalPrice} €</span>
            <div><a href="m.tariffe.html" style="color:blue;font-size:3vw">*Scopri come calcoliamo le tariffe</a></div>`
            ;
    } else {
        const nearestCity = findNearestCity(marker.getPosition());
        if (nearestCity && historicalCenters[nearestCity]) {
            const seasonalMultiplier = getSeasonalMultiplier(nearestCity, currentMonth);
            const discountRate = 0.80;
            const nearestCityPriceRange = historicalCenters[nearestCity].priceInside;
            const discountedPricePerNight = nearestCityPriceRange * discountRate;

            priceMultiplier = getBedsMultiplier(nearestCity, parseInt(beds));

            const totalPrice = Math.floor(nights * discountedPricePerNight * seasonalMultiplier * priceMultiplier);
            document.getElementById("price-result").innerHTML = `
                <div><span style="color: black;margin-top:20px;margin-bottom:35px;">INCOME</span></div>
                <span style="color: rgba(44, 44, 44, 0.701);font-size: 60px;margin-top:20px;">${totalPrice} €</span>`;
        } else {
            console.error("Non è stato possibile trovare una città vicina valida o la città non è riconosciuta.");
        }
    }
}

function getBedsMultiplier(city, beds) {
    switch (city) {
        case "Agrigento":
            switch (beds) {
                case 1: return 0.62;
                case 2: return 0.9;
                case 3: return 1.1;
                case 4: return 1.2;
                case 5: return 1.5;
                case 6: return 1.7;
                case 7: return 1.8;
                case 8: return 2.1;
                case 9: return 2.2;
                case 10: return 2.2;
                default: return 1;
            }
    
        case "Alessandria":
            switch (beds) {
                case 1: return 0.45;
                case 2: return 0.7;
                case 3: return 1.9;
                case 4: return 2.6;
                case 5: return 3.7;
                case 6: return 4.3;
                case 7: return 4.4;
                case 8: return 5;
                case 9: return 3.1;
                case 10: return 3.1;
                default: return 1;
            }
    
        case "Ancona":
            switch (beds) {
                case 1: return 0.45;
                case 2: return 0.9;
                case 3: return 1.05;
                case 4: return 1.15;
                case 5: return 1.6;
                case 6: return 1.8;
                case 7: return 1.9;
                case 8: return 2.2;
                case 9: return 2.3;
                case 10: return 2.3;
                default: return 1;
            }
    
        case "Aosta":
            switch (beds) {
                case 1: return 0.5;
                case 2: return 0.9;
                case 3: return 1.2;
                case 4: return 1.3;
                case 5: return 1.65;
                case 6: return 1.8;
                case 7: return 1.9;
                case 8: return 2.3;
                case 9: return 2.4;
                case 10: return 2.4;
                default: return 1;
            }
    
        case "Arezzo":
            switch (beds) {
                case 1: return 0.45;
                case 2: return 0.85;
                case 3: return 1.0;
                case 4: return 1.1;
                case 5: return 1.55;
                case 6: return 1.7;
                case 7: return 1.8;
                case 8: return 2.2;
                case 9: return 2.3;
                case 10: return 2.3;
                default: return 1;
            }

            case "Ascoli Piceno":
                switch (beds) {
                    case 1: return 0.4;
                    case 2: return 0.8;
                    case 3: return 1.0;
                    case 4: return 1.1;
                    case 5: return 1.5;
                    case 6: return 1.7;
                    case 7: return 1.8;
                    case 8: return 2.1;
                    case 9: return 2.2;
                    case 10: return 2.2;
                    default: return 1;
                }
        
            case "Asti":
                switch (beds) {
                    case 1: return 0.45;
                    case 2: return 0.9;
                    case 3: return 1.05;
                    case 4: return 1.15;
                    case 5: return 1.6;
                    case 6: return 1.8;
                    case 7: return 1.9;
                    case 8: return 2.2;
                    case 9: return 2.3;
                    case 10: return 2.3;
                    default: return 1;
                }
        
            case "Avellino":
                switch (beds) {
                    case 1: return 0.4;
                    case 2: return 0.85;
                    case 3: return 1.0;
                    case 4: return 1.1;
                    case 5: return 1.55;
                    case 6: return 1.7;
                    case 7: return 1.8;
                    case 8: return 2.1;
                    case 9: return 2.2;
                    case 10: return 2.2;
                    default: return 1;
                }
        
            case "Bari":
                switch (beds) {
                    case 1: return 0.6;
                    case 2: return 0.9;
                    case 3: return 1.2;
                    case 4: return 1.3;
                    case 5: return 1.65;
                    case 6: return 1.8;
                    case 7: return 1.9;
                    case 8: return 2.3;
                    case 9: return 2.4;
                    case 10: return 2.4;
                    default: return 1;
                }
        
            case "Barletta":
                switch (beds) {
                    case 1: return 0.48;
                    case 2: return 0.7;
                    case 3: return 1.5;
                    case 4: return 1.55;
                    case 5: return 1.65;
                    case 6: return 1.7;
                    case 7: return 1.8;
                    case 8: return 2.2;
                    case 9: return 2.3;
                    case 10: return 2.3;
                    default: return 1;
                }
        
            case "Andria":
                switch (beds) {
                    case 1: return 0.46;
                    case 2: return 0.85;
                    case 3: return 1.6;
                    case 4: return 1.7;
                    case 5: return 2;
                    case 6: return 2.1;
                    case 7: return 2.5;
                    case 8: return 3;
                    case 9: return 3;
                    case 10: return 3;
                    default: return 1;
                }
        
            case "Trani":
                switch (beds) {
                    case 1: return 0.48;
                    case 2: return 0.7;
                    case 3: return 1.0;
                    case 4: return 1.1;
                    case 5: return 1.55;
                    case 6: return 1.7;
                    case 7: return 1.8;
                    case 8: return 2.2;
                    case 9: return 2.3;
                    case 10: return 2.3;
                    default: return 1;
                }
        
            case "Belluno":
                switch (beds) {
                    case 1: return 0.55;
                    case 2: return 0.95;
                    case 3: return 1.15;
                    case 4: return 1.25;
                    case 5: return 1.7;
                    case 6: return 1.9;
                    case 7: return 2.0;
                    case 8: return 2.4;
                    case 9: return 2.5;
                    case 10: return 2.5;
                    default: return 1;
                }
        
            case "Benevento":
                switch (beds) {
                    case 1: return 0.4;
                    case 2: return 0.85;
                    case 3: return 1.0;
                    case 4: return 1.1;
                    case 5: return 1.55;
                    case 6: return 1.7;
                    case 7: return 1.8;
                    case 8: return 2.1;
                    case 9: return 2.2;
                    case 10: return 2.2;
                    default: return 1;
                }
        
            case "Bergamo":
                switch (beds) {
                    case 1: return 0.5;
                    case 2: return 0.9;
                    case 3: return 1.2;
                    case 4: return 1.3;
                    case 5: return 1.65;
                    case 6: return 1.8;
                    case 7: return 1.9;
                    case 8: return 2.3;
                    case 9: return 2.4;
                    case 10: return 2.4;
                    default: return 1;
                }
        
            case "Biella":
                switch (beds) {
                    case 1: return 0.4;
                    case 2: return 0.8;
                    case 3: return 1.0;
                    case 4: return 1.1;
                    case 5: return 1.5;
                    case 6: return 1.7;
                    case 7: return 1.8;
                    case 8: return 2.1;
                    case 9: return 2.2;
                    case 10: return 2.2;
                    default: return 1;
                }
        
            case "Bologna":
                switch (beds) {
                    case 1: return 0.50;
                    case 2: return 0.91;
                    case 3: return 1.15;
                    case 4: return 1.25;
                    case 5: return 1.7;
                    case 6: return 1.9;
                    case 7: return 2.0;
                    case 8: return 2.4;
                    case 9: return 2.5;
                    case 10: return 2.5;
                    default: return 1;
                }

                case "Bolzano":
                    switch (beds) {
                        case 1: return 0.6;
                        case 2: return 1.0;
                        case 3: return 1.3;
                        case 4: return 1.4;
                        case 5: return 1.8;
                        case 6: return 2.0;
                        case 7: return 2.1;
                        case 8: return 2.5;
                        case 9: return 2.6;
                        case 10: return 2.6;
                        default: return 1;
                    }
            
                case "Brescia":
                    switch (beds) {
                        case 1: return 0.5;
                        case 2: return 0.9;
                        case 3: return 1.2;
                        case 4: return 1.3;
                        case 5: return 1.65;
                        case 6: return 1.8;
                        case 7: return 1.9;
                        case 8: return 2.3;
                        case 9: return 2.4;
                        case 10: return 2.4;
                        default: return 1;
                    }
            
                case "Brindisi":
                    switch (beds) {
                        case 1: return 0.45;
                        case 2: return 0.85;
                        case 3: return 1.0;
                        case 4: return 1.1;
                        case 5: return 1.55;
                        case 6: return 1.7;
                        case 7: return 1.8;
                        case 8: return 2.2;
                        case 9: return 2.3;
                        case 10: return 2.3;
                        default: return 1;
                    }
            
                case "Cagliari":
                    switch (beds) {
                        case 1: return 0.5;
                        case 2: return 0.9;
                        case 3: return 1.2;
                        case 4: return 1.3;
                        case 5: return 1.65;
                        case 6: return 1.8;
                        case 7: return 1.9;
                        case 8: return 2.3;
                        case 9: return 2.4;
                        case 10: return 2.4;
                        default: return 1;
                    }
            
                case "Caltanissetta":
                    switch (beds) {
                        case 1: return 0.4;
                        case 2: return 0.8;
                        case 3: return 1.0;
                        case 4: return 1.1;
                        case 5: return 1.5;
                        case 6: return 1.7;
                        case 7: return 1.8;
                        case 8: return 2.1;
                        case 9: return 2.2;
                        case 10: return 2.2;
                        default: return 1;
                    }
            
                case "Campobasso":
                    switch (beds) {
                        case 1: return 0.4;
                        case 2: return 0.85;
                        case 3: return 1.0;
                        case 4: return 1.1;
                        case 5: return 1.55;
                        case 6: return 1.7;
                        case 7: return 1.8;
                        case 8: return 2.1;
                        case 9: return 2.2;
                        case 10: return 2.2;
                        default: return 1;
                    }
            
                case "Caserta":
                    switch (beds) {
                        case 1: return 0.4;
                        case 2: return 0.85;
                        case 3: return 1.0;
                        case 4: return 1.1;
                        case 5: return 1.55;
                        case 6: return 1.7;
                        case 7: return 1.8;
                        case 8: return 2.1;
                        case 9: return 2.2;
                        case 10: return 2.2;
                        default: return 1;
                    }
            
                case "Catania":
                    switch (beds) {
                        case 1: return 0.5;
                        case 2: return 0.9;
                        case 3: return 1.2;
                        case 4: return 1.3;
                        case 5: return 1.65;
                        case 6: return 1.8;
                        case 7: return 1.9;
                        case 8: return 2.3;
                        case 9: return 2.4;
                        case 10: return 2.4;
                        default: return 1;
                    }
            
                case "Catanzaro":
                    switch (beds) {
                        case 1: return 0.4;
                        case 2: return 0.8;
                        case 3: return 1.0;
                        case 4: return 1.1;
                        case 5: return 1.5;
                        case 6: return 1.7;
                        case 7: return 1.8;
                        case 8: return 2.1;
                        case 9: return 2.2;
                        case 10: return 2.2;
                        default: return 1;
                    }
            
                case "Chieti":
                    switch (beds) {
                        case 1: return 0.45;
                        case 2: return 0.85;
                        case 3: return 1.0;
                        case 4: return 1.1;
                        case 5: return 1.55;
                        case 6: return 1.7;
                        case 7: return 1.8;
                        case 8: return 2.2;
                        case 9: return 2.3;
                        case 10: return 2.3;
                        default: return 1;
                    }
            
                case "Como":
                    switch (beds) {
                        case 1: return 0.55;
                        case 2: return 0.95;
                        case 3: return 1.15;
                        case 4: return 1.25;
                        case 5: return 1.7;
                        case 6: return 1.9;
                        case 7: return 2.0;
                        case 8: return 2.4;
                        case 9: return 2.5;
                        case 10: return 2.5;
                        default: return 1;
                    }
            
                case "Cosenza":
                    switch (beds) {
                        case 1: return 0.4;
                        case 2: return 0.8;
                        case 3: return 1.0;
                        case 4: return 1.1;
                        case 5: return 1.5;
                        case 6: return 1.7;
                        case 7: return 1.8;
                        case 8: return 2.1;
                        case 9: return 2.2;
                        case 10: return 2.2;
                        default: return 1;
                    }
            
                case "Cremona":
                    switch (beds) {
                        case 1: return 0.45;
                        case 2: return 0.9;
                        case 3: return 1.1;
                        case 4: return 1.2;
                        case 5: return 1.6;
                        case 6: return 1.8;
                        case 7: return 1.9;
                        case 8: return 2.3;
                        case 9: return 2.4;
                        case 10: return 2.4;
                        default: return 1;
                    }
            
                case "Crotone":
                    switch (beds) {
                        case 1: return 0.4;
                        case 2: return 0.8;
                        case 3: return 1.0;
                        case 4: return 1.1;
                        case 5: return 1.5;
                        case 6: return 1.7;
                        case 7: return 1.8;
                        case 8: return 2.1;
                        case 9: return 2.2;
                        case 10: return 2.2;
                        default: return 1;
                    }
            
                case "Cuneo":
                    switch (beds) {
                        case 1: return 0.5;
                        case 2: return 0.9;
                        case 3: return 1.2;
                        case 4: return 1.3;
                        case 5: return 1.65;
                        case 6: return 1.8;
                        case 7: return 1.9;
                        case 8: return 2.3;
                        case 9: return 2.4;
                        case 10: return 2.4;
                        default: return 1;
                    }
            
                case "Enna":
                    switch (beds) {
                        case 1: return 0.4;
                        case 2: return 0.8;
                        case 3: return 1.0;
                        case 4: return 1.1;
                        case 5: return 1.5;
                        case 6: return 1.7;
                        case 7: return 1.8;
                        case 8: return 2.1;
                        case 9: return 2.2;
                        case 10: return 2.2;
                        default: return 1;
                    }

                    case "Ferrara":
                        switch (beds) {
                            case 1: return 0.45;
                            case 2: return 0.85;
                            case 3: return 1.0;
                            case 4: return 1.1;
                            case 5: return 1.55;
                            case 6: return 1.7;
                            case 7: return 1.8;
                            case 8: return 2.2;
                            case 9: return 2.3;
                            case 10: return 2.3;
                            default: return 1;
                        }
                
                    case "Firenze":
                        switch (beds) {
                            case 1: return 0.55;
                            case 2: return 0.95;
                            case 3: return 1.15;
                            case 4: return 1.25;
                            case 5: return 1.7;
                            case 6: return 1.9;
                            case 7: return 2.0;
                            case 8: return 2.4;
                            case 9: return 2.5;
                            case 10: return 2.5;
                            default: return 1;
                        }
                
                    case "Foggia":
                        switch (beds) {
                            case 1: return 0.4;
                            case 2: return 0.8;
                            case 3: return 1.0;
                            case 4: return 1.1;
                            case 5: return 1.5;
                            case 6: return 1.7;
                            case 7: return 1.8;
                            case 8: return 2.1;
                            case 9: return 2.2;
                            case 10: return 2.2;
                            default: return 1;
                        }
                
                    case "Forlì":
                        switch (beds) {
                            case 1: return 0.45;
                            case 2: return 0.9;
                            case 3: return 1.05;
                            case 4: return 1.15;
                            case 5: return 1.6;
                            case 6: return 1.8;
                            case 7: return 1.9;
                            case 8: return 2.2;
                            case 9: return 2.3;
                            case 10: return 2.3;
                            default: return 1;
                        }
                
                    case "Genova":
                        switch (beds) {
                            case 1: return 0.6;
                            case 2: return 1.0;
                            case 3: return 1.3;
                            case 4: return 1.4;
                            case 5: return 1.8;
                            case 6: return 2.0;
                            case 7: return 2.1;
                            case 8: return 2.5;
                            case 9: return 2.6;
                            case 10: return 2.6;
                            default: return 1;
                        }
                
                    case "Grosseto":
                        switch (beds) {
                            case 1: return 0.4;
                            case 2: return 0.85;
                            case 3: return 1.0;
                            case 4: return 1.1;
                            case 5: return 1.55;
                            case 6: return 1.7;
                            case 7: return 1.8;
                            case 8: return 2.1;
                            case 9: return 2.2;
                            case 10: return 2.2;
                            default: return 1;
                        }
                
                    case "Imperia":
                        switch (beds) {
                            case 1: return 0.4;
                            case 2: return 0.8;
                            case 3: return 1.0;
                            case 4: return 1.1;
                            case 5: return 1.5;
                            case 6: return 1.7;
                            case 7: return 1.8;
                            case 8: return 2.1;
                            case 9: return 2.2;
                            case 10: return 2.2;
                            default: return 1;
                        }
                
                    case "Isernia":
                        switch (beds) {
                            case 1: return 0.4;
                            case 2: return 0.85;
                            case 3: return 1.0;
                            case 4: return 1.1;
                            case 5: return 1.55;
                            case 6: return 1.7;
                            case 7: return 1.8;
                            case 8: return 2.1;
                            case 9: return 2.2;
                            case 10: return 2.2;
                            default: return 1;
                        }
                
                    case "L'Aquila":
                        switch (beds) {
                            case 1: return 0.45;
                            case 2: return 0.85;
                            case 3: return 1.0;
                            case 4: return 1.1;
                            case 5: return 1.55;
                            case 6: return 1.7;
                            case 7: return 1.8;
                            case 8: return 2.2;
                            case 9: return 2.3;
                            case 10: return 2.3;
                            default: return 1;
                        }
                
                    case "La Spezia":
                        switch (beds) {
                            case 1: return 0.55;
                            case 2: return 0.95;
                            case 3: return 1.15;
                            case 4: return 1.25;
                            case 5: return 1.7;
                            case 6: return 1.9;
                            case 7: return 2.0;
                            case 8: return 2.4;
                            case 9: return 2.5;
                            case 10: return 2.5;
                            default: return 1;
                        }
                
                    case "Latina":
                        switch (beds) {
                            case 1: return 0.45;
                            case 2: return 0.85;
                            case 3: return 1.0;
                            case 4: return 1.1;
                            case 5: return 1.55;
                            case 6: return 1.7;
                            case 7: return 1.8;
                            case 8: return 2.2;
                            case 9: return 2.3;
                            case 10: return 2.3;
                            default: return 1;
                        }
                
                    case "Lecce":
                        switch (beds) {
                            case 1: return 0.55;
                            case 2: return 0.95;
                            case 3: return 1.15;
                            case 4: return 1.25;
                            case 5: return 1.7;
                            case 6: return 1.9;
                            case 7: return 2.0;
                            case 8: return 2.4;
                            case 9: return 2.5;
                            case 10: return 2.5;
                            default: return 1;
                        }
                
                    case "Lecco":
                        switch (beds) {
                            case 1: return 0.45;
                            case 2: return 0.85;
                            case 3: return 1.0;
                            case 4: return 1.1;
                            case 5: return 1.55;
                            case 6: return 1.7;
                            case 7: return 1.8;
                            case 8: return 2.2;
                            case 9: return 2.3;
                            case 10: return 2.3;
                            default: return 1;
                        }
                
                    case "Livorno":
                        switch (beds) {
                            case 1: return 0.45;
                            case 2: return 0.85;
                            case 3: return 1.0;
                            case 4: return 1.1;
                            case 5: return 1.55;
                            case 6: return 1.7;
                            case 7: return 1.8;
                            case 8: return 2.2;
                            case 9: return 2.3;
                            case 10: return 2.3;
                            default: return 1;
                        }
                
                    case "Lodi":
                        switch (beds) {
                            case 1: return 0.4;
                            case 2: return 0.85;
                            case 3: return 1.0;
                            case 4: return 1.1;
                            case 5: return 1.55;
                            case 6: return 1.7;
                            case 7: return 1.8;
                            case 8: return 2.1;
                            case 9: return 2.2;
                            case 10: return 2.2;
                            default: return 1;
                        }
                
                    case "Lucca":
                        switch (beds) {
                            case 1: return 0.45;
                            case 2: return 0.85;
                            case 3: return 1.0;
                            case 4: return 1.1;
                            case 5: return 1.55;
                            case 6: return 1.7;
                            case 7: return 1.8;
                            case 8: return 2.2;
                            case 9: return 2.3;
                            case 10: return 2.3;
                            default: return 1;
                        }
                
                    case "Macerata":
                        switch (beds) {
                            case 1: return 0.4;
                            case 2: return 0.8;
                            case 3: return 1.0;
                            case 4: return 1.1;
                            case 5: return 1.5;
                            case 6: return 1.7;
                            case 7: return 1.8;
                            case 8: return 2.1;
                            case 9: return 2.2;
                            case 10: return 2.2;
                            default: return 1;
                        }
                
                    case "Mantova":
                        switch (beds) {
                            case 1: return 0.45;
                            case 2: return 0.85;
                            case 3: return 1.0;
                            case 4: return 1.1;
                            case 5: return 1.55;
                            case 6: return 1.7;
                            case 7: return 1.8;
                            case 8: return 2.2;
                            case 9: return 2.3;
                            case 10: return 2.3;
                            default: return 1;
                        }

                        case "Massa":
                            switch (beds) {
                                case 1: return 0.4;
                                case 2: return 0.85;
                                case 3: return 1.0;
                                case 4: return 1.1;
                                case 5: return 1.55;
                                case 6: return 1.7;
                                case 7: return 1.8;
                                case 8: return 2.1;
                                case 9: return 2.2;
                                case 10: return 2.2;
                                default: return 1;
                            }
                    
                        case "Matera":
                            switch (beds) {
                                case 1: return 0.45;
                                case 2: return 0.85;
                                case 3: return 1.0;
                                case 4: return 1.1;
                                case 5: return 1.55;
                                case 6: return 1.7;
                                case 7: return 1.8;
                                case 8: return 2.2;
                                case 9: return 2.3;
                                case 10: return 2.3;
                                default: return 1;
                            }
                    
                        case "Messina":
                            switch (beds) {
                                case 1: return 0.55;
                                case 2: return 0.95;
                                case 3: return 1.15;
                                case 4: return 1.25;
                                case 5: return 1.7;
                                case 6: return 1.9;
                                case 7: return 2.0;
                                case 8: return 2.4;
                                case 9: return 2.5;
                                case 10: return 2.5;
                                default: return 1;
                            }
                    
                        case "Milano":
                            switch (beds) {
                                case 1: return 0.6;
                                case 2: return 1.0;
                                case 3: return 1.3;
                                case 4: return 1.4;
                                case 5: return 1.8;
                                case 6: return 2.0;
                                case 7: return 2.1;
                                case 8: return 2.5;
                                case 9: return 2.6;
                                case 10: return 2.6;
                                default: return 1;
                            }
                    
                        case "Modena":
                            switch (beds) {
                                case 1: return 0.55;
                                case 2: return 0.95;
                                case 3: return 1.15;
                                case 4: return 1.25;
                                case 5: return 1.7;
                                case 6: return 1.9;
                                case 7: return 2.0;
                                case 8: return 2.4;
                                case 9: return 2.5;
                                case 10: return 2.5;
                                default: return 1;
                            }
                    
                        case "Napoli":
                            switch (beds) {
                                case 1: return 0.6;
                                case 2: return 1.0;
                                case 3: return 1.3;
                                case 4: return 1.4;
                                case 5: return 1.8;
                                case 6: return 2.0;
                                case 7: return 2.1;
                                case 8: return 2.5;
                                case 9: return 2.6;
                                case 10: return 2.6;
                                default: return 1;
                            }
                    
                        case "Novara":
                            switch (beds) {
                                case 1: return 0.45;
                                case 2: return 0.85;
                                case 3: return 1.0;
                                case 4: return 1.1;
                                case 5: return 1.55;
                                case 6: return 1.7;
                                case 7: return 1.8;
                                case 8: return 2.2;
                                case 9: return 2.3;
                                case 10: return 2.3;
                                default: return 1;
                            }
                    
                        case "Nuoro":
                            switch (beds) {
                                case 1: return 0.4;
                                case 2: return 0.8;
                                case 3: return 1.0;
                                case 4: return 1.1;
                                case 5: return 1.5;
                                case 6: return 1.7;
                                case 7: return 1.8;
                                case 8: return 2.1;
                                case 9: return 2.2;
                                case 10: return 2.2;
                                default: return 1;
                            }
                    
                        case "Oristano":
                            switch (beds) {
                                case 1: return 0.4;
                                case 2: return 0.85;
                                case 3: return 1.0;
                                case 4: return 1.1;
                                case 5: return 1.55;
                                case 6: return 1.7;
                                case 7: return 1.8;
                                case 8: return 2.1;
                                case 9: return 2.2;
                                case 10: return 2.2;
                                default: return 1;
                            }
                    
                        case "Padova":
                            switch (beds) {
                                case 1: return 0.5;
                                case 2: return 0.9;
                                case 3: return 1.2;
                                case 4: return 1.3;
                                case 5: return 1.65;
                                case 6: return 1.8;
                                case 7: return 1.9;
                                case 8: return 2.3;
                                case 9: return 2.4;
                                case 10: return 2.4;
                                default: return 1;
                            }
                    
                        case "Palermo":
                            switch (beds) {
                                case 1: return 0.55;
                                case 2: return 0.95;
                                case 3: return 1.15;
                                case 4: return 1.25;
                                case 5: return 1.7;
                                case 6: return 1.9;
                                case 7: return 2.0;
                                case 8: return 2.4;
                                case 9: return 2.5;
                                case 10: return 2.5;
                                default: return 1;
                            }
                    
                        case "Parma":
                            switch (beds) {
                                case 1: return 0.45;
                                case 2: return 0.85;
                                case 3: return 1.0;
                                case 4: return 1.1;
                                case 5: return 1.55;
                                case 6: return 1.7;
                                case 7: return 1.8;
                                case 8: return 2.2;
                                case 9: return 2.3;
                                case 10: return 2.3;
                                default: return 1;
                            }
                    
                        case "Pavia":
                            switch (beds) {
                                case 1: return 0.45;
                                case 2: return 0.85;
                                case 3: return 1.0;
                                case 4: return 1.1;
                                case 5: return 1.55;
                                case 6: return 1.7;
                                case 7: return 1.8;
                                case 8: return 2.2;
                                case 9: return 2.3;
                                case 10: return 2.3;
                                default: return 1;
                            }
                    
                        case "Perugia":
                            switch (beds) {
                                case 1: return 0.55;
                                case 2: return 0.95;
                                case 3: return 1.15;
                                case 4: return 1.25;
                                case 5: return 1.7;
                                case 6: return 1.9;
                                case 7: return 2.0;
                                case 8: return 2.4;
                                case 9: return 2.5;
                                case 10: return 2.5;
                                default: return 1;
                            }
                    
                        case "Pesaro":
                            switch (beds) {
                                case 1: return 0.45;
                                case 2: return 0.85;
                                case 3: return 1.0;
                                case 4: return 1.1;
                                case 5: return 1.55;
                                case 6: return 1.7;
                                case 7: return 1.8;
                                case 8: return 2.2;
                                case 9: return 2.3;
                                case 10: return 2.3;
                                default: return 1;
                            }
                    
                        case "Pescara":
                            switch (beds) {
                                case 1: return 0.5;
                                case 2: return 0.9;
                                case 3: return 1.2;
                                case 4: return 1.3;
                                case 5: return 1.65;
                                case 6: return 1.8;
                                case 7: return 1.9;
                                case 8: return 2.3;
                                case 9: return 2.4;
                                case 10: return 2.4;
                                default: return 1;
                            }
                    
                        case "Piacenza":
                            switch (beds) {
                                case 1: return 0.45;
                                case 2: return 0.85;
                                case 3: return 1.0;
                                case 4: return 1.1;
                                case 5: return 1.55;
                                case 6: return 1.7;
                                case 7: return 1.8;
                                case 8: return 2.2;
                                case 9: return 2.3;
                                case 10: return 2.3;
                                default: return 1;
                            }
                    
                        case "Pisa":
                            switch (beds) {
                                case 1: return 0.55;
                                case 2: return 0.95;
                                case 3: return 1.15;
                                case 4: return 1.25;
                                case 5: return 1.7;
                                case 6: return 1.9;
                                case 7: return 2.0;
                                case 8: return 2.4;
                                case 9: return 2.5;
                                case 10: return 2.5;
                                default: return 1;
                            }

                            case "Pistoia":
                                switch (beds) {
                                    case 1: return 0.45;
                                    case 2: return 0.85;
                                    case 3: return 1.0;
                                    case 4: return 1.1;
                                    case 5: return 1.55;
                                    case 6: return 1.7;
                                    case 7: return 1.8;
                                    case 8: return 2.2;
                                    case 9: return 2.3;
                                    case 10: return 2.3;
                                    default: return 1;
                                }
                        
                            case "Pordenone":
                                switch (beds) {
                                    case 1: return 0.4;
                                    case 2: return 0.8;
                                    case 3: return 1.0;
                                    case 4: return 1.1;
                                    case 5: return 1.5;
                                    case 6: return 1.7;
                                    case 7: return 1.8;
                                    case 8: return 2.1;
                                    case 9: return 2.2;
                                    case 10: return 2.2;
                                    default: return 1;
                                }
                        
                            case "Potenza":
                                switch (beds) {
                                    case 1: return 0.4;
                                    case 2: return 0.85;
                                    case 3: return 1.0;
                                    case 4: return 1.1;
                                    case 5: return 1.55;
                                    case 6: return 1.7;
                                    case 7: return 1.8;
                                    case 8: return 2.1;
                                    case 9: return 2.2;
                                    case 10: return 2.2;
                                    default: return 1;
                                }
                        
                            case "Prato":
                                switch (beds) {
                                    case 1: return 0.5;
                                    case 2: return 0.9;
                                    case 3: return 1.2;
                                    case 4: return 1.3;
                                    case 5: return 1.65;
                                    case 6: return 1.8;
                                    case 7: return 1.9;
                                    case 8: return 2.3;
                                    case 9: return 2.4;
                                    case 10: return 2.4;
                                    default: return 1;
                                }
                        
                            case "Ragusa":
                                switch (beds) {
                                    case 1: return 0.55;
                                    case 2: return 0.95;
                                    case 3: return 1.15;
                                    case 4: return 1.25;
                                    case 5: return 1.7;
                                    case 6: return 1.9;
                                    case 7: return 2.0;
                                    case 8: return 2.4;
                                    case 9: return 2.5;
                                    case 10: return 2.5;
                                    default: return 1;
                                }
                        
                            case "Ravenna":
                                switch (beds) {
                                    case 1: return 0.5;
                                    case 2: return 0.9;
                                    case 3: return 1.2;
                                    case 4: return 1.3;
                                    case 5: return 1.65;
                                    case 6: return 1.8;
                                    case 7: return 1.9;
                                    case 8: return 2.3;
                                    case 9: return 2.4;
                                    case 10: return 2.4;
                                    default: return 1;
                                }
                        
                            case "Reggio Calabria":
                                switch (beds) {
                                    case 1: return 0.45;
                                    case 2: return 0.85;
                                    case 3: return 1.0;
                                    case 4: return 1.1;
                                    case 5: return 1.55;
                                    case 6: return 1.7;
                                    case 7: return 1.8;
                                    case 8: return 2.2;
                                    case 9: return 2.3;
                                    case 10: return 2.3;
                                    default: return 1;
                                }
                        
                            case "Reggio Emilia":
                                switch (beds) {
                                    case 1: return 0.5;
                                    case 2: return 0.9;
                                    case 3: return 1.2;
                                    case 4: return 1.3;
                                    case 5: return 1.65;
                                    case 6: return 1.8;
                                    case 7: return 1.9;
                                    case 8: return 2.3;
                                    case 9: return 2.4;
                                    case 10: return 2.4;
                                    default: return 1;
                                }
                        
                            case "Rieti":
                                switch (beds) {
                                    case 1: return 0.4;
                                    case 2: return 0.8;
                                    case 3: return 1.0;
                                    case 4: return 1.1;
                                    case 5: return 1.5;
                                    case 6: return 1.7;
                                    case 7: return 1.8;
                                    case 8: return 2.1;
                                    case 9: return 2.2;
                                    case 10: return 2.2;
                                    default: return 1;
                                }
                        
                            case "Rimini":
                                switch (beds) {
                                    case 1: return 0.55;
                                    case 2: return 0.95;
                                    case 3: return 1.15;
                                    case 4: return 1.25;
                                    case 5: return 1.7;
                                    case 6: return 1.9;
                                    case 7: return 2.0;
                                    case 8: return 2.4;
                                    case 9: return 2.5;
                                    case 10: return 2.5;
                                    default: return 1;
                                }
                        
                            case "Roma":
                                switch (beds) {
                                    case 1: return 0.6;
                                    case 2: return 1.0;
                                    case 3: return 1.3;
                                    case 4: return 1.4;
                                    case 5: return 1.8;
                                    case 6: return 2.0;
                                    case 7: return 2.1;
                                    case 8: return 2.5;
                                    case 9: return 2.6;
                                    case 10: return 2.6;
                                    default: return 1;
                                }
                        
                            case "Rovigo":
                                switch (beds) {
                                    case 1: return 0.4;
                                    case 2: return 0.8;
                                    case 3: return 1.0;
                                    case 4: return 1.1;
                                    case 5: return 1.5;
                                    case 6: return 1.7;
                                    case 7: return 1.8;
                                    case 8: return 2.1;
                                    case 9: return 2.2;
                                    case 10: return 2.2;
                                    default: return 1;
                                }
                        
                            case "Salerno":
                                switch (beds) {
                                    case 1: return 0.5;
                                    case 2: return 0.9;
                                    case 3: return 1.2;
                                    case 4: return 1.3;
                                    case 5: return 1.65;
                                    case 6: return 1.8;
                                    case 7: return 1.9;
                                    case 8: return 2.3;
                                    case 9: return 2.4;
                                    case 10: return 2.4;
                                    default: return 1;
                                }
                        
                            case "Sassari":
                                switch (beds) {
                                    case 1: return 0.4;
                                    case 2: return 0.85;
                                    case 3: return 1.0;
                                    case 4: return 1.1;
                                    case 5: return 1.55;
                                    case 6: return 1.7;
                                    case 7: return 1.8;
                                    case 8: return 2.1;
                                    case 9: return 2.2;
                                    case 10: return 2.2;
                                    default: return 1;
                                }
                        
                            case "Savona":
                                switch (beds) {
                                    case 1: return 0.45;
                                    case 2: return 0.85;
                                    case 3: return 1.0;
                                    case 4: return 1.1;
                                    case 5: return 1.55;
                                    case 6: return 1.7;
                                    case 7: return 1.8;
                                    case 8: return 2.2;
                                    case 9: return 2.3;
                                    case 10: return 2.3;
                                    default: return 1;
                                }
                        
                            case "Siena":
                                switch (beds) {
                                    case 1: return 0.55;
                                    case 2: return 0.95;
                                    case 3: return 1.15;
                                    case 4: return 1.25;
                                    case 5: return 1.7;
                                    case 6: return 1.9;
                                    case 7: return 2.0;
                                    case 8: return 2.4;
                                    case 9: return 2.5;
                                    case 10: return 2.5;
                                    default: return 1;
                                }
                        
                            case "Siracusa":
                                switch (beds) {
                                    case 1: return 0.55;
                                    case 2: return 0.95;
                                    case 3: return 1.15;
                                    case 4: return 1.25;
                                    case 5: return 1.7;
                                    case 6: return 1.9;
                                    case 7: return 2.0;
                                    case 8: return 2.4;
                                    case 9: return 2.5;
                                    case 10: return 2.5;
                                    default: return 1;
                                }
                        
                            case "Sondrio":
                                switch (beds) {
                                    case 1: return 0.4;
                                    case 2: return 0.85;
                                    case 3: return 1.0;
                                    case 4: return 1.1;
                                    case 5: return 1.55;
                                    case 6: return 1.7;
                                    case 7: return 1.8;
                                    case 8: return 2.1;
                                    case 9: return 2.2;
                                    case 10: return 2.2;
                                    default: return 1;
                                }
                        
                            case "Taranto":
                                switch (beds) {
                                    case 1: return 0.5;
                                    case 2: return 0.9;
                                    case 3: return 1.2;
                                    case 4: return 1.3;
                                    case 5: return 1.65;
                                    case 6: return 1.8;
                                    case 7: return 1.9;
                                    case 8: return 2.3;
                                    case 9: return 2.4;
                                    case 10: return 2.4;
                                    default: return 1;
                                }

                                case "Teramo":
        switch (beds) {
            case 1: return 0.45;
            case 2: return 0.85;
            case 3: return 1.0;
            case 4: return 1.1;
            case 5: return 1.55;
            case 6: return 1.7;
            case 7: return 1.8;
            case 8: return 2.2;
            case 9: return 2.3;
            case 10: return 2.3;
            default: return 1;
        }

    case "Terni":
        switch (beds) {
            case 1: return 0.45;
            case 2: return 0.85;
            case 3: return 1.0;
            case 4: return 1.1;
            case 5: return 1.55;
            case 6: return 1.7;
            case 7: return 1.8;
            case 8: return 2.2;
            case 9: return 2.3;
            case 10: return 2.3;
            default: return 1;
        }

    case "Torino":
        switch (beds) {
            case 1: return 0.6;
            case 2: return 1.0;
            case 3: return 1.3;
            case 4: return 1.4;
            case 5: return 1.8;
            case 6: return 2.0;
            case 7: return 2.1;
            case 8: return 2.5;
            case 9: return 2.6;
            case 10: return 2.6;
            default: return 1;
        }

    case "Trapani":
        switch (beds) {
            case 1: return 0.55;
            case 2: return 0.95;
            case 3: return 1.15;
            case 4: return 1.25;
            case 5: return 1.7;
            case 6: return 1.9;
            case 7: return 2.0;
            case 8: return 2.4;
            case 9: return 2.5;
            case 10: return 2.5;
            default: return 1;
        }

    case "Trento":
        switch (beds) {
            case 1: return 0.6;
            case 2: return 1.0;
            case 3: return 1.3;
            case 4: return 1.4;
            case 5: return 1.8;
            case 6: return 2.0;
            case 7: return 2.1;
            case 8: return 2.5;
            case 9: return 2.6;
            case 10: return 2.6;
            default: return 1;
        }

    case "Treviso":
        switch (beds) {
            case 1: return 0.55;
            case 2: return 0.95;
            case 3: return 1.15;
            case 4: return 1.25;
            case 5: return 1.7;
            case 6: return 1.9;
            case 7: return 2.0;
            case 8: return 2.4;
            case 9: return 2.5;
            case 10: return 2.5;
            default: return 1;
        }

    case "Trieste":
        switch (beds) {
            case 1: return 0.6;
            case 2: return 1.0;
            case 3: return 1.3;
            case 4: return 1.4;
            case 5: return 1.8;
            case 6: return 2.0;
            case 7: return 2.1;
            case 8: return 2.5;
            case 9: return 2.6;
            case 10: return 2.6;
            default: return 1;
        }

    case "Udine":
        switch (beds) {
            case 1: return 0.55;
            case 2: return 0.95;
            case 3: return 1.15;
            case 4: return 1.25;
            case 5: return 1.7;
            case 6: return 1.9;
            case 7: return 2.0;
            case 8: return 2.4;
            case 9: return 2.5;
            case 10: return 2.5;
            default: return 1;
        }

    case "Varese":
        switch (beds) {
            case 1: return 0.5;
            case 2: return 0.9;
            case 3: return 1.2;
            case 4: return 1.3;
            case 5: return 1.65;
            case 6: return 1.8;
            case 7: return 1.9;
            case 8: return 2.3;
            case 9: return 2.4;
            case 10: return 2.4;
            default: return 1;
        }

    case "Venezia":
        switch (beds) {
            case 1: return 0.6;
            case 2: return 1.0;
            case 3: return 1.3;
            case 4: return 1.4;
            case 5: return 1.8;
            case 6: return 2.0;
            case 7: return 2.1;
            case 8: return 2.5;
            case 9: return 2.6;
            case 10: return 2.6;
            default: return 1;
        }

    case "Verbania":
        switch (beds) {
            case 1: return 0.45;
            case 2: return 0.85;
            case 3: return 1.0;
            case 4: return 1.1;
            case 5: return 1.55;
            case 6: return 1.7;
            case 7: return 1.8;
            case 8: return 2.2;
            case 9: return 2.3;
            case 10: return 2.3;
            default: return 1;
        }

    case "Vercelli":
        switch (beds) {
            case 1: return 0.45;
            case 2: return 0.85;
            case 3: return 1.0;
            case 4: return 1.1;
            case 5: return 1.55;
            case 6: return 1.7;
            case 7: return 1.8;
            case 8: return 2.2;
            case 9: return 2.3;
            case 10: return 2.3;
            default: return 1;
        }

    case "Verona":
        switch (beds) {
            case 1: return 0.55;
            case 2: return 0.95;
            case 3: return 1.15;
            case 4: return 1.25;
            case 5: return 1.7;
            case 6: return 1.9;
            case 7: return 2.0;
            case 8: return 2.4;
            case 9: return 2.5;
            case 10: return 2.5;
            default: return 1;
        }

    case "Vibo Valentia":
        switch (beds) {
            case 1: return 0.4;
            case 2: return 0.8;
            case 3: return 1.0;
            case 4: return 1.1;
            case 5: return 1.5;
            case 6: return 1.7;
            case 7: return 1.8;
            case 8: return 2.1;
            case 9: return 2.2;
            case 10: return 2.2;
            default: return 1;
        }

    case "Vicenza":
        switch (beds) {
            case 1: return 0.55;
            case 2: return 0.95;
            case 3: return 1.15;
            case 4: return 1.25;
            case 5: return 1.7;
            case 6: return 1.9;
            case 7: return 2.0;
            case 8: return 2.4;
            case 9: return 2.5;
            case 10: return 2.5;
            default: return 1;
        }

    case "Viterbo":
        switch (beds) {
            case 1: return 0.45;
            case 2: return 0.85;
            case 3: return 1.0;
            case 4: return 1.1;
            case 5: return 1.55;
            case 6: return 1.7;
            case 7: return 1.8;
            case 8: return 2.2;
            case 9: return 2.3;
            case 10: return 2.3;
            default: return 1;
        }
                        
                    
                        // Continue adding more cases following this structure if there are any remaining cities.
                    
                
                    // Continue adding more cases following this structure
                
            
        
            // Continue adding more cases for other cities here
        
        // Aggiungi altre città qui se necessario...
        default:
            return 1; 
    }
}

function getSeasonalMultiplier(city, month) {
    const seasonalMultipliers = {
        "Agrigento": [0.8, 0.74, 0.87, 0.94, 1.06, 1.13, 1.26, 1.33, 1.2, 1, 0.87, 0.8],
"Alessandria": [0.85, 0.85, 0.85, 1.03, 1.05, 1.10, 1.15, 1.15, 1.10, 1.05, 0.85, 0.85],
"Ancona": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.25, 1.10, 0.90, 0.80],
"Aosta": [0.85, 0.90, 1.00, 1.10, 1.20, 1.25, 1.30, 1.25, 1.20, 1.10, 0.90, 0.85],
"Arezzo": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.25, 1.10, 0.90, 0.80],
"Ascoli Piceno": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.30, 1.20, 1.05, 0.85, 0.75],
"Asti": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Avellino": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Bari": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Barletta": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Andria": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Trani": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Belluno": [0.85, 0.90, 1.00, 1.10, 1.20, 1.25, 1.30, 1.25, 1.20, 1.10, 0.90, 0.85],
"Benevento": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Bergamo": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Biella": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Bologna": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.10, 1.30, 1.15, 0.95, 0.85],
"Bolzano": [0.90, 0.95, 1.05, 1.15, 1.25, 1.35, 1.40, 1.40, 1.35, 1.20, 1.00, 0.90],
"Brescia": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Brindisi": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Cagliari": [0.85, 0.90, 0.95, 1.00, 1.10, 1.25, 1.30, 1.30, 1.25, 1.10, 0.90, 0.85],
"Caltanissetta": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Campobasso": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Caserta": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.30, 1.20, 1.05, 0.85, 0.75],
"Catania": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Catanzaro": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Chieti": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Como": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Cosenza": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Cremona": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Crotone": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Cuneo": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Enna": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Fermo": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Ferrara": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Firenze": [0.85, 0.90, 1.00, 1.10, 1.20, 1.35, 1.40, 1.40, 1.35, 1.20, 0.95, 0.85],
"Foggia": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.35, 1.30, 1.15, 0.95, 0.80],
"Forlì-Cesena": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Frosinone": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Genova": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Gorizia": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Grosseto": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.25, 1.10, 0.90, 0.80],
"Imperia": [0.85, 0.90, 0.95, 1.05, 1.15, 1.25, 1.30, 1.30, 1.25, 1.10, 0.95, 0.85],
"Isernia": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"L'Aquila": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"La Spezia": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Latina": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.25, 1.10, 0.90, 0.80],
"Lecce": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Lecco": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Livorno": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Lodi": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Lucca": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Macerata": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Mantova": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Massa-Carrara": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Matera": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Messina": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Milano": [0.90, 0.95, 1.05, 1.15, 1.25, 1.35, 1.40, 1.40, 1.35, 1.20, 1.00, 0.90],
"Modena": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Monza e Brianza": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Napoli": [0.85, 0.90, 1.00, 1.10, 1.20, 1.35, 1.40, 1.40, 1.35, 1.20, 0.95, 0.85],
"Novara": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Nuoro": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Oristano": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Padova": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Palermo": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Parma": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Pavia": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Perugia": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Pesaro e Urbino": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Pescara": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Piacenza": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Pisa": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Pistoia": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Pordenone": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Potenza": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Prato": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Ragusa": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Ravenna": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Reggio Calabria": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Reggio Emilia": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Rieti": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Rimini": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Roma": [0.90, 0.95, 1.05, 1.15, 1.25, 1.35, 1.40, 1.40, 1.35, 1.20, 1.00, 0.90],
"Rovigo": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Salerno": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Sassari": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Savona": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Siena": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Siracusa": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Sondrio": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Sud Sardegna": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Taranto": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Teramo": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Terni": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Torino": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Trapani": [0.80, 0.85, 0.90, 1.00, 1.10, 1.25, 1.35, 1.40, 1.30, 1.15, 0.95, 0.80],
"Trento": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Treviso": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Trieste": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Udine": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Varese": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Venezia": [0.90, 0.95, 1.05, 1.15, 1.25, 1.35, 1.40, 1.40, 1.35, 1.20, 1.00, 0.90],
"Verbano-Cusio-Ossola": [0.80, 0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.30, 1.25, 1.10, 0.90, 0.80],
"Vercelli": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Verona": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Vibo Valentia": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
"Vicenza": [0.85, 0.90, 1.00, 1.10, 1.20, 1.30, 1.35, 1.35, 1.30, 1.15, 0.95, 0.85],
"Viterbo": [0.75, 0.80, 0.85, 0.95, 1.05, 1.15, 1.25, 1.25, 1.20, 1.05, 0.85, 0.75],
        // Aggiungi altre città qui
    };

    return seasonalMultipliers[city] ? seasonalMultipliers[city][month] : 1.0;
}

window.onload = initMap;

function openModal() {
    document.getElementById("modal-overlay").style.display = "block";
    document.getElementById("info-modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal-overlay").style.display = "none";
    document.getElementById("info-modal").style.display = "none";
}
