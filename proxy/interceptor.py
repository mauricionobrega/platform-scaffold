class Replacer:
    def __init__(self):
        pass

    def response(self, flow):
        flow.response.replace(
            'cdn.mobify.com/sites/progressive-web-scaffold/production/loader.js',
            'localhost:8443/loader.js'
        )

def start():
    return Replacer()
