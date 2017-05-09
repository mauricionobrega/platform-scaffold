/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

export const loadScript = ({id, src, onload, isAsync = true}) => {
    const script = document.createElement('script')

    // Setting UTF-8 as our encoding ensures that certain strings (i.e.
    // Japanese text) are not improperly converted to something else. We
    // do this on the vendor scripts also just in case any libs we
    // import have localized strings in them.
    script.charset = 'utf-8'
    script.async = isAsync
    script.id = id
    script.src = src
    script.onload = typeof onload === typeof function() {}
        ? onload
        : () => {}

    document.getElementsByTagName('body')[0].appendChild(script)
}
