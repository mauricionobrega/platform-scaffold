// import {getTextFrom, parseTextLink, parseImage} from '../../utils/parser-utils'
// import {urlToPathKey} from '../../../utils/utils'

export const startersKitParser = () => {
    return {
        title: 'my title',
        description: 'a much longer description'
    }

    // const $products = $html.find('.item.product-item')
    // const productMap = {}
    // $products.each((_, product) => {
    //     const $product = $(product)
    //     const link = parseTextLink($product.find('.product-item-link'))
    //     const image = parseImage($product.find('.product-image-photo'))
    //     productMap[urlToPathKey(link.href)] = {
    //         title: link.text.trim(),
    //         price: getTextFrom($product, '.price'),
    //         link,
    //         image,
    //         carouselItems: [
    //             {
    //                 img: image.src,
    //                 position: '1'
    //             }
    //         ]
    //     }
    // })
    // return productMap
}
