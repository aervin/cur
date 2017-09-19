[![CircleCI](https://circleci.com/gh/aervin/usd-please/tree/master.svg?style=shield)](https://circleci.com/gh/aervin/usd-please/tree/master)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
# usd-please
Its only job is to transform integers/decimals into USD currency format. The production compilation weighs in at approximately 900 bytes!

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
