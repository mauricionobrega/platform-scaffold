import * as Runtypes from 'runtypes'

export const Nullable = (type) => Runtypes.Union(type, Runtypes.Null, Runtypes.Undefined)

const URL = Runtypes.String
const Currency = Runtypes.String
const Measure = Runtypes.String

// Text for the user
const Text = Runtypes.String
// Identifiers for the program
const Identifier = Runtypes.String
const ProductID = Identifier
const VariationCategoryID = Identifier

const Link = Runtypes.Record({
    href: URL,
    text: Text
}).And(Runtypes.Optional({
    title: Text
}))

const ImageSize = Runtypes.Record({
    height: Measure,
    width: Measure
})

const Image = Runtypes.Record({
    alt: Text,
    src: URL
}).And(Runtypes.Optional({
    zoomSrc: URL,
    thumbnailSrc: URL,
    caption: Nullable(Text),
    size: ImageSize,
    isMain: Runtypes.Boolean
}))

const Option = Runtypes.Record({
    value: Identifier,
    label: Text
})

const VariationCategory = Runtypes.Record({
    id: VariationCategoryID,
    label: Text,
    values: Runtypes.Array(Option)
})

const Variant = Runtypes.Record({
    id: ProductID,
    values: Runtypes.Dictionary(VariationCategoryID, Identifier)
})

const Product = Runtypes.Record({
    id: ProductID,
    title: Text,
    price: Currency,
    href: URL,
    thumbnail: Image,
    images: Runtypes.Array(Image)
}).And(Runtypes.Optional({
    description: Text,
    variationCategories: Runtypes.Array(VariationCategory),
    variants: Runtypes.Array(Variant)
}))


export const Products = Runtypes.Dictionary(Product, ProductID)

export const ProductUIData = Runtypes.Record({
    breadcrumbs: Runtypes.Array(Link),
    itemQuantity: Runtypes.Number,
    ctaText: Runtypes.String
})
