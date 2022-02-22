## Bite Backend Server
Node.js app that takes requests from Bite's frontend and handles them accordingly. Requests for restaurant listings are sent with a given location (and more filters in the future), formatted and forwarded to the Yelp API, then returned to the frontend.

### Setup
Sending requests to Yelp requires a private API key. This is stored in the `src/keys.js` file, which is not included in this repository. Thus you need to make it yourself locally before running the app. First get an API key [here](https://www.yelp.com/developers/documentation/v3/authentication), then make a file called `keys.js` inside `/src/`, and copy and paste the following format, filling out your client ID and API key accordingly.
```javascript
const yelp = {
  clientID: '...',
  APIKey: '...'
};

exports.yelp = yelp;
```

Also don't forget to run `npm install`.

### Usage
From the `bite-backend` directory, run `node .\src\index.js` or `npm start` to start the app. It will listen at the following endpoints

* `/restaurants/<location>/<distance>/<open now>/<does pickup>/<does delivery>` - Returns a list of restaurants given the following parameters:
  * `<location>` - Where to search. This can be an address, zip code, or city.
  * `<distance>` - Search radius in miles.
  * `<open now>` - Boolean value for whether or not to return only restaurants that are currently open
  * `<does pickup>` - Boolean value for whether or not to return only restaurants that do pickup
  * `<does delivery>` - Boolean value for whether or not to return only restaurants that do delivery
  * `price={}` - Optional list of numbers corresponding to price points. Including this will only show restaurants of those price points
  * `rating={}` - Optional list of numbers corresponding to star ratings. Including this will only show restaurants with those ratings
  * `cuisine={}` - Optional list of cuisine codes. Including this will only show restaurants serving at least one cuisine included in the list

* `/details/<restaurantID>` - Returns more details about a specific restaurant given the following parameters:
  * `<restaurantID>` - A restaurant ID (given in body of `/restaurants` results) to search for

### Testing
Some unit tests are provided to check the validity of the backend's results. Should any changes result in the parameters not working, the tests should reflect it. Do `npm run tests` to run the unit test file.
