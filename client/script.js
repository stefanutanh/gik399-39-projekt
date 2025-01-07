const url = "http://localhost:3000/films";

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
            ul.appendChild(li); // Lägg till li-elementet i ul-elementet
        });

        // Lägg till ul-elementet på sidan
        document.body.appendChild(ul);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });

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
        })
        .catch((error) => {
            console.error("Error adding film:", error);
        });
    }
