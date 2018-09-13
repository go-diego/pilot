export default class Service {
    constructor() {
        this.apiKey = "12345";
    }
    getSuggestions = value => {
        return new Promise(resolve, reject, () => resolve(value));
    };

    getApiKey = () => {
        return new Promise(resolve, reject, () => resolve(this.apiKey));
    };
}
