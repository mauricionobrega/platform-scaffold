import baseConfig from './baseConfig'

const url = `${baseConfig.baseURL}/checkout/cart/`

const closeIcon = {
    id: 'closeCart_id',
    imageUrl: 'file:///close.png'
}

const cartIcon = {
    id: 'cartIcon_id',
    imageUrl: 'file:///cart.png'
}

const searchIcon = {
    id: 'searchIcon_id',
    imageUrl: 'file:///search.png'
}

const shoppingCart = {
    id: 'shoppingCart_title',
    title: 'Shopping Cart'
}


const colors = {
    textColor: baseConfig.colors.whiteColor,
    backgroundColor: baseConfig.colors.primaryColor
}

export default {url, closeIcon, cartIcon, searchIcon, shoppingCart, colors}
