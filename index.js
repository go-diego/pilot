require("./site.scss");
import Service from "./service.js";

const service = new Service();

// TODO: show view count?
const suggestion = (thumbnail, title, description) => {
    const template = `
    <div class="box">
        <article class="media">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img src="${thumbnail.url}">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                <p>
                    <strong>${title}</strong>
                    <br>
                    ${description}
                </p>
            </div>
        </article>
    </div>`;
    return template;
};

document.addEventListener("DOMContentLoaded", function(event) {
    const suggestionsContainer = document.querySelector("#suggestions");
    const searchBar = document.querySelector("#searchBar");
    let suggestionsList = [];

    searchBar.addEventListener("keypress", event => {
        if (searchBar.value == "") {
            suggestionsList = [];
            renderSuggestion(suggestionsList);
        } else {
            service.getSuggestions(event.target.value).then(response => {
                for (var i = 0; i < response.items.length; i++) {
                    const { snippet } = response.items[i];
                    suggestionsList.push(suggestion(snippet.thumbnails.high, snippet.title, snippet.description));
                }
                renderSuggestion(suggestionsList);
                suggestionsList = [];
            });
        }
    });

    const renderSuggestion = list => {
        const content = list.join("");
        suggestionsContainer.innerHTML = content;
    };
});
