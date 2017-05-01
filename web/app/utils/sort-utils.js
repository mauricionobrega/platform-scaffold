const DOLLAR_SIGN = /\$/

export const sortLib = {
    // sort by name
    name: (a, b) => {
        // getting name of products
        const nameA = a.get('title')
        const nameB = b.get('title')

        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0
    },

    // sort by price
    price: (a, b) => {
        // replacing $ sign with empty string to compare the price
        const priceA = parseFloat(a.get('price').replace(DOLLAR_SIGN, ''))
        const priceB = parseFloat(b.get('price').replace(DOLLAR_SIGN, ''))

        return priceA - priceB
    },

    // sort by postition (default)
    position: () => 0
}
