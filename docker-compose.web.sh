#!/usr/bin/env sh
rm -rf .cache/*
yarn run gatsby develop -- --host 0.0.0.0 --port 25800
