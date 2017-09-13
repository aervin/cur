const tests = [
    {
        usdParams: {
            amount: 1234.56,
            includeCents: false
        },
        expected: '1,235',
        description: 'It should return a string...'
    },
    {
        usdParams: {
            amount: '1234.56',
            includeCents: false
        },
        expected: undefined,
        description: 'It should return undefined...'
    },
    {
        usdParams: {
            amount: 1234.56112,
            includeCents: true
        },
        expected: '1,234.56',
        description: 'It should round cents down...'
    },
    {
        usdParams: {
            amount: 1234.56712,
            includeCents: true
        },
        expected: '1,234.57',
        description: 'It should round cents up...'
    },
    {
        usdParams: {
            amount: 9812,
            includeCents: true
        },
        expected: '9,812.00',
        description: 'It should add zeros if needed...'
    },
    {
        usdParams: {
            amount: 9812,
            includeCents: false
        },
        expected: '9,812',
        description: 'It should not add zeros...'
    },
    {
        usdParams: {
            amount: -9812,
            includeCents: true
        },
        expected: '-9,812.00',
        description: 'It should add zeros and be negative...'
    },
    {
        usdParams: {
            amount: -9812,
            includeCents: false
        },
        expected: '-9,812',
        description: 'It should not add zeros but be negative...'
    }
]

module.exports = tests
