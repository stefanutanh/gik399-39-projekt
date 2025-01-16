const url = "http://localhost:3000/films";
const filmForm = document.querySelector('#filmForm'); 
const listContainer = document.querySelector('#listContainer');
let tasks = [];

console.log(url)


filmForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    console.log('Form submitted.');

    // Validera formuläret
    if (!filmForm.title.value || !filmForm.year.value || !filmForm.director.value || !filmForm.genre.value) {
        alert('Vänligen fyll i alla fält');
        console.log('Form validation failed. Missing fields.');
        return;
    }

    const task = {
        title: filmForm.title.value,
        year: filmForm.year.value,
        director: filmForm.director.value,
        genre: filmForm.genre.value,
    };

    // Kontrollera om vi redigerar en existerande film eller skapar en ny
    const editingId = filmForm.dataset.editingFilmId;
    
    if (editingId) {
        // Uppdatera existerande film
        const filmRequest = new Request(`${url}/${editingId}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(task),
        });
        
        console.log('Sending PUT request to server...');

        fetch(filmRequest)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error updating film: ${response.statusText}`);
                }
                console.log('Film successfully updated on server.');
                // Återställ formuläret och dess state
                filmForm.reset();
                delete filmForm.dataset.editingFilmId;
                document.querySelector('.btn-primary').textContent = 'Add Film';
                return response.json();
            })
            .then(() => {
                renderTasks(); // Uppdatera listan
            })
            .catch((error) => console.error('Error updating film:', error));
    } else {
        // Skapa ny film
        const filmRequest = new Request(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(task),
        });

        console.log('Sending POST request to server...');

        fetch(filmRequest)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error adding film: ${response.statusText}`);
                }
                console.log('Film successfully added to server.');
                filmForm.reset();
                return response.json();
            })
            .then((data) => {
                tasks.push(data);
                renderTasks();
            })
            .catch((error) => console.error('Error adding film:', error));
    }
}
// Hämtar och skapar filmlistan
function filmLista() {
    listContainer.innerHTML = '';
    
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Hämtning av filmlista utförd!');
            return response.json();
        })
        .then((data) => {
            tasks = data;  
            tasks.forEach(film => {
               
                const col = document.createElement('div');        
                col.className = 'thunder d-flex col-3 col-md-2 col-sm m-2';                 
                const card = document.createElement('div');
                card.className = `card genre-${film.genre.toLowerCase()}`; 
                
                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${film.title} <span class="text-muted">(${film.year})</span></h5>
                        <p class="card-text">
                            <strong>Director:</strong> ${film.director}<br>
                            <strong>Genre:</strong> ${film.genre}
                        </p>
                        <div class="card-footer bg-transparent border-0 pt-0">
                            <button onclick="editFilm(${film.id})" class="btn btn-warning btn-sm">Edit</button>
                            <button onclick="deleteFilm(${film.id})" class="btn btn-danger btn-sm">Delete</button>
                        </div>
                    </div>
                `;
                
                listContainer.appendChild(col);
            col.appendChild(card);
            });
            
            
        })
        .catch((error) => console.error('Error fetching tasks:', error));
}

function editFilm(id) {
    const film = tasks.find(task => task.id === id);
    
    if (!film) {
        console.error('Film not found');
        return;
    }

    // Använd QuerySelector för att hitta input-fälten i formuläret
    const titleInput = document.querySelector('#title');
    const yearInput = document.querySelector('#year');
    const directorInput = document.querySelector('#director');
    const genreInput = document.querySelector('#genreInput');
    
    // Fyll i formuläret med filmens värden
    if (titleInput) titleInput.value = film.title;
    if (yearInput) yearInput.value = film.year;
    if (directorInput) directorInput.value = film.director;
    if (genreInput) genreInput.value = film.genre;
    
    // Ändra submit-knappens text
    const submitButton = document.querySelector('.btn-primary');
    if (submitButton) {
        submitButton.textContent = 'Updatera Film';
    }
    
    // Spara film-ID för uppdateringen
    const form = document.querySelector('#filmForm');
    if (form) {
        form.dataset.editingFilmId = id;
    }

    // Scrolla upp till formuläret så användaren ser det
    titleInput.scrollIntoView({ behavior: 'smooth' });
}

function deleteFilm(id) {
    const film = tasks.find(task => task.id === id);
    if (film && confirm('Är du säker på att du vill ta bort denna film?')) {
        fetch(`${url}/${id}`, { method: 'DELETE' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error deleting film: ${response.statusText}`);
                }
                tasks = tasks.filter(task => task.id !== id); // Ta bort lokalt
                filmLista();
            })
            .catch((error) => console.error('Error removing film:', error));
    }
}



filmLista();
console.log(filmLista)
