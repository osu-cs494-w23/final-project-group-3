# Setting up your environment

## Generating an API key
1. Navigate to https://rapidapi.com/apidojo/api/unofficial-redfin
2. Create an account
3. Your key will now be visible from the previous link. Crtl+F for **X-RapidAPI-Key** and copy the key.
4. Create a file called **.env** in the root directory of your project.
5. Paste the following into the file, replacing the X's with your key
```
REACT_APP_REDFIN_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
Confirm that the key works by running your app and navigating to the http://localhost:3000/redfin/test page.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
