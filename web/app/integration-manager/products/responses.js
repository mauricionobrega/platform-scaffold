import {createAction as createReduxAction} from 'redux-actions'

import * as Runtypes from 'runtypes'

const Nullable = (type) => Runtypes.Union(type, Runtypes.Null, Runtypes.Undefined)

const Link = Runtypes.Record({
    href: Runtypes.String,
    text: Runtypes.String
})

const Image = Runtypes.Record({
    alt: Runtypes.String,
    src: Runtypes.String
})

const Breadcrumb = Runtypes.Record({
    href: Runtypes.String,
    text: Runtypes.String,
    title: Runtypes.String
})

const ProductUIData = Runtypes.Record({
    breadcrumbs: Runtypes.Array(Breadcrumb),
    uenc: Runtypes.String,
    formInfo: Runtypes.Always,
    itemQuantity: Runtypes.Number,
    ctaText: Runtypes.String
})

const typecheck = (type, value) => {
    try {
        type.check(value)
    } catch (e) {
        console.info(e)
        console.log(value)
    }
    return value
}

const createTypedAction = (description, type) => createReduxAction(
    description,
    (payload) => typecheck(type, payload)
)

export const receiveProductDetailsUIData = createTypedAction(
    'Receive Product Details UI data',
    Runtypes.Dictionary(ProductUIData)
)

const CarouselItem = Runtypes.Optional({
    thumb: Nullable(Runtypes.String),
    img: Runtypes.String,
    full: Runtypes.String,
    caption: Nullable(Runtypes.String),
    position: Runtypes.String,
    isMain: Runtypes.Boolean
})

const ProductDetailsData = Runtypes.Record({
    title: Runtypes.String,
    price: Runtypes.String,
    carouselItems: Runtypes.Array(CarouselItem),
    description: Runtypes.String
})

const ProductDetailsListData = Runtypes.Record({
    title: Runtypes.String,
    price: Runtypes.String,
    carouselItems: Runtypes.Array(CarouselItem),
    link: Link,
    image: Image
})

export const receiveProductDetailsProductData = createTypedAction(
    'Receive Product Details product data',
    Runtypes.Dictionary(ProductDetailsData)
)

export const receiveProductListProductData = createTypedAction(
    'Receive ProductList product data',
    Runtypes.Dictionary(ProductDetailsListData)
)
