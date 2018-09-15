export default class Service {
    constructor() {
        this.apiKey = process.env.APIKEY;
        this.origin = "https://www.googleapis.com/youtube/v3/search";
        this.baseParams = {
            part: "snippet",
            order: "viewCount",
            type: "video",
            videoDefinition: "high",
            key: this.apiKey,
            maxResults: 10
        };
    }
    getSuggestions = q => {
        const url = new URL(this.origin);
        const params = { ...this.baseParams, q };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        return fetch(url, params).then(response => response.json());
    };
}
