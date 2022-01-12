## Bite Backend Server
Node.js app that takes requests from Bite's frontend and handles them accordingly. Requests for restaurant listings are sent with a given location (and more filters in the future), formatted and forwarded to the Yelp API, then returned to the frontend.

### Setup
Sending requests to Yelp requires a private API key. This is stored in the `src/keys.js` file, which is not included in this repository. Thus you need to make it yourself locally before running the app. Copy and paste the following format, filling out your client ID and API key accordingly.
```javascript
const yelp = {
  clientID: '...',
  APIKey: '...'
};

exports.yelp = yelp;
```

Also don't forget to run `npm install`.

### Usage
From the `bite-backend` directory, run `node .\src\index.js` to start the app. It will listen at the following endpoints

* `/restaurants/<location>` - Returns a list of restaurants near the given location. This can be an address, zip code, or city.
