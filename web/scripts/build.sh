#!/usr/bin/env bash

rimraf build/
sdk-get-routes
sdk-create-hash-manifest
webpack --config webpack/production.js -p --display-error-details

# Copy native onboarding
rimraf ../native/app/build/app-www/onboarding/*
cp -r build/ ../native/app/build/app-www/onboarding
