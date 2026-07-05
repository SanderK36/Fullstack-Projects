const surpriseSearches = [
    "time travel",
    "heist",
    "haunted",
    "detective",
    "space",
    "cooking",
    "superhero",
    "island",
    "robot",
    "magic"
];

async function searchMovies() {
    const inputField = document.getElementById("inputField");
    const showMovie = document.getElementById("showMovie");
    const suggestions = document.getElementById("suggestions");

    const userInput = inputField.value.trim();

    if (userInput === "") {
        showToast("Please enter a movie or show first.");
        return;
    }

    const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(userInput)}`;
    const response = await fetch(url);
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
    const isSaved = isInWatchlist(movie.id);
    const rating = movie.rating && movie.rating.average ? `${movie.rating.average}/10` : "Unrated";
    const premiered = movie.premiered ? movie.premiered.slice(0, 4) : "Unknown year";
    const status = movie.status || "Unknown status";
    const genres = movie.genres.length > 0 ? movie.genres.join(", ") : "Genre mystery";

    showMovie.innerHTML = `
        <h1>${escapeHTML(movieName)}</h1>
        <div class="movieMeta">
            <span>${escapeHTML(rating)}</span>
            <span>${escapeHTML(premiered)}</span>
            <span>${escapeHTML(status)}</span>
            <span>${escapeHTML(genres)}</span>
        </div>
        ${movieImage ? `<img src="${movieImage}" alt="${escapeHTML(movieName)}">` : `<p>No image available.</p>`}
        <div class="movieActions">
            <button id="watchlistButton" class="${isSaved ? "saved" : ""}" ${isSaved ? "disabled" : ""}>
                ${isSaved ? "Added to Watchlist" : "Add to Watchlist"}
            </button>
            <a href="./watchlist.html">Open Watchlist</a>
        </div>
        <p>${movieSummary}</p>
    `;

    document.getElementById("watchlistButton").addEventListener("click", function() {
        addToWatchlist({
            id: movie.id,
            name: movieName,
            image: movieImage,
            rating: rating,
            premiered: premiered
        });
    });
}

function getWatchlist() {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
}

function saveWatchlist(watchlist) {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

function isInWatchlist(movieId) {
    return getWatchlist().some(function(movie) {
        return movie.id === movieId;
    });
}

function addToWatchlist(movie) {
    const watchlist = getWatchlist();

    if (isInWatchlist(movie.id)) {
        return;
    }

    watchlist.push(movie);
    saveWatchlist(watchlist);

    const watchlistButton = document.getElementById("watchlistButton");
    watchlistButton.textContent = "Added to Watchlist";
    watchlistButton.classList.add("saved");
    watchlistButton.disabled = true;

    showToast(`${movie.name} was added to your watchlist.`);
}

function removeFromWatchlist(movieId) {
    const watchlist = getWatchlist().filter(function(movie) {
        return movie.id !== movieId;
    });

    saveWatchlist(watchlist);
    renderWatchlist();
}

function renderWatchlist() {
    const watchlistSection = document.getElementById("watchlistSection");

    if (!watchlistSection) {
        return;
    }

    const watchlist = getWatchlist();

    if (watchlist.length === 0) {
        watchlistSection.innerHTML = `
            <div class="emptyWatchlist">
                <h2>Your watchlist is empty</h2>
                <p>Search for something fun, save it, and it will show up here.</p>
                <a href="./movieSearch.html">Find something to watch</a>
            </div>
        `;
        return;
    }

    watchlistSection.innerHTML = `
        <div class="watchlistGrid">
            ${watchlist.map(function(movie) {
                return `
                    <div class="watchlistItem">
                        ${movie.image ? `<img src="${movie.image}" alt="${escapeHTML(movie.name)}">` : `<div class="watchlistPlaceholder">No image</div>`}
                        <div>
                            <h3>${escapeHTML(movie.name)}</h3>
                            <p>${escapeHTML(movie.rating || "Unrated")} - ${escapeHTML(movie.premiered || "Unknown year")}</p>
                            <button class="removeWatchlistButton" data-movie-id="${movie.id}">Remove</button>
                        </div>
                    </div>
                `;
            }).join("")}
        </div>
    `;

    document.querySelectorAll(".removeWatchlistButton").forEach(function(button) {
        button.addEventListener("click", function() {
            removeFromWatchlist(Number(button.dataset.movieId));
        });
    });
}

async function showSuggestions() {
    const input = document.getElementById("inputField").value.trim();
    const suggestions = document.getElementById("suggestions");

    if (input.length < 2) {
        suggestions.innerHTML = "";
        return;
    }

    const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(input)}`;
    const response = await fetch(url);
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
            <button class="suggestionItem" type="button" onclick="selectSuggestion('${show.name.replace(/'/g, "\\'")}')">
                ${escapeHTML(show.name)}
            </button>
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

function quickSearch(query) {
    const input = document.getElementById("inputField");

    input.value = query;
    searchMovies();
}

function surpriseMe() {
    const randomIndex = Math.floor(Math.random() * surpriseSearches.length);
    quickSearch(surpriseSearches[randomIndex]);
}

function showToast(message) {
    const toastMessage = document.getElementById("toastMessage");

    if (!toastMessage) {
        return;
    }

    toastMessage.textContent = message;
    toastMessage.classList.add("visible");

    setTimeout(function() {
        toastMessage.classList.remove("visible");
    }, 2200);
}

function escapeHTML(text) {
    return String(text).replace(/[&<>"']/g, function(character) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;",
            "'": "&#039;"
        }[character];
    });
}

const inputField = document.getElementById("inputField");

if (inputField) {
    inputField.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            searchMovies();
        }
    });
}

renderWatchlist();
