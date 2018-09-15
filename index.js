require("./site.scss");
import Service from "./service.js";

const service = new Service();

const suggestion = (thumbnail, title, description) => {
    const template = `
    <div class="box">
        <article class="media">
            <figure class="media-left">
                <p class="image is-128x128">
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
    const searchBar = document.querySelector("#search-bar");
    const orderByViewsBtn = document.querySelector("#order-by-views");
    const orderByRatingsBtn = document.querySelector("#order-by-ratings");
    let suggestionsList = [];
    let order;

    orderByViewsBtn.addEventListener("click", event => {
        orderByViewsBtn.classList.toggle("is-warning");
        if (orderByRatingsBtn.classList.contains("is-warning")) {
            orderByRatingsBtn.classList.remove("is-warning");
            order = "viewCount";
            getSuggestions(searchBar.value, order);
        } else {
            getSuggestions(searchBar.value);
        }
    });

    orderByRatingsBtn.addEventListener("click", event => {
        orderByRatingsBtn.classList.toggle("is-warning");
        if (orderByViewsBtn.classList.contains("is-warning")) {
            orderByViewsBtn.classList.remove("is-warning");
            order = "rating";
            getSuggestions(searchBar.value, order);
        } else {
            getSuggestions(searchBar.value);
        }
    });

    searchBar.addEventListener("keyup", event => {
        if (searchBar.value == "") {
            orderByRatingsBtn.setAttribute("disabled", true);
            orderByViewsBtn.setAttribute("disabled", true);
            orderByRatingsBtn.classList.remove("is-warning");
            orderByViewsBtn.classList.remove("is-warning");

            suggestionsList = [];
            renderSuggestion(suggestionsList);
        } else {
            orderByRatingsBtn.removeAttribute("disabled");
            orderByViewsBtn.removeAttribute("disabled");

            getSuggestions(event.target.value, order);
        }
    });

    const getSuggestions = (q, order) => {
        return service.getSuggestions(q, order).then(response => {
            for (var i = 0; i < response.items.length; i++) {
                const { snippet } = response.items[i];
                suggestionsList.push(suggestion(snippet.thumbnails.high, snippet.title, snippet.description));
            }
            renderSuggestion(suggestionsList);
            suggestionsList = [];
        });
    };

    const renderSuggestion = list => {
        const content = list.join("");
        suggestionsContainer.innerHTML = content;
    };
});
