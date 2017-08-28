var types = ['number'];

var usdPlease = function(formatMe, useCents) {
    if (validateArgs(formatMe)) {
        var _formatMe = round(formatMe, 2).toString();
        var _useCents = useCents;
        var isNegative = formatMe < 0;

        var leftOfDecimal = /.+?(?=\.)/g;
        var rightOfDecimal = /[^.]+$/g;

        var leftNumber = _formatMe.match(leftOfDecimal)[0] || undefined;
        leftNumber = typeof leftNumber !== `undefined` && isNegative
            ? leftNumber.slice(1)
            : leftNumber;

        var rightNumber = _formatMe.match(rightOfDecimal)[0] || undefined;
        rightNumber = typeof rightNumber !== 'undefined' &&
            rightNumber.length === 1
            ? rightNumber + `0`
            : rightNumber;

        var roundUp = parseInt(rightNumber) >= 50 || false;

        var dollars = leftNumber !== undefined && leftNumber !== `0`
            ? getUSDCommaSeparatedNumber(leftNumber)
            : undefined;

        var cents = _useCents ? _formatMe.match(rightOfDecimal)[0] : undefined;
        if (cents !== undefined && cents.length < 2) {
            cents += `0`;
        }

        if (!_useCents) {
            dollars = roundUp
                ? getUSDCommaSeparatedNumber(
                      (parseInt(leftNumber) + 1).toString()
                  )
                : dollars;
        }

        var result = `${isNegative ? `-` : ``}${dollars || ``}${cents !== undefined ? `.` + cents : ``}`;
        return result;
    }
    return undefined;
};

module.exports = usdPlease;

/** Utility functions */

/**
 * Transforms 1234567 => 1,234,567
 * @param {string} num 
 * @returns {string}
 */
var getUSDCommaSeparatedNumber = function(num) {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Determines if number primitive
 * is a float
 * @param {number} num
 * @returns {boolean}
 */
var isFloat = function(num) {
    return num % 1 === 0;
};

/**
 * Rounds 123.45678 => 123.46
 * @param {number} value 
 * @param {number} exp
 * @returns {number}
 */
var round = function(value, exp) {
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math.round(value);
    }

    value = +value;
    exp = +exp;

    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }

    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? +value[1] + exp : exp)));
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp));
};

/**
 * The arg to be formatted and returned
 * by usd must be of type 'number'
 * @param {any} arg
 * @returns {boolean}
 */
var validateArgs = function(arg) {
    return types.indexOf(typeof arg) >= 0 ? true : false;
};
