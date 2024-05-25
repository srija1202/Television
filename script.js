document.addEventListener("DOMContentLoaded", function () {
    const container = document.createElement("div");
    container.classList.add("container");

    const row1 = document.createElement("div");
    row1.classList.add("row");

    const col1 = document.createElement("div");
    col1.classList.add("col-12");

    const headerDiv = document.createElement("div");

    const header = document.createElement("h2");
    header.textContent = "Trending TV Shows";

    const paragraph = document.createElement("p");
    paragraph.textContent = "Pick your Favorite";

    headerDiv.appendChild(header);
    headerDiv.appendChild(paragraph);

    col1.appendChild(headerDiv);
    row1.appendChild(col1);

    const row2 = document.createElement("div");
    row2.classList.add("row");

    const col2 = document.createElement("div");
    col2.classList.add("col-12");

    const popularPicks = document.createElement("h5");
    popularPicks.textContent = "Popular Picks: Girls | The Flash | Fall River | Debris | Innocent | Bull | Big Shot | All Rise";

    col2.appendChild(popularPicks);
    row2.appendChild(col2);

    const row3 = document.createElement("div");
    row3.classList.add("row");

    const col3 = document.createElement("div");
    col3.classList.add("col-12", "col-md-8", "offset-md-2");

    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const input = document.createElement("input");
    input.setAttribute("type", "search");
    input.setAttribute("id", "showSearch");
    input.classList.add("form-control");
    input.setAttribute("placeholder", "Search for a show");

    const inputGroupAppend = document.createElement("div");
    inputGroupAppend.classList.add("input-group-append");

    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.classList.add("btn", "btn-primary");

    const icon = document.createElement("i");
    icon.classList.add("fa", "fa-search");
    icon.setAttribute("aria-hidden", "true");

    button.appendChild(icon);
    inputGroupAppend.appendChild(button);

    inputGroup.appendChild(input);
    inputGroup.appendChild(inputGroupAppend);

    col3.appendChild(inputGroup);
    row3.appendChild(col3);

    const row4 = document.createElement("div");
    row4.classList.add("row", "mt-4");
    row4.setAttribute("id", "cardDetails");

    container.appendChild(row1);
    container.appendChild(row2);
    container.appendChild(row3);
    container.appendChild(row4);

    document.body.appendChild(container);

    button.addEventListener("click", searchResult);
});

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
