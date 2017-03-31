import * as Runtypes from 'runtypes'

export const Nullable = (type) => Runtypes.Union(type, Runtypes.Null, Runtypes.Undefined)

export const Link = Runtypes.Record({
    href: Runtypes.String,
    text: Runtypes.String,
    title: Nullable(Runtypes.String)
})

export const Image = Runtypes.Record({
    alt: Runtypes.String,
    src: Runtypes.String
})

export const ProductUIData = Runtypes.Record({
    breadcrumbs: Runtypes.Array(Link),
    uenc: Runtypes.String,
    itemQuantity: Runtypes.Number,
    ctaText: Runtypes.String
})

export const CarouselItem = Runtypes.Optional({
    thumb: Nullable(Runtypes.String),
    img: Runtypes.String,
    full: Runtypes.String,
    caption: Nullable(Runtypes.String),
    position: Runtypes.String,
    isMain: Runtypes.Boolean
})

export const ProductDetailsData = Runtypes.Record({
    title: Runtypes.String,
    price: Runtypes.String,
    carouselItems: Runtypes.Array(CarouselItem),
    description: Runtypes.String
})

export const ProductDetailsListData = Runtypes.Record({
    title: Runtypes.String,
    price: Runtypes.String,
    carouselItems: Runtypes.Array(CarouselItem),
    link: Link,
    image: Image
})
