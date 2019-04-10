default:
	@echo
	@echo "Makefile targets:"
	@grep -E '^[a-zA-Z_-].*?: .*?## .*$$' Makefile | sed 's#\\:#:#g' | awk 'BEGIN {FS = ": .*?## "}; {printf "\033[36m  %-20s\033[0m %s\n", $$1, $$2}'
	@echo

run := docker-compose run --rm web

yarn: ## Installs packages
	$(run) yarn

start: ## Starts the server
	$(run) yarn start

bash: ## Runs a shell inside a Docker container
	$(run) bash

tsc: ## Runs the TypeScript compiler
	$(run) yarn tsc

tsc\:watch: ## Runs the TypeScript compiler
	$(run) yarn tsc --watch

css_modules\:update: ## Update CSS modules
	$(run) yarn css_modules:update

# Aliases
i: yarn
s: start
c: css_modules\:update
t: tsc
tw: tsc\:watch
