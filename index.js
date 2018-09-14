require("./site.scss");
import Service from "./service.js";

const service = new Service();

service.getSuggestions("Cats").then(response => console.log("RESPONSE", response));
