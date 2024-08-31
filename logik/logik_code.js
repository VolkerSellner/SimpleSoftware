const express = require('express');
const path = require('path');
const { saveName, deleteName, getNames } = require('../daten/daten_code');

const app = express();
app.use(express.json());

// Stelle statische Dateien bereit
app.use(express.static(path.join(__dirname, '../praesentation')));

// API-Endpunkte
app.post('/api/names', saveName);
app.delete('/api/names/:id', deleteName);
app.get('/api/names', getNames);

// Starte den Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
