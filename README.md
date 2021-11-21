# Getting Started with AltCademy Currency Converter

## Example pages

1. https://www.xe.com
2. https://www.x-rates.com/table/?from=USD&amount=1 (this seems closer to the goals of the project)
3. API: https://exchangeratesapi.io (todo: need to sign up)
    1. This API tracks exchange rates of 33 different currencies. They are:
    2. 73bae01c122ba3be0c1a3d7278306dfd (KEY)
    3. http://api.exchangeratesapi.io/v1/latest?access_key=73bae01c122ba3be0c1a3d7278306dfd&symbols=USD,AUD,CAD,PLN,MXN&format=1
    4. Alternate API:
       1.  https://altexchangerateapi.herokuapp.com/
    5. AUD, BGN, BRL, CAD, CHF, CNY, CZK, DKK, EUR, GBP, HKD, HRK, HUF, IDR, ILS, INR, ISK, JPY, KRW, MXN, MYR, NOK, NZD, PHP, PLN, RON, RUB, SEK, SGD, THB, TRY, USD, ZAR.
    6. Get /latest?base=EUR
    7. JSON DATA:{
  "base":"EUR",
  "date":"2019-05-20",
  "rates":{
    "AUD":1.6141,
    "BGN":1.9558,
    "BRL":4.5666,
    "CAD":1.5,
    "CHF":1.1263,
    "CNY":7.7228,
    "CZK":25.766,
    "DKK":7.4681,
    "GBP":0.8762,
    "HKD":8.7656,
    //... more currencies
  }
}
4. let demo = () => {
  let rate = fx(1).from("GBP").to("USD")
  alert("£1 = $" + rate.toFixed(4))
}

fetch('https://api.exchangeratesapi.io/v1/latest?access_key=73bae01c122ba3be0c1a3d7278306dfd')
  .then((resp) => resp.json())
  .then((data) => fx.rates = data.rates)
  .then(demo)

## Goals of Project

1. A list/table showing exchange rates for a base currency against a list of currencies:
    1. User can change the base currency, and the list/table of rates will be updated.
    2. You can either use a drop down menu or a list of links to implement the base currency selection feature. It is up to you, but make sure it's intuitive.
2. A currency converter for a pair of currency, where the user can:
    1. Edit the amount to be converted. Either allow user to swap the direction of the currency pair, or allow amounts on both sides to be edited.
    2. Allow the user to change the currencies being calculated. Using a drop down menu or other means you think is intuitive.
3. Has a navigation bar:
    1. Site name, can be super generic or super fun.
    2. Anchor links if you are going to have multiple pages.
4. Has a footer:
    1. Link to your portfolio site or social media accounts.
5. It needs to be responsive, which means it can be easily used on a mobile browser as well!
6. Version managed with Git, and has a GitHub repository.
7. You need to deploy the production build either onto Netlify or Heroku (Heroku preferred).

## Project Framework

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
