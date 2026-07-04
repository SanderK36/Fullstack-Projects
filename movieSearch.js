async function searchMovies() {
    const userInput = document.getElementById("inputField").value.trim();
    if(userInput === ""){
        alert("Please enter a movie!")
    } else {
        const URL = `https://api.tvmaze.com/search/shows?q=${userInput}`
        const response = await fetch(URL)
        const json = await response.json()
        console.log(json)
        console.log(json[0].show.name)
        console.log(json[0].show.summary)
    }
}