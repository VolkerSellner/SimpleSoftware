document.getElementById('saveButton').addEventListener('click', async () => {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    if (!firstName || !lastName) {
        alert('Vorname und Nachname dürfen nicht leer sein!');
        return;
    }

    try {
        const response = await fetch('/api/names', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Name erfolgreich gespeichert!');
            addNameToList(data.id, firstName, lastName);
        } else {
            alert('Fehler beim Speichern des Namens');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Fehler beim Speichern des Namens');
    }
});

async function deleteName(id) {
    try {
        const response = await fetch(`/api/names/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Name erfolgreich gelöscht!');
            document.querySelector(`li[data-id="${id}"]`).remove();
        } else {
            alert('Fehler beim Löschen des Namens');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Fehler beim Löschen des Namens');
    }
}

async function loadNames() {
    try {
        const response = await fetch('/api/names');
        if (response.ok) {
            const names = await response.json();
            names.forEach(name => {
                addNameToList(name._id, name.firstName, name.lastName);
            });
        } else {
            alert('Fehler beim Laden der Namen');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Fehler beim Laden der Namen');
    }
}

function addNameToList(id, firstName, lastName) {
    const nameList = document.getElementById('nameList');
    const listItem = document.createElement('li');
    listItem.textContent = `${firstName} ${lastName}`;
    listItem.setAttribute('data-id', id);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Löschen';
    deleteButton.addEventListener('click', () => deleteName(id));

    listItem.appendChild(deleteButton);
    nameList.appendChild(listItem);
}

window.onload = loadNames;
