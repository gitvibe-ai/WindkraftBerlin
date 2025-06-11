# Windkraftanlagen Berlin Visualisierung

Eine interaktive Webseite zur Visualisierung geplanter Windkraftanlagen in Berlin.

## Funktionen

- Interaktive OpenStreetMap-Karte
- Upload von GML-Dateien mit Windkraftanlagen-Standorten
- Automatische Konvertierung von GML zu GeoJSON
- Filterung nach Bezirken
- Responsive Design

## Setup

1. Klonen Sie das Repository:
```bash
git clone https://github.com/ihr-username/windkraft-berlin.git
cd windkraft-berlin
```

2. Starten Sie einen lokalen Webserver. Zum Beispiel mit Python:
```bash
python -m http.server 8000
```

3. Öffnen Sie die Seite im Browser:
```
http://localhost:8000
```

## Verwendung

1. Klicken Sie auf "GML-Dateien auswählen"
2. Wählen Sie eine oder mehrere GML-Dateien aus dem Ordner `beabsichtigte-windenergiegebiete/`
3. Die Windkraftanlagen werden automatisch auf der Karte angezeigt
4. Nutzen Sie die Checkboxen in der Seitenleiste, um Anlagen nach Bezirken zu filtern

## Technische Details

- Reines HTML5, CSS und Vanilla JavaScript
- Leaflet.js für die Kartenvisualisierung
- Fast-XML-Parser für GML-Parsing
- Keine Build-Tools oder Frameworks erforderlich

## Deployment

Die Seite kann einfach auf GitHub Pages oder anderen statischen Hosting-Diensten deployed werden. 