// daten/daten_code.js

const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function getDb() {
    await client.connect();
    return client.db('SimpleSoftware').collection('names');
}

async function saveName(req, res) {
    try {
        const db = await getDb();
        const result = await db.insertOne({ firstName: req.body.firstName, lastName: req.body.lastName });
        res.status(201).send({ message: 'Name gespeichert', id: result.insertedId });
    } catch (err) {
        res.status(500).send({ error: 'Fehler beim Speichern des Namens' });
    }
}

async function deleteName(req, res) {
    try {
        const db = await getDb();
        // Verwenden Sie den new-Operator für ObjectId
        const objectId = new require('mongodb').ObjectId(req.params.id);
        const result = await db.deleteOne({ _id: objectId });
        if (result.deletedCount === 1) {
            res.status(200).send({ message: 'Name gelöscht' });
        } else {
            res.status(404).send({ message: 'Name nicht gefunden' });
        }
    } catch (err) {
        console.error('Fehler beim Löschen des Namens:', err);
        res.status(500).send({ error: 'Fehler beim Löschen des Namens' });
    }
}



async function getNames(req, res) {
    try {
        const db = await getDb();
        const names = await db.find().toArray();
        res.status(200).json(names);
    } catch (err) {
        res.status(500).send({ error: 'Fehler beim Abrufen der Namen' });
    }
}

module.exports = { saveName, deleteName, getNames };
