import * as Runtypes from 'runtypes'
import {Text, ProductID, Identifier, URL, Image, Money} from '../types'

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
    href: URL
}).And(Runtypes.Optional({
    thumbnail: Image,
    images: Runtypes.Array(Image),
    description: Text,
    variationCategories: Runtypes.Array(VariationCategory),
    variants: Runtypes.Array(Variant)
}))


export const Products = Runtypes.Dictionary(Product, ProductID)

export const ProductUIData = Runtypes.Record({
    breadcrumbs: Runtypes.Array(Link),
    itemQuantity: Runtypes.Number
})
