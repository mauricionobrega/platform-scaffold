import Astro from 'astro/astro-full'
import BackboneEvents from 'vendor/backbone-events'

const AppEvents = Astro.Utils.extend({}, BackboneEvents)

export default AppEvents
