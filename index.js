require("./site.scss");
import Service from "./service.js";

const service = new Service();

service.getApiKey().then(response => console.log(`YOU APIKEY IS ${response}`));
service.getSuggestions("Lorem Ipsum").then(response => console.log(`Should return "Lorem Ipsum": ${response}`));
