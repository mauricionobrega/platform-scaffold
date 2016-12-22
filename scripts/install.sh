#!/usr/bin/env bash

if [[ -z "${CI}" ]]; then
  pip install mitmproxy
else
  sudo pip install mitmproxy # CircleCI
fi
