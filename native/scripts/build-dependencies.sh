#!/usr/bin/env bash

npm i

pushd onboarding
    npm i
    npm run build
popd
