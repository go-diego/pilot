This is a coding exercise that implements a search bar for fetching data from the [YouTube Data API](). As the user types, details of videos on YouTube related to the value entered in the search bar are returned and displayed. This exercise explores building a front-end using only plain **Javascript/ES6**.

## Tools

-   [Webpack](https://webpack.js.org/)
-   [Babel](https://babeljs.io/)
-   [Bulma](https://bulma.io/)
-   [dotenv-webpack](https://github.com/mrsteele/dotenv-webpack#readme) for managing YouTube API Key
-   [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## Instructions

-   You will need an API key. To get one, you can follow the instructions outlined [here](https://developers.google.com/youtube/v3/getting-started).
-   Once you've acquired an API key, create an `.env` file and in it add

```
APIKEY=YOU_API_KEY_GOES_HERE
```

The `.env` file is already included in the `.gitignore`.

To build the project, run `npm run build`
To serve the project, run `npm start`
