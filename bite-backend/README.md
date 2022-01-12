## Bite Backend Server
Node.js app that takes requests from Bite's frontend and handles them accordingly. Requests for restaurant listings are sent with a given location (and more filters in the future), formatted and forwarded to the Yelp API, then returned to the frontend.

### Setup
Sending requests to Yelp requires a private API key. This is stored in the `src/keys.js` file, which is not included in this repository. Thus you need to make it yourself before running the app. Copy and paste the following format, filling out your client ID and API key accordingly.
```javascript
const yelp = {
  clientID: '...',
  APIKey: '...'
};

exports.yelp = yelp;
```

### Usage
* `/restaurants/<location>` - Returns a list of restaurants near the given location. This can be an address, zip code, or city.
