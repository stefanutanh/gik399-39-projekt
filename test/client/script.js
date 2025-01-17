const url = "http://localhost:3000/films";

const filmForm = document.querySelector('#filmForm');
const listContainer = document.querySelector('#listContainer');
const submitButton = document.querySelector('.btn-primary');

console.log('Initial DOM elements loaded:', { filmForm, listContainer, submitButton });

let tasks = [];

const showModalMessage = message => {
    console.log('Showing modal with message:', message);
    const modal = new bootstrap.Modal(document.querySelector('#messageModal'));
    document.querySelector('#modalMessage').textContent = message;
    modal.show();
};

const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { title, year, director, genre } = filmForm;
    console.log('Form values:', { title: title.value, year: year.value, director: director.value, genre: genre.value });

    if (!title.value || !year.value || !director.value || !genre.value) {
        console.log('Form validation failed - missing fields');
        showModalMessage('Vänligen fyll i alla fält');
        return;
    }

    const task = {
        title: title.value,
        year: year.value,
        director: director.value,
        genre: genre.value,
    };

    const editingId = filmForm.dataset.editingFilmId;
    console.log('Submitting form with mode:', editingId ? 'edit' : 'create');

    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId ? `${url}/${editingId}` : url;

    try {
        console.log('Making API request to:', endpoint, 'with data:', task);
        const response = await fetch(endpoint, {
            method,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(task)
        });

        if (!response.ok) throw new Error(`Error ${method === 'PUT' ? 'updating' : 'adding'} film`);

        filmForm.reset();
        if (editingId) {
            delete filmForm.dataset.editingFilmId;
            submitButton.textContent = 'Submit';
        }
        
        showModalMessage(`Filmen har ${editingId ? 'uppdaterats' : 'lagts till'}!`);
        await filmLista();
    } catch (error) {
        console.error('API request failed:', error);
    }
};

const createFilmCard = (film) => {
    
    const genreText = [...document.querySelectorAll('#genreInput option')]
        .find(option => option.value === film.genre)?.textContent || film.genre;

    const col = document.createElement('div');
    col.className = 'thunder d-flex col-3 col-md-2 col-sm m-2';
    
    col.innerHTML = `
        <div class="card genre-${film.genre.toLowerCase()}">
            <div class="card-body">
                <h5 class="card-title">${film.title} <span class="text-muted">(${film.year})</span></h5>
                <p class="card-text">
                    <strong>Director:</strong> ${film.director}<br>
                    <strong>Genre:</strong> <p>${genreText}</p>
                </p>
                <div class="card-footer bg-transparent border-0 pt-0">
                    <button onclick="editFilm(${film.id})" class="btn btn-warning btn-sm">Edit</button>
                    <button onclick="deleteFilm(${film.id})" class="btn btn-danger btn-sm">Delete</button>
                </div>
            </div>
        </div>
    `;
    
    return col;
};

const filmLista = async () => {
    console.log('Fetching film list');
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        tasks = await response.json();
        console.log('Retrieved films:', tasks);

        listContainer.innerHTML = '';
        const fragment = document.createDocumentFragment();
        tasks.forEach(film => fragment.appendChild(createFilmCard(film)));
        listContainer.appendChild(fragment);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

const editFilm = (id) => {
    console.log('Editing film with ID:', id);
    const film = tasks.find(task => task.id === id);
    if (!film) {
        console.warn('Film not found with ID:', id);
        return;
    }

    ['title', 'year', 'director', 'genreInput'].forEach(field => {
        document.querySelector(`#${field}`).value = film[field.replace('Input', '')];
    });

    submitButton.textContent = 'Updatera Film';
    filmForm.dataset.editingFilmId = id;
    document.querySelector('#title').scrollIntoView({ behavior: 'smooth' });
};

const deleteFilm = async (id) => {
    console.log('Attempting to delete film with ID:', id);
    try {
        const response = await fetch(`${url}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Error deleting film');
        
        tasks = tasks.filter(task => task.id !== id);
        console.log('Film deleted successfully, remaining films:', tasks);
        await filmLista();
        showModalMessage('Filmen har tagits bort!');
    } catch (error) {
        console.error('Error removing film:', error);
    }
};

filmForm.addEventListener('submit', handleSubmit);
console.log('Submit event listener added to form');
filmLista();