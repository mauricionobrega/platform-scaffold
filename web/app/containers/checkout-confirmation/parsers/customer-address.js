const customerAddressParser = ($, $html) => {
    return {
        form_key: $html.find('.form-address-edit [name="form_key"]').val(),
    }
}

export default customerAddressParser
