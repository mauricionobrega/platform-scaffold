#!/usr/bin/env node
'use strict'

const http = require('http')
const https = require('https')
const connect = require('connect')
const httpProxy = require('http-proxy')
const harmon = require('harmon')
const process = require('process')
const pem = require('pem')

process.setMaxListeners(0)

const TAG = `<!-- MOBIFY - DO NOT ALTER - PASTE IMMEDIATELY AFTER OPENING HEAD TAG -->
<script type="text/javascript">/*<![CDATA[*/(function(e,f){function h(a){if(a.mode){var b=g("mobify-mode");b&&a[b]||(b=a.mode(c.ua));return a[b]}return a}function m(){function a(a){e.addEventListener(a,function(){c[a]=+new Date},!1)}e.addEventListener&&(a("DOMContentLoaded"),a("load"))}function n(){if(!f.visibilityState||!f.hidden){var a=new Date;a.setTime(a.getTime()+3E5);f.cookie="mobify-path=; expires="+a.toGMTString()+"; path=/";e.location.reload()}}function p(){k({src:"https://preview.mobify.com/v7/"})}function g(a){if(a=f.cookie.match(new RegExp("(^|; )"+a+"((=([^;]*))|(; |$))")))return a[4]||""}function l(a){f.write('<plaintext style="display:none">');setTimeout(function(){d.capturing=!0;a()},0)}function k(a,b){var e=f.getElementsByTagName("script")[0],c=f.createElement("script"),d;for(d in a)c[d]=a[d];b&&c.setAttribute("class",b);e.parentNode.insertBefore(c,e)}var d=e.Mobify={},c=d.Tag={};d.points=[+new Date];d.tagVersion=[7,0];c.ua=e.navigator.userAgent;c.getOptions=h;c.init=function(a){c.options=a;if(""!==g("mobify-path"))if(m(),a.skipPreview||"true"!=g("mobify-path")&&!/mobify-path=true/.test(e.location.hash)){var b=h(a);if(b){var d=function(){b.post&&b.post()};a=function(){b.pre&&b.pre();k({id:"mobify-js",src:b.url,onerror:n,onload:d},"mobify")};!1===b.capture?a():l(a)}}else l(p)}})(window,document);(function(){var o="//localhost:8443/loader.js";Mobify.Tag.init({mode:function(o){return/^((?!windows\sphone).)*(ip(hone|od)|android.*(mobile)(?!.*firefox))/i.test(o)?"enabled":"desktop"},enabled:{url:o},desktop:{capture:!1,url:"//a.mobify.com/merlinspotions-2/a.js"}})})();/*]]>*/</script>
<!-- END MOBIFY -->`

console.log('Proxying https://www.merlinspotions.com to https://localhost')

const runProxy = () => {
    const onError = (error) => console.log(error)

    const selects = []
    const simpleselect = {}

    simpleselect.query = 'head'
    simpleselect.func = (node) => {
        let head = ''
        const stream = node.createStream({inner: true})

        stream.on('data', (data) => {
            head += data
        })
        stream.on('end', () => {
            stream.end(`${TAG}${head}`)
        })
    }
    selects.push(simpleselect)

    const app = connect()
    app.use((req, res, next) => {
        res.writeHead(301,
            {Location: 'https://localhost' + req.url}
        )
        res.end()
        next()
    })
    http
        .createServer(app)
        .listen(80, '127.0.0.1')


    const httpsApp = connect()
    pem.createCertificate({days: 3, selfSigned: true}, (err, keys) => {
        if (err) {
            throw err
        }
        const httpsProxy = httpProxy.createProxyServer({
            target: 'https://www.merlinspotions.com',
            headers: {host: 'www.merlinspotions.com'},
        })
        httpsApp.use(harmon([], selects, true))
        httpsApp.use((req, res) => {
            httpsProxy.web(req, res)
        })
        httpsProxy.on('error', onError)
        https
            .createServer({
                key: keys.serviceKey,
                cert: keys.certificate,
            }, httpsApp)
            .listen(443, '127.0.0.1')
    })
}

runProxy()

process.on('SIGTERM', () => {
    process.exit(0)
})
