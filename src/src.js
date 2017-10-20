var cur = function(amount, includeCents, config) {
    if (typeof amount === 'number') {
        config = config === undefined ? { thousandsSeparator: ',', decimalSeparator: '.' } : config
        config.thousandsSeparator = config.thousandsSeparator === undefined ? ',' : config.thousandsSeparator
        config.decimalSeparator = config.decimalSeparator === undefined ? '.' : config.decimalSeparator
        var _amount = rnd(amount, 2).toString()
        var amountIsNegative = amount < 0
        var amountIsDecimal = _amount.search(/\./) !== -1
        var leftOfAmountDecimal = /.+?(?=\.)/g
        var rightOfAmountDecimal = /[^.]+$/g
        var amountLeftNumber = (amountIsDecimal ? _amount.match(leftOfAmountDecimal)[0] : _amount) || undefined
        amountLeftNumber =
            typeof amountLeftNumber !== 'undefined' && amountIsNegative ? amountLeftNumber.slice(1) : amountLeftNumber
        var amountRightNumber = amountIsDecimal ? _amount.match(rightOfAmountDecimal)[0] : undefined
        amountRightNumber =
            typeof amountRightNumber !== 'undefined' && amountRightNumber.length === 1
                ? amountRightNumber + '0'
                : amountRightNumber
        var roundAmountUp = parseInt(amountRightNumber) >= 50 || false
        var amountDollars =
            amountLeftNumber !== undefined && amountLeftNumber !== '0'
                ? sep(amountLeftNumber, config.thousandsSeparator)
                : undefined
        var amountCents
        if (includeCents && !amountIsDecimal) {
            amountCents = '00'
        } else if (includeCents && amountIsDecimal) {
            amountCents = _amount.match(rightOfAmountDecimal)[0] || undefined
            amountCents = amountCents !== undefined && amountCents.length < 2 ? (amountCents += '0') : amountCents
        }
        if (!includeCents) {
            amountDollars = roundAmountUp
                ? sep((parseInt(amountLeftNumber) + 1).toString(), config.thousandsSeparator)
                : amountDollars
        }
        var res =
            (amountIsNegative ? '-' : '') +
            (amountDollars || '') +
            (amountCents !== undefined ? config.decimalSeparator + amountCents : '')
        return res
    }
    return undefined
}
var sep = function(num, separator) {
    if (typeof separator !== 'string') {
        throw Error('Problem with thousands separator. config.separator is not of type "string"')
    }
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}
var rnd = function(v, exp) {
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math.round(v)
    }
    v = +v
    exp = +exp
    if (isNaN(v) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN
    }
    v = v.toString().split('e')
    v = Math.round(+(v[0] + 'e' + (v[1] ? +v[1] + exp : exp)))
    v = v.toString().split('e')
    return +(v[0] + 'e' + (v[1] ? +v[1] - exp : -exp))
}
module.exports = cur
