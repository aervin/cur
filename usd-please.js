var usdPlease = function(formatMe, useCents) {
    if (validateArgs(formatMe)) {
        var _formatMe = round(formatMe, 2).toString()
        var _useCents = useCents

        var leftOfDecimal = /.+?(?=\.)/g
        var rightOfDecimal = /[^.]+$/g

        var leftNumber = _formatMe.match(leftOfDecimal)[0]
        var roundUp =
            parseInt(_formatMe.match(rightOfDecimal)[0]) >= 50 || false

        var dollars = getUSDCommaSeparatedNumber(leftNumber)
        var cents = _useCents ? _formatMe.match(rightOfDecimal)[0] : undefined

        if (cents !== undefined && cents.length < 2) {
            cents += `0`
        }

        if (!_useCents) {
            dollars = roundUp
                ? getUSDCommaSeparatedNumber(
                      (parseInt(leftNumber) + 1).toString()
                  )
                : dollars
        }

        var result = `${dollars}${cents !== undefined ? `.` + cents : ``}`
        return result
    }
    return undefined
}

var isFloat = function(num) {
    return num % 1 === 0
}

var types = ['number']

var getUSDCommaSeparatedNumber = function(num) {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

var round = function(value, exp) {
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math.round(value)
    }

    value = +value
    exp = +exp

    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN
    }

    value = value.toString().split('e')
    value = Math.round(+(value[0] + 'e' + (value[1] ? +value[1] + exp : exp)))
    value = value.toString().split('e')
    return +(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp))
}

var validateArgs = function(args) {
    return types.indexOf(typeof args) >= 0 ? true : false
}

module.exports = usdPlease
