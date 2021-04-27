# Stock Data

## API to hit

*JSON API URL :*
`https://jsonmock.hackerrank.com/api/stocks?date=<date>`

## Expected Outputs when result found

- `Open: {open}`
- `Close: {close}`
- `High: {high}`
- `Low: {low}`

## Expected Output when NO results found

In case of no results render below div
`<div data-test-id="no-result">No Results Found</div>`

## Environment 

- Angular CLI Version: 10.0.4
- Angular Core Version: 10.0.4
- Node Version: v12(LTS)
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/7gKmGO7g_L5ejuUWHolvPQ/stock-data.gif)

## Functionality Requirements

The component must have the following functionalities:

- The input should initially be empty. The user can type a date in this input box, for which the stock data will be searched. The date format has to be d-mmmm-yyyy (e.g., 5-January-2000).

- Clicking on the `Search` button should make an API GET call to the URL `https://jsonmock.hackerrank.com/api/stocks?date={input}` using the Angular HttpClient module. Here, {input} is the date entered into the text box. For example, for date 5-January-2000, the API hit has to be `https://jsonmock.hackerrank.com/api/stocks?date=5-January-2000`. The date passed to the URL must not have any leading zeroes in the date value.

- The response will contain a data field that contains stock data. A sample data field for date value `5-January-2000` is below:
```
  "data": [
    {
      "date": "5-January-2000",
      "open": 5265.09,
      "high": 5464.35,
      "low": 5184.48,
      "close": 5357
    }
  ]
```
  - data field is an array containing a single object. This single object contains the desired data. Retrieve the open, close, high, and low values from this, and render them in the format explained above.

- Display the data inside `<ul data-test-id="stock-data"></ul>`. This list will have the following list elements (in order as mentioned below):
  - `<li>Open: {open}</li>`, where {open} is the open value received from data above.
  - `<li>Close: {close}</li>`, where {close} is the close value received from data above.
  - `<li>High: {high}</li>`, where {high} is the high value received from data above.
  - `<li>Low: {low}</li>`, where {low} is the low value received from data above.

- The element `<ul data-test-id="stock-data"></ul>` is rendered only when data is fetched and the result is shown. Initially, it is not rendered since no API has been hit yet.

- If there is no stock data returned by the API, the user should render `<div data-test-id="no-result">No Results Found</div>` instead of the `<ul>` element. This element should be visible only when the data field is an empty array. It should not be rendered initially since no API has been hit yet.

- Please note that the input field accepts the date as text. Input will be tested only with valid dates, so writing input validation is not required.

- For testing purposes, please use the following date values - `5-January-2000` and `5-January-2001`.

## Testing Requirements

- The input should have the data-test-id attribute `app-input`.
- The `Search` button should have the data-test-id attribute `submit-button`.
- The `<ul>` should have the data-test-id attribute `stock-data`.
- The `No Results Found` div should have the data-test-id attribute `no-result`.

## Project Specifications

**Read Only Files**
- src/app/app.component.spec.ts
- src/app/stockData/stockData.component.spec.ts

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```
