// check that document loads
import Service from "./service.js";

const service = new Service();

service.getApiKey().then(response => console.log(`YOU APIKEY IS ${response}`));
