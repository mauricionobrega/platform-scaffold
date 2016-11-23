import ChildFrame from 'progressive-web-sdk/dist/iframe/child'

const frame = new ChildFrame({debug: true})

frame.on('child:navigate', ({url}) => {
    window.location.href = url
})
