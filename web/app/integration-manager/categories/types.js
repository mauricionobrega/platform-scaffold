import * as Runtypes from 'runtypes'

import {Text, CategoryID, ProductID, URL, Image, Identifier, Integer, Nullable} from '../types'

const IconID = Identifier

export const Category = Runtypes.Record({
    id: CategoryID,
    href: URL,
    title: Text,
    itemCount: Integer,
    // Top-level categories have parentId = null
    parentId: Nullable(CategoryID),
    products: Runtypes.Array(ProductID)
}).And(Runtypes.Optional({
    icon: Runtypes.Union(IconID, Image)
}))

export const Categories = Runtypes.Dictionary(Category, CategoryID)
