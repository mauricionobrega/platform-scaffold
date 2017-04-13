import * as Runtypes from 'runtypes'

import {Text, CategoryID, ProductID, URL, Image, Identifier, Integer} from '../types'

const IconID = Identifier

export const Category = Runtypes.Record({
    id: CategoryID,
    href: URL,
    title: Text,
    itemCount: Integer,
    parentId: CategoryID,
    products: Runtypes.Array(ProductID)
}).And(Runtypes.Optional({
    icon: Runtypes.Union(IconID, Image)
}))

export const Categories = Runtypes.Dictionary(Category, CategoryID)
