const selectors = {
    checkoutTemplateIdentifier: '.t-checkout-shipping.t--loaded',

    registeredEmail: 'input[name="email"]',
    registeredPassword: 'input[name="password"]',
    signIn: '.qa-checkout__sign-in',

    // Shipping info
    name: 'input[name="name"]',
    address: 'input[name="address-line1"]',
    city: 'input[name*="city"]',
    country: 'select[name*="country"]',
    state: 'input[name*="state"]',
    postCode: 'input[name*="code"]',
    phone: 'input[name*="phone"]',
    lastShippingInfo: 'input[name*="phone"]', // Used to verify that shipping info has been completed
    shippingMethod: 'input[name="shipping-method"]',
    continueToPayment: '.qa-checkout__continue-to-payment',

    paymentTemplate: '.t-app--checkingPayment',
    creditCardName: 'input[name="name"]',
    creditCardNumber: 'input[name="ccnumber"]',
    expiry: 'input[name="ccexpiry"]',
    cvv: 'input[name="cvv"]',

    submitOrder: '.submitOrder'
}

const userData = {
    // Export a test email and password as environment variables with the following names
    registeredEmail: 'mobifyqa@gmail.com',
    registeredPassword: 'p4ssword',

    name: 'John Doe',
    address: '725 Granville St',
    city: 'Vancouver',
    state: 'BC',
    country: 'Canada',
    postCode: 'V7Y 1L1',
    phone: '604 343 4696',
    lastShippingInfo: '604 343 4696', // Used in workflow to assert you have filled out all Shipping Info

    creditCardNumber: '4111111111111111',
    lastPaymentDetail: 'Last Payment Detail Field' // Used in workflow to assert you have filled out all Payment Details
}

const Checkout = function(browser) {
    this.browser = browser
    this.selectors = selectors
    this.userData = userData
}

Checkout.prototype.continueAsGuest = function() {
    // Select Continue as Guest / Guest Checkout
    this.browser
        .log('Navigating to Guest Checkout')
        .waitForElementVisible(selectors.continueAsGuest)
        .click(selectors.continueAsGuest)
        .waitUntilMobified()
    return this
}

Checkout.prototype.continueAsRegistered = function() {
    // Sign in to continue Registered Checkout
    this.browser
        .log('Navigating to Registered Checkout')
        .waitForElementVisible(selectors.registeredEmail)
        .setValue(selectors.registeredEmail, userData.registeredEmail)
        .setValue(selectors.registeredPassword, userData.registeredPassword)
        .waitForElementVisible(selectors.signIn)
        .click(selectors.signIn)
        .waitUntilMobified()
    return this
}

Checkout.prototype.continueToPayment = function() {
    this.browser
        .log('Continue to Payment')
        .waitForElementVisible(selectors.continueToPayment)
        .click(selectors.continueToPayment)
    return this
}

Checkout.prototype.fillShippingInfo = function() {
    // Fill out Shipping info form fields
    this.browser
        .log('Fill out Shipping Info form fields')
        .setValue(selectors.name, userData.name)
        .setValue(selectors.address, userData.address)
        .setValue(selectors.city, userData.city)
        .setValue(selectors.country, userData.name)
        .setValue(selectors.state, userData.state)
        .setValue(selectors.postCode, userData.postCode)
        .setValue(selectors.phone, userData.phone)

        .waitForElementVisible(selectors.shippingMethod)
        .click(selectors.shippingMethod)
    return this
}

Checkout.prototype.fillPaymentDetails = function() {
    // Fill out Payment details form fields
    this.browser
        .log('Fill out Payment Details form fields')
        .setValue(selectors.creditCardName, userData.creditCardName)
        .setValue(selectors.creditCardNumber, userData.creditCardNumber)
        // ...
        .setValue(selectors.lastPaymentDetail, userData.lastPaymentDetail)
    return this
}

export default Checkout
