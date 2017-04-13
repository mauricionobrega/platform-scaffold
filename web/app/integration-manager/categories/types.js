import * as Runtypes from 'runtypes'

import {Text, CategoryID, ProductID, URL, Image, Identifier, Integer, Nullable} from '../types'

const IconID = Identifier

export const CategoryInfo = Runtypes.Record({
    id: CategoryID,
    href: URL,
    title: Text,
    // Top-level categories have parentId = null
    parentId: Nullable(CategoryID),
}).And(Runtypes.Optional({
    icon: Runtypes.Union(IconID, Image)
}))

export const CategoryContents = Runtypes.Record({
    itemCount: Integer,
    products: Runtypes.Array(ProductID)
})

export const Category = CategoryInfo.And(CategoryContents)

export const Categories = Runtypes.Dictionary(Category, CategoryID)
