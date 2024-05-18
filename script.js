document.querySelector("button").addEventListener("click", searchResult);
var data = '';
var response = '';

async function searchResult(e) {
    try {
        e.preventDefault();
        var query = document.getElementById("showSearch").value;
        var url = `https://api.tvmaze.com/search/shows?q=${query}`;
        response = await fetch(url);
        data = await response.json();
    } catch (error) {
        console.log(error);
    }
    document.getElementById("cardDetails").innerHTML = '';
    data.forEach(ele => {
        if(ele.show.image) {
            const genre = Object.values(ele.show.genres).join(', ');
            document.getElementById("cardDetails").innerHTML += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card">
                    <img src="${ele.show.image?.medium || ''}" class="card-img-top" alt="${ele.show.name}">
                    <div class="card-body">
                        <h5 class="card-title">${ele.show.name}</h5>
                        <p class="card-text"><b>Genres:</b> ${genre || 'N/A'}</p>
                        <p class="card-text"><b>Premiered Date:</b> ${ele.show.premiered || 'N/A'}</p>
                        <p class="card-text"><b>Schedule Days:</b> ${ele.show.schedule.days.join(', ') || 'N/A'}</p>
                        <p class="card-text"><b>Schedule Time:</b> ${ele.show.schedule.time || 'N/A'}</p>
                        <p class="card-text"><b>Rating:</b> ${ele.show.rating.average || 'N/A'}</p>
                        <p class="card-text"><b>Country:</b> ${ele.show.network?.country.name || 'N/A'}</p>
                        <p class="card-text"><b>Network:</b> ${ele.show.network?.name || 'N/A'}</p>
                        <p class="card-text"><b>Summary:</b> ${ele.show.summary || 'N/A'}</p>
                    </div>
                </div>
            </div>`;
        }
    });
}
