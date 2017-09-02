# usd-please
Its only job is to transform integers/decimals into USD currency format.

Usage:
```
usd(figureToBeFormatted: number, returnDollarsAndCents: boolean) => string || undefined
```

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
