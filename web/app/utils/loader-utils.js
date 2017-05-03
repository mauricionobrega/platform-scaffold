export const funcType = typeof function() {}

export const loadScript = ({id, src, onload, isAsync = true, onerror}) => {
    const script = document.createElement('script')

    // Setting UTF-8 as our encoding ensures that certain strings (i.e.
    // Japanese text) are not improperly converted to something else. We
    // do this on the vendor scripts also just in case any libs we
    // import have localized strings in them.
    script.charset = 'utf-8'
    script.async = isAsync
    script.id = id
    script.src = src
    if (typeof onload === funcType) {
        script.onload = onload
    }
    if (typeof onerror === funcType) {
        script.onerror = onerror
    }

    document.getElementsByTagName('body')[0].appendChild(script)
}

export const loadScriptAsPromise = ({id, src, onload, isAsync = true, rejectOnError = true}) => {
    return new Promise(
        (resolve, reject) => {
            loadScript({
                id,
                src,
                onload: typeof onload === funcType ? () => {
                    onload()
                    resolve()
                } : resolve,
                isAsync,
                onerror: rejectOnError ? reject : resolve
            })
        }
    )
}

export const isLocalStorageAvailable = () => {
    try {
        const x = '__test_key__'
        localStorage.setItem(x, x)
        localStorage.removeItem(x)
        return true
    } catch (e) {
        return false
    }
}
