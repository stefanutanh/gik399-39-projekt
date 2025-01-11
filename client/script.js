const url = "http://localhost:3000/films";
const filmForm = document.querySelector('#filmForm'); 
const listContainer = document.querySelector('#listContainer');




// Hämtar filmer från servern
fetch(url)
  .then((response) => {
    console.log('Hämtar filmer...');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log('Hämtning utförd!');
    return response.json();
  })
  .then((films) => {
    console.log('Hämtade filmer från databasen: ', films);
    const ul = document.createElement('ul');

    // Loopa igenom filmer och skapa li-element för varje film
    films.forEach(film => {
        const li = document.createElement('li');
        li.innerHTML = `Title: ${film.title} // Year: ${film.year} // Director: ${film.director} // Genre: ${film.genre}`; 
        
        // Skapa och ändra deleteButton
        const deleteButton = document.createElement('button');
        const deleteIcon = document.createElement('img'); 
        deleteIcon.src = 'img/delete.png'; 
        deleteIcon.alt = 'Delete'; 
        deleteIcon.style.width = '20px';
        deleteIcon.style.height = '20px';
        deleteIcon.style.margin = '3px';
        deleteButton.appendChild(deleteIcon); 
        li.appendChild(deleteButton); 

        // Skapa och ändra changeButton
        const changeButton = document.createElement('button');
        const changeIcon = document.createElement('img'); 
        changeIcon.src = 'img/pencil.png'; 
        changeIcon.alt = 'Edit'; 
        changeIcon.style.width = '20px';
        changeIcon.style.height = '20px';
        changeIcon.style.margin = '3px';
        changeButton.appendChild(changeIcon); 
        li.appendChild(changeButton); 

        ul.appendChild(li); 

      
        deleteButton.addEventListener('click', () => {
          console.log('Delete button clicked for film:', film);
          if (confirm('Är du säker på att du vill ta bort denna film?')) {
            console.log('Confirmed deletion for film:', film.title);
            fetch(`${url}/${film.id}`, { method: 'DELETE' })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`Error deleting film: ${response.statusText}`);
                }
                console.log('Film successfully deleted from server:', film.title);
                li.remove();
              })
              .catch((error) => console.error('Error removing film:', error));
          } else {
            console.log('Deletion canceled for film:', film.title);
          }
        });
    });
    listContainer.appendChild(ul);
    console.log('Alla filmer hämtade.');
  })
  .catch((error) => console.error('Error fetching films:', error));

// Hanterar formulärets submit-knapp
filmForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  console.log('Form submitted.');
  
  const serverfilmObject = {
    title: filmForm.title.value,
    year: filmForm.year.value,
    director: filmForm.director.value,
    genre: filmForm.genre.value,
  };

  console.log('Film data from form:', serverfilmObject);

  if (!filmForm.title.value || !filmForm.year.value || !filmForm.director.value || !filmForm.genre.value) {
    alert('Vänligen fyll i alla fält');
    console.log('Form validation failed. Missing fields.');
    return;
  }

  const jsonData = JSON.stringify(serverfilmObject);
  console.log('JSON data to send:', jsonData);

  const filmRequest = new Request(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: jsonData,
  }); 

  console.log('Sending POST request to server...');
  fetch(filmRequest)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error adding film: ${response.statusText}`);
      }
      console.log('Film successfully added to server.');
      filmForm.reset();
      console.log("Rensar fält");
      return response.json();
    })
    .then((data) => {
      console.log('Response from server after adding film:', data);
      const newFilmHtml = `<p>${data.title}</p>`;
      document.body.insertAdjacentHTML('beforeend', newFilmHtml);
      console.log('New film added to DOM:', data.title);
      
    })
    .catch((error) => console.error('Error adding film:', error));
}
