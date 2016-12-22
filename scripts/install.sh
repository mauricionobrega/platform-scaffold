#!/usr/bin/env bash

if [[ -z "${CI}" ]]; then
  pip install mitmproxy
else # CircleCI
  sudo pip install -U pip setuptools
  sudo pip install mitmproxy
fi
