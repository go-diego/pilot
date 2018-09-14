require("./site.scss");
import Service from "./service.js";

const service = new Service();

document.addEventListener("DOMContentLoaded", function(event) {
    const searchBar = document.querySelector("#searchBar");
    searchBar.addEventListener("keydown", event => {
        service.getSuggestions(event.target.value).then(response => console.log("RESPONSE", response));
    });
});
