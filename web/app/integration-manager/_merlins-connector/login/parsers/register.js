const registrationParser = ($html) => $html.find('form.form-create-account').attr('action')

export default registrationParser
