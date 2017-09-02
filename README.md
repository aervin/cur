# usd-please
Its only job is to transform integers/decimals into USD currency format.

Installation:
```
npm i -S usd-please@latest
```
<br>


Usage:
```
usd(figureToBeFormatted: number, returnDollarsAndCents: boolean) => string | undefined
```
<br>


Example with cents:
```
const usd = require('usd-please')
const dollars = 1234.56
const formattedDollars = usd(dollars, true)

console.log(`$${formattedDollars}`)
// =>  $1,234.56
```

Example without cents:
```
const usd = require('usd-please')
const dollars = 1234.56
const formattedDollars = usd(dollars)

console.log(`$${formattedDollars}`)
// =>  $1,235
```
<br>


This project uses Node's built-in assertion library for testing. Additional tests can be added to `test.js` easily. The project is formatted using Prettier.
```
npm run test
```
is a wrapper for
```
node ./test.js
```
and
```
npm run format
```
is a wrapper for
```
prettier --write --tab-width 4 --no-semi --trailing-comma none ./*.js
```
<br>


Please post bugs to the issues page. Thanks!
