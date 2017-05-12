/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const selectors = {
    checkoutTemplateIdentifier: '.t-checkout-shipping.t--loaded',

    registeredEmail: 'input[name="username"]',
    registeredPassword: 'input[name="password"][type="password"]',
    signIn: '.qa-checkout__sign-in',

    // Shipping info
    name: 'input[name="name"]',
    address: 'input[name="addressLine1"]',
    city: 'input[name*="city"]',
    country: 'select[name*="country"]',
    state: '[name*="region"]',
    postCode: 'input[name*="code"]',
    phone: 'input[name*="phone"]',
    lastShippingInfo: 'input[name*="phone"]', // Used to verify that shipping info has been completed
    continueToPayment: '.qa-checkout__continue-to-payment',

    paymentTemplate: '.t-app--checkingPayment',
    creditCardName: 'input[name="name"]',
    creditCardNumber: 'input[name="ccnumber"]',
    expiry: 'input[name="ccexpiry"]',
    cvv: 'input[name="cvv"]',

    submitOrder: 'button.c--primary[type="submit"]'
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
        // The password field is not displayed to the user until focus is
        // removed from the email field.
        .click(selectors.checkoutTemplateIdentifier)
        .waitForElementVisible(selectors.registeredPassword)
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
        .waitForElementVisible(selectors.name)
        .clearValue(selectors.name)
        .clearValue(selectors.address)
        .clearValue(selectors.city)
        .clearValue(selectors.country)
        .clearValue(selectors.state)
        .clearValue(selectors.postCode)
        .clearValue(selectors.phone)

        .setValue(selectors.name, userData.name)
        .setValue(selectors.address, userData.address)
        .setValue(selectors.city, userData.city)
        .setValue(selectors.country, userData.country)
        .setValue(selectors.state, userData.state)
        .setValue(selectors.postCode, userData.postCode)
        .setValue(selectors.phone, userData.phone)
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
