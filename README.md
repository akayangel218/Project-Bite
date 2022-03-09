<div align="center">
  <img src="https://user-images.githubusercontent.com/42536770/157548135-55360045-8771-40d7-acff-d3c188fde26e.png" style="height: 200px" />
</div>

# Project-Bite
Bite is a web app designed to help you find an ideal place to eat. Using your location and preferences, we search nearby restaurants using yelp and try to match you with an ideal restaurant. You can also like and dislike restaurants, further curating your future results to the type of restaurants you'd match best with.

## Tech Stack
* React
* Node.js
* Express.js
* Axios.js

## Installation
There's two components to this app, the frontend React site, and the backend Node.js app.
1. Run `git clone <url>` to make a local copy of this repository
2. In terminal, navigate to `\bite-frontend\`
3. Run `npm install`
4. Run `npm start`
5. Navigate back to the root directory, then go to `\bite-backend\`
6. Run `npm install`
7. Create a new file inside `\bite-backend\src\` named `keys.js`
8. Acquire a yelp API key [here](https://www.yelp.com/developers/documentation/v3/authentication) and fill it in a file with this format:
```
const yelp = {
  APIKey: '...'
};

exports.yelp = yelp;
```
9. Alternatively, just ask us for our `keys.js` file and we'll send it to you. We just can't make it public.
10. Run `npm start`
11. Visit `http://localhost:3000/` and start using the app!
