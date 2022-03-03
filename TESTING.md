# Unit Testing Overview

## Frontend
**File location:**

**Testing module:** JEST.js for React

**Instructions to run:**

## Backend
**File location:** `/bite-backend/src/index.test.js`

**Testing module:** Vanilla Javascript (no special framework or library used)

**Instructions to run:**
1. In terminal, navigate to `/bite-backend/`
2. If you haven't already, run `npm install`
3. Start the backend with `npm start` or `node ./src/index.js`
4. Run the tests with `npm run tests` or `node ./src/index.test.js`

### Test cases:
`test_distance()`
Equivalence class: `/src/index.js > app.get('/restaurants/<distance>')`
1. Searches for restaurants within 2 miles of San Francisco
2. Loops thru results and checks that all restaurants are at most 2 miles away
3. If any restaurant's distance is greater than 2, fail test
4. Otherwise, pass test

`test_price()`
Equivalence class: `/src/index.js > app.get('/restaurants?price={}')`
1. Searches for restaurants with price points of 1 and 4
2. Loops thru results and checks that all restaurants have either one or four dollar signs
3. If any restaurant has two or three dollar signs, fail test
4. Otherwise, pass test

`test_rating()`
Equivalence class: `/src/index.js > app.get('/restaurants?rating={}')`
1. Searches for restaurants with a rating of 4 stars (4.5 stars also permitted)
2. Loops thru results and checks that all restaurants have a rating of 4 or 4.5 stars
3. If any restaurant has between 1 and 3.5 stars, or 5 stars, fail test
4. Otherwise, pass test

`test_likes()`
Equivalence class: `/src/index.js > app.get('/restaurants?top_cuisines={}')`
1. Mocks a search from the point of view of a user who has liked 3 chinese restaurants
2. Loops thru results and checks that all chinese restaurants have a relevance score of 3
3. If a chinese restaurant is missing the relevance score, or it is not 3, fail test
4. Otherwise, pass test

`test_dislikes()`
Equivalence class: `/src/index.js > app.get('/restaurants?dislikes={}')`
1. Mocks a search from the point of view of a user who has disliked several restaurants
   - Specifically those with IDs: `['HHtpR0RslupSQ99GIIwW5A', 'oa6ZaLdQNzZHP7--gxBh2g', 'J7_-faNq_Ag9qTOlDn81Pw']`
2. Loops thru results and checks that none of the dislikes appear
3. If a restaurant's ID matches one in the list of dislikes, fail test
4. Otherwise, pass test

`test_sorting()`
Equivalence class: `/src/index.js > app.get('/restaurants?top_cuisines={}')`
1. Searches for restaurants in San Francisco
2. Loops thru results and stores indexes of chinese restaurants
3. Mocks another search for restaurants in San Francisco, but from the point of view of a user who has liked 3 chinese restaurants
4. Loops thru results and compares indexes of chinese restaurants with those previously stored
5. If new result's chinese restaurant's indexes are NOT exactly 3 less than previously stored indexes, fail test
   - i.e. chinese restaurants should appear 3 spots higher, hence having their index subtracted by 3
7. Otherwise, pass test

`test_details()`
Equivalence class: `/src/index.js > app.get('/details/<ID>')`
1. Sends request to /details/ endpoint for restaurant with ID HHtpR0RslupSQ99GIIwW5A
2. Checks that the name is correct, and that lists of images and business hours are returned
3. If name is not 'Marufuku Ramen', fail test
4. If list of images is missing, fail test
5. If list of business hours is missing, fail test
6. Otherwise, pass test
