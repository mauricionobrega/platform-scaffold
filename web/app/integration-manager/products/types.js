import * as Runtypes from 'runtypes'
import {Text, ProductID, Identifier, URL, Image} from '../types'

// A monetary value, notionally with an amount and a currency.
const Money = Runtypes.String

const VariationCategoryID = Identifier

const Link = Runtypes.Record({
    href: URL,
    text: Text
}).And(Runtypes.Optional({
    title: Text
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
    price: Money,
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
