// logik/logik_code.js

/*require('express'): Importiert das Express-Framework.
  app = express(): Erstellt eine Express-Anwendung.
  const port = 3000: Legt den Port fest, auf dem der Server läuft (3000).*/
const express = require('express');
const app = express();
const port = 3000;

// Middleware
/*app.use(express.json()): Fügt Middleware hinzu, um JSON-Anfragen im Body der
HTTP-Anfragen zu verarbeiten. Dies ermöglicht es dir, JSON-Daten in den API-Anfragen zu empfangen.
app.use(express.static('praesentation')): Macht den praesentation-Ordner öffentlich zugänglich.
Alle statischen Dateien (wie HTML, CSS, JS) im praesentation-Ordner können über den Browser abgerufen
werden.*/
app.use(express.json());
app.use(express.static('praesentation'));

// API-Endpunkte
// app.post('/api/saveName', require('../daten/daten_code').saveName): Definiert einen POST-Endpunkt, der Namen speichert. Der Code für diese Funktion ist in daten/daten_code.js definiert.
// app.delete('/api/deleteName/:id', require('../daten/daten_code').deleteName): Definiert einen DELETE-Endpunkt, um einen Namen anhand der ID zu löschen.
// app.get('/api/getNames', require('../daten/daten_code').getNames): Definiert einen GET-Endpunkt, um alle Namen abzurufen.
app.post('/api/saveName', require('../daten/daten_code').saveName);
app.delete('/api/deleteName/:id', require('../daten/daten_code').deleteName);
app.get('/api/getNames', require('../daten/daten_code').getNames);

// Server starten
// app.listen(port, () => { ... }): Startet den Express-Server und lässt ihn auf dem
// angegebenen Port lauschen (3000).Der Callback gibt eine Bestätigungsmeldung aus,
// wenn der Server erfolgreich gestartet ist.
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
