#!/usr/bin/env sh

# Yarn install as needed
if [ ! -x ./node_modules/.bin/gatsby ]; then
  yarn
fi

# Clear cache as needed
if [ -d .cache ]; then
  rm -rf .cache/*
fi

# Yarn run
yarn run gatsby develop -- --host 0.0.0.0 --port 25800
