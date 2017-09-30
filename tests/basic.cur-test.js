const tests = [
    {
        curParams: {
            amount: 1234.56,
            includeCents: false
        },
        expected: '1,235',
        description: 'It should return a string...'
    },
    {
        curParams: {
            amount: '1234.56',
            includeCents: false
        },
        expected: undefined,
        description: 'It should return undefined...'
    },
    {
        curParams: {
            amount: 1234.56112,
            includeCents: true
        },
        expected: '1,234.56',
        description: 'It should round cents down...'
    },
    {
        curParams: {
            amount: 1234.56712,
            includeCents: true
        },
        expected: '1,234.57',
        description: 'It should round cents up...'
    },
    {
        curParams: {
            amount: 9812,
            includeCents: true
        },
        expected: '9,812.00',
        description: 'It should add zeros if needed...'
    },
    {
        curParams: {
            amount: 9812,
            includeCents: false
        },
        expected: '9,812',
        description: 'It should not add zeros...'
    },
    {
        curParams: {
            amount: -9812,
            includeCents: true
        },
        expected: '-9,812.00',
        description: 'It should add zeros and be negative...'
    },
    {
        curParams: {
            amount: -9812,
            includeCents: false
        },
        expected: '-9,812',
        description: 'It should not add zeros but be negative...'
    },
    {
        curParams: {
            amount: -9000812.55,
            includeCents: false
        },
        expected: '-9,000,813',
        description: 'Technically, it should round "down"...'
    },
    {
        curParams: {
            amount: 9000812.5,
            includeCents: false
        },
        expected: '9,000,813',
        description: 'It should round up to nearest whole number...'
    },
    {
        curParams: {
            amount: 9000812.5,
            includeCents: false,
            config: {
                thousandsSeparator: "'"
            }
        },
        expected: "9'000'813",
        description: "The thousands separator should be '..."
    },
    {
        curParams: {
            amount: 9000812.5,
            includeCents: true,
            /* Ital. Norw. etc */
            config: {
                thousandsSeparator: '.',
                decimalSeparator: ','
            }
        },
        expected: '9.000.812,50',
        description: "The thousands separator should be '..."
    },
    {
        curParams: {
            amount: 12999.12,
            includeCents: true,
            /* Ital. Norw. etc */
            config: {
                thousandsSeparator: '\''
            }
        },
        expected: '12\'999.12',
        description: "It should default decimalSeparator to '.'..."
    },
    {
        curParams: {
            amount: 12999.12,
            includeCents: true,
            /* Ital. Norw. etc */
            config: {
                decimalSeparator: '\''
            }
        },
        expected: '12,999\'12',
        description: "It should default thousandsSeparator to ','..."
    }

]

module.exports = tests
