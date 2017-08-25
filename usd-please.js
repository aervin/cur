var usdPlease = {
    transform: function(formatMe, useCents) {
        if (validateArgs(formatMe)) {
            var _formatMe = round(formatMe, 2).toString()
            var _useCents = useCents

            var leftOfDecimal = /.+?(?=\.)/g
            var rightOfDecimal = /[^.]+$/g

            var leftNumber = _useCents
                ? _formatMe.match(leftOfDecimal)[0]
                : _formatMe
            var rightNumber = _formatMe.match(rightOfDecimal)[0] || undefined

            var dollars = getUSDCommaSeparatedNumber(leftNumber)
            var cents = rightNumber

            var roundUp = false
            if (rightNumber !== undefined && !_useCents) {
                roundUp = parseInt(rightNumber) >= 50 ? true : false
            }
            dollars =
                roundUp && !_useCents
                    ? getUSDCommaSeparatedNumber(
                          (parseInt(leftNumber) + 1).toString()
                      )
                    : dollars
            var result = dollars + (cents !== undefined ? '.' + cents : '')
            return result
        }
        return undefined
    }
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
    if (types.indexOf(typeof args) >= 0) {
        return true
    }
    return false
}

module.exports = usdPlease
