async function searchMovies() {
    const inputField = document.getElementById("inputField");
    const showMovie = document.getElementById("showMovie");
    const suggestions = document.getElementById("suggestions");

    const userInput = inputField.value.trim();

    if (userInput === "") {
        alert("Please enter a movie!");
        return;
    }

    const URL = `https://api.tvmaze.com/search/shows?q=${userInput}`;

    const response = await fetch(URL);
    const json = await response.json();

    suggestions.innerHTML = "";

    if (json.length === 0) {
        showMovie.innerHTML = `
            <h1>No movies found</h1>
            <p>Try searching for something else.</p>
        `;
        return;
    }

    const movie = json[0].show;

    const movieName = movie.name;
    const movieSummary = movie.summary || "No summary available.";
    const movieImage = movie.image ? movie.image.medium : "";

    showMovie.innerHTML = `
        <h1>${movieName}</h1>
        ${movieImage ? `<img src="${movieImage}" alt="${movieName}">` : `<p>No image available.</p>`}
        <p>${movieSummary}</p>
    `;
}

async function showSuggestions() {
    const input = document.getElementById("inputField").value.trim();
    const suggestions = document.getElementById("suggestions");

    if (input.length < 2) {
        suggestions.innerHTML = "";
        return;
    }

    const URL = `https://api.tvmaze.com/search/shows?q=${input}`;

    const response = await fetch(URL);
    const data = await response.json();

    suggestions.innerHTML = "";

    const shown = new Set();
    let count = 0;

    for (let i = 0; i < data.length; i++) {
        const show = data[i].show;

        if (shown.has(show.name)) {
            continue;
        }

        shown.add(show.name);

        suggestions.innerHTML += `
            <div class="suggestionItem" onclick="selectSuggestion('${show.name.replace(/'/g, "\\'")}')">
                ${show.name}
            </div>
        `;

        count++;

        if (count === 5) {
            break;
        }
    }
}

function selectSuggestion(name) {
    const input = document.getElementById("inputField");
    const suggestions = document.getElementById("suggestions");

    input.value = name;
    suggestions.innerHTML = "";

    searchMovies();
}

document.getElementById("inputField").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchMovies();
    }
});