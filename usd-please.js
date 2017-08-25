var usdPlease = {
    getUSDCommaSeparatedNumber: function(num) {
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },

    roundCents: function(num) {
        return (Math.round(num / 10) * 10).toString()
    },

    types: ["number"],

    transform: function(formatMe, _useCents) {
        var _formatMe = formatMe.toString()
        if (this.validateArgs(formatMe)) {
            var isFloat = function(num) {
                return num % 1 === 0
            }
            var leftOfDecimal = /.+?(?=\.)/g
            var rightOfDecimal = /[^.]+$/g

            var leftNumber = _formatMe.match(leftOfDecimal)[0] || _formatMe
            var rightNumber = _formatMe.match(rightOfDecimal)[0] || undefined

            var cents = rightNumber !== undefined && _useCents ? this.roundCents(parseInt(rightNumber)).substr(0, 2) : undefined
            var dollars = this.getUSDCommaSeparatedNumber(leftNumber)

            var roundUp = false
            if (rightNumber !== undefined) {
                roundUp = (parseInt(rightNumber) >= 50) ? true : false
            }
            dollars = (roundUp) ? this.getUSDCommaSeparatedNumber((parseInt(leftNumber) + 1).toString()) : dollars
            var result = dollars + ((cents !== undefined) ? '.' + cents : '')
            return result
        }
        return undefined
    },

    validateArgs: function (args) {
        if (this.types.indexOf(typeof args) >= 0) {
            return true
        }
        return false
    }
}

module.exports = usdPlease