import commands from './commands'
import reducer from './reducer'

const defaultConfig = {
    /* ID of the site to be used */
    siteID: '2017refresh',
    /* Client ID identifying requests from this app to SFCC */
    /* https://documentation.demandware.com/DOC2/index.jsp?topic=%2Fcom.demandware.dochelp%2FOCAPI%2F17.4%2Fusage%2FClientApplicationIdentification.html&cp=0_11_2_2 */
    clientId: ''
}

export const config = {
}

const Connector = (cfg) => {
    Object.assign(config, defaultConfig, cfg)
    return {commands, reducer}
}

export default Connector
