// Warte bis das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen, initialisiere Karte...');
    
    // Definiere das Koordinatensystem für Berlin (ETRS89 / UTM zone 33N)
    proj4.defs("EPSG:25833", "+proj=utm +zone=33 +datum=ETRS89 +units=m +no_defs");

    // Speichere die Layer-Gruppen für jedes Gebiet
    const areaLayers = new Map();

    // Initialisiere die Karte
    const map = L.map('map').setView([52.5163, 13.3777], 12);
    console.log('Karte initialisiert');

    // Zentriere die Karte bei Größenänderungen
    window.addEventListener('resize', function() {
        map.invalidateSize();
        map.setView([52.5163, 13.3777], map.getZoom());
    });

    // Füge OpenStreetMap Layer hinzu
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    console.log('OSM Layer hinzugefügt');

    // Erstelle Layer-Gruppen für die Windenergiegebiete
    const windLayerGroup = L.layerGroup().addTo(map);
    console.log('Wind Layer Gruppe erstellt');

    // Erstelle die Layer-Controls
    const layerControl = L.control.layers(null, null, {
        position: 'topleft',
        collapsed: false
    }).addTo(map);
    console.log('Layer Control erstellt');

    function convertCoordinates(utmX, utmY) {
        // Konvertiere von EPSG:25833 (UTM) zu EPSG:4326 (WGS84)
        const [lng, lat] = proj4("EPSG:25833", "EPSG:4326", [utmX, utmY]);
        console.log(`UTM: [${utmX}, ${utmY}] -> WGS84: [${lat}, ${lng}]`);
        return [lat, lng];
    }

    // Verarbeite die Windenergiegebiete
    function processWindAreas() {
        console.log('Starte Verarbeitung der Windgebiete');
        console.log('Anzahl der Gebiete:', windAreas.length);
        
        // Sortiere die Gebiete alphabetisch nach Namen
        const sortedAreas = [...windAreas].sort((a, b) => a.name.localeCompare(b.name, 'de'));
        
        sortedAreas.forEach(area => {
            console.log('Verarbeite Gebiet:', area.name);
            try {
                const latLngs = area.polygon.map(coord => {
                    const [lat, lng] = convertCoordinates(coord[0], coord[1]);
                    console.log(`Konvertierte Koordinaten für ${area.name}: [${lat}, ${lng}]`);
                    return [lat, lng];
                });
                
                const polygon = L.polygon(latLngs, {
                    color: 'red',
                    weight: 2,
                    fillOpacity: 0.2
                });
                
                polygon.bindPopup(`
                    <strong>${area.name}</strong><br>
                    Nummer: ${area.nummer}<br>
                    Fläche: ${area.flaeche_ha} ha
                `);
                
                windLayerGroup.addLayer(polygon);
                layerControl.addOverlay(polygon, area.name);
                areaLayers.set(area.name, polygon);
                console.log(`Gebiet ${area.name} erfolgreich hinzugefügt`);
            } catch (error) {
                console.error(`Fehler beim Verarbeiten von ${area.name}:`, error);
            }
        });
        console.log('Verarbeitung der Windgebiete abgeschlossen');
    }

    // Initialisiere die Gebiete
    processWindAreas();
    console.log('Initialisierung abgeschlossen');
}); 