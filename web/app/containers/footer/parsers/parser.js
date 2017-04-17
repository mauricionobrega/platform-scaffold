export const parseNewsLetter = ($content) => {
    const $form = $content.find('footer .form.subscribe')
    const method = $form.attr('method')
    const action = $form.attr('action')
    return {
        action,
        method: method ? method.toLowerCase() : ''
    }
}
