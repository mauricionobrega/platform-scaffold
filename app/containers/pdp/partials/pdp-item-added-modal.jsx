import React, {PropTypes} from 'react'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

const PDPItemAddedModal = ({open, onDismiss}) => (
    <Sheet open={open} onDismiss={onDismiss} effect="slide-bottom">
        <button type="button" onClick={onDismiss}>
            close
        </button>
        <h2>Basic Sheet Example</h2>

        <p>Prevailed sincerity behaviour to so do principle mr. As departure at no propriety zealously my. On dear rent if girl view. First on smart there he sense. Earnestly enjoyment her you resources. Brother chamber ten old against. Mr be cottage so related minuter is. Delicate say and blessing ladyship exertion few margaret. Delight herself welcome against smiling its for. Suspected discovery by he affection household of principle perfectly he.</p>

        <input type="text" />

        <select>
            <option>1</option>
            <option>2</option>
        </select>
    </Sheet>
)

PDPItemAddedModal.propTypes = {
    open: PropTypes.bool,
    onDismiss: PropTypes.func
}

export default PDPItemAddedModal
