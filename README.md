[![CircleCI](https://circleci.com/gh/aervin/cur/tree/master.svg?style=shield)](https://circleci.com/gh/aervin/cur/tree/master)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
![minified](http://img.badgesize.io/aervin/cur/master/cur.js?label=minified)

# cur

If you want to format currency, it'll cost you 1kb.

### Installation:
```
npm i -S cur@latest
```
<br>


### Usage:
```
cur(
    figureToBeFormatted: number,
    returnDollarsAndCents: boolean, 
    config: { thousandsSeparator: string, decimalSeparator: string }
) => string | undefined
```
<br>


### Example with cents:
```
const cur = require('cur')
const dollars = 1234.56
const formattedDollars = cur(dollars, true)

console.log(`$${formattedDollars}`)
// =>  $1,234.56
```

### Example without cents:
```
import cur from 'cur'
const dollars = 1234.56
const formattedDollars = cur(dollars)

console.log(`$${formattedDollars}`)
// =>  $1,235
```

### Separators:
`cur` accepts an optional `config` argument with two properties, `thousandsSeparator` and `decimalSeparator`.
```
const formatCurrency = require('cur')
const config = { thousandsSeparator: "'", decimalSeparator: "," }
const amount = 1234.56
const formattedAmount = formatCurrency(amount, true, config)

console.log(formattedAmount)
// => 1'234,56
```
