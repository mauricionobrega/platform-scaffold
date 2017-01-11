import BaseConfig from './baseConfig'

const url = 'https://www.merlinspotions.com/checkout/cart/'

const closeIcon = {
    id: 'closeCart_id',
    imageUrl: 'file:///close.png'
}

const cartIcon = {
    id: 'cartIcon_id',
    imageUrl: 'file:///cart.png'
}

const colors = {
    textColor: BaseConfig.colors.whiteColor,
    backgroundColor: BaseConfig.colors.primaryColor
}

export default {url, closeIcon, cartIcon, colors}
