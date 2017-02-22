import React, {PropTypes} from 'react'
import classNames from 'classnames'
import Button from 'progressive-web-sdk/dist/components/button'
const componentClass = 'c-nearest-stores'

/**
 * INSERT_DESCRIPTION_HERE
 */

class HomeNearestStores extends React.Component {

    componentWillMount() {

        const content = '<div><%=city%></div> <div class="u-text-bold"><%=distanceKM%>km</div>'

        const merlinsPotionsTemplate = `<% if(id){ %> <div class="pw-list-tile c-list-tile u-border-light-bottom u-text-font-family pw--is-anchor c--is-anchor"><a href="http://locations.merlinspotions.com<%=llpURL%>" class="pw-link c-link pw-list-tile__primary c-list-tile__primary"><div class="pw-list-tile__action c-list-tile__action"><svg aria-hidden="true" class="pw-icon c-icon" title="Store Icon" aria-labelledby="icon-888"><title id="icon-888"></title><use role="img" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#pw-store"></use></svg></div><div class="pw-list-tile__content c-list-tile__content u-padding-0 u-justify-between u-row"> ${content} </div><div class="pw-list-tile__action c-list-tile__action"><button class="pw-button c-button c--blank pw--icon-only c--icon-only" type="button"><div class="pw-button__inner c-button__inner"><svg aria-hidden="true" class="pw-icon c-icon pw-button__icon c-button__icon" title="Chevron Right Icon" aria-labelledby="icon-999"><title id="icon-999"></title><use role="img" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#pw-chevron-right"></use></svg></div></button></div></a></div> <% } else { %> <div class="u-padding-md u-text-align-center">Sorry, No locations near you.</div> <% } %>`

        const merlinsPotionsData = {
            business_id: '56c3681586312e000e000001', // Merlins Potions customer ID
            configs: [
                {
                    selector: '#donde-closest-locations-widget-1', // render in this element
                    nthNearest: 1,
                    maxDistance: '1500', // look in 1500 mi ra3dius
                    showSpinner: true,
                    template: merlinsPotionsTemplate // output template
                },
                {
                    selector: '#donde-closest-locations-widget-2', // render in this element
                    nthNearest: 2,
                    maxDistance: '1500', // look in 1500 mi radius
                    template: merlinsPotionsTemplate // output template
                },
                {
                    selector: '#donde-closest-locations-widget-3', // render in this element
                    nthNearest: 3,
                    maxDistance: '0.1', // look in 1500 mi radius
                    template: merlinsPotionsTemplate // output template
                }
            ]
        }

        const merlinsPotionsAsync = !function(a){var b=document.createElement("script");b.type="text/javascript",b.src="https://dtopnrgu570sp.cloudfront.net/nearby-widget/nearby.min.js",b.setAttribute("async",!0),b.addEventListener?b.addEventListener("load",function(b){a(null,b)},!1):b.onreadystatechange=function(){b.readyState in{loaded:1,complete:1}&&(b.onreadystatechange=null,a())},document.head.appendChild(b)}(function(){
            window.DondeNearby.load({ ...merlinsPotionsData })
        })

        const merlinsPotionsScript = document.createElement('script')
        merlinsPotionsScript.append(merlinsPotionsAsync)
        document.body.appendChild(merlinsPotionsScript)
    }

    render() {
        const {
            title,
            viewAllStoresText,
            className
        } = this.props

        const classes = classNames(componentClass, className, {
            // 'c--modifier': bool ? true : false
        })

        return (
            <div className={classes}>
                <div className="u-card u-padding-md u-padding-top-lg u-padding-bottom-lg">
                    <h2 className="u-padding-bottom-md u-border-light-bottom u-text-uppercase">{title}</h2>

                    <div className="u-margin-bottom-md">
                        <div id="donde-closest-locations-widget-1"></div>
                        <div id="donde-closest-locations-widget-2"></div>
                        <div id="donde-closest-locations-widget-3"></div>
                    </div>


                    <Button className="c--tertiary u-text-uppercase u-width-full" href="https://locations.merlinspotions.com">{viewAllStoresText}</Button>
                </div>
            </div>
        )
    }
}

HomeNearestStores.propTypes = {
    /**
     * PropTypes comments are REQUIRED for components to be included
     * in the styleguide
     */
    title: PropTypes.string.isRequired,

    /**
     * PropTypes comments are REQUIRED for components to be included
     * in the styleguide
     */
    viewAllStoresText: PropTypes.string.isRequired,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

}

export default HomeNearestStores
