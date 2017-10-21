[![CircleCI](https://circleci.com/gh/aervin/cur/tree/master.svg?style=shield)](https://circleci.com/gh/aervin/cur/tree/master)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
![minified](http://img.badgesize.io/aervin/cur/master/cur.js?label=minified)

# cur
A helper function for currency formatting.

### Installation:
```
npm i -S cur@latest
```
<br>


### Interface:
```javascript
cur(
    figureToBeFormatted: number,
    returnDollarsAndCents: boolean, 
    config: { thousandsSeparator: string, decimalSeparator: string }
) => string | undefined
```
<br>

### Example:
```javascript
import cur from 'cur'

`$${cur(1234.56)}`
// "$1,235"
```

### Example with cents:
```javascript
const cur = require('cur')
`$${cur(1234.56, true)}`

// "$1,234.56"
```

### Separators:
`cur` accepts an optional `config` argument with two properties, `thousandsSeparator` and `decimalSeparator`.
```javascript
const cur = require('cur')
const config = { thousandsSeparator: "'", decimalSeparator: "," }
'$' + cur(1234.56, true, config)
// "$1'234,56"
```
