const url = "http://localhost:3000/films";

function fetchData() {
    const existingUl = document.querySelector('ul');
    if (existingUl) {
        existingUl.remove();
    }

fetch(url)
    .then((response) => {
        return response.json(); // Översätt svaret till JSON
    })

    .then((films) => {
        console.log(films);
        // Skapa ul-elementet
        const ul = document.createElement('ul');
    
        // Loopa igenom användarna och skapa li-element för varje användare
        films.forEach(film => {
            const li = document.createElement('li'); // Skapa ett li-element
            // Skapa innehållet för varje li-element
            li.innerHTML = `Title: ${film.title} // Year: ${film.year} // Director: ${film.director} // Genre: ${film.genre}`; // Skriv ut användarens namn och användarnamn
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Ta bort"; // Texten på knappen
            li.appendChild(deleteButton);

            const changeButton = document.createElement('button');
            changeButton.textContent = "Ändra"; // Texten på knappen
            li.appendChild(changeButton);

            // function deleteFilms(id) {
            //     console.log('delete', id);
            //     fetch(`${url}/${id}`, { method: 'DELETE'}).then((result) => fetchData());
            // }

            ul.appendChild(li); // Lägg till li-elementet i ul-elementet
        });

        // Lägg till ul-elementet på sidan
        document.body.appendChild(ul);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });

}

fetchData();

    const submitButton=document.querySelector('#submitButton');
    const form = document.querySelector('#filmForm');

    // console.log(submit);
    submitButton.addEventListener('click', handleSubmit);

    function handleSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('titleInput').value;
    const year = document.getElementById('yearInput').value;
    const director = document.getElementById('directorInput').value;
    const genre = document.getElementById('genreInput').value;


    if (!title || !year || !director || !genre) {
        alert("Alla fält måste fyllas i innan du kan lägga till en film!");
        return;
       } 

    const serverFilmsObject = {
        title: title,
        year: year,
        director: director,
        genre: genre,
    };

    console.log("Data to be sent to server:",serverFilmsObject);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(serverFilmsObject),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to add film");
            }
            console.log("Film added successfully");
            document.getElementById('filmForm').reset(); // Återställ formuläret
            fetchData();
            alert("Filmen har lagts till!")
           
        })
        .catch((error) => { 
            console.error("Error adding film:", error);
        });

        return false;
    }
    
    const deleteButton = document.createElement('button');
    deleteButton.addEventListener('click', deleteFilms);
    // changeButton.addEventListener('click', changeFilms);
    
    function deleteFilms(e) {
        e.preventDefault();
    }

    // function changeFilms(e) {
    //     e.preventDefault();

    //     const filmId = document.getElementById('
    // }

