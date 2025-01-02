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