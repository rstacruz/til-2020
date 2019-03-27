#!/usr/bin/env bash
# Post-build script to write Netlify rules

info() {
  echo -n -e "\n\033[33m==> $0:\033[32m $1\033[0m\n"
}

# https://www.codesections.com/blog/netlify/
info "Writing .netlify config"
echo "https://til.ricostacruz.com/* https://ricostacruz.com/til/:splat 301!" > public/.netlify
