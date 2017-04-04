const signinParser = ($html) => $html.find('form.form-login').attr('action')

export default signinParser
