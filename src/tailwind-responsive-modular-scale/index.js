/** @typedef { import('./types').Configuration } Configuration */
/** @typedef { import('./types').PartialConfig } PartialConfig */
const plugin = require('tailwindcss/plugin')
const { between, math, modularScale } = require('polished')

/**
 * The plugin
 */

function msPlugin() {
  return plugin(({ addUtilities, theme }) => {
    /** @type {Configuration} */
    const config = theme('responsiveModularScale')
    const utils = getUtilities(config || {})
    addUtilities(utils)
  })
}

/*
 * Default values
 */

const DEFAULTS = {
  min: {
    base: '16px',
    ratio: 1.14,
    linebase: 1.6,
    lineratio: 0.957,
    screenwidth: '320px',
  },
  max: {
    base: '16px',
    ratio: 1.2,
    linebase: 1.6,
    lineratio: 0.957,
    screenwidth: '1200px',
  },
  prefix: 'rms',
  steps: [-1, 1, 2, 3, 4, 5, 6, 7, 8, 9],
}

/**
 * @param {PartialConfig} config
 * @returns {Configuration}
 */

function mergeConfig(config, defaults = DEFAULTS) {
  return {
    ...defaults,
    ...config,
    min: { ...defaults.min, ...config.min },
    max: { ...defaults.max, ...config.max },
  }
}

/**
 * @param {PartialConfig} config
 */

function getUtilities(config) {
  const conf = mergeConfig(config)
  const { min, max, prefix, steps } = conf

  const utilities = {}

  // Build for all steps (.rms-1, .rms-2, ...)
  for (let step of steps) {
    let className = step < 0 ? `.-${prefix}${step}` : `.${prefix}-${step}`
    const defn = getDefinition(step, min, max)
    utilities[className] = defn
  }

  return utilities
}

/**
 * @param {number} n
 * @param {Configuration['min']} min
 * @param {Configuration['max']} max
 */

function getDefinition(n, min, max) {
  const screen = [min.screenwidth, max.screenwidth]

  const fontSize = [
    round(modularScale(n, min.base, min.ratio)),
    round(modularScale(n, min.base, max.ratio)),
  ]

  const lineHeight = [
    math(`${min.linebase * min.lineratio ** n} * ${fontSize[0]}`),
    math(`${max.linebase * max.lineratio ** n} * ${fontSize[1]}`),
  ]

  return {
    fontSize: clampedBetween(...fontSize, ...screen),
    lineHeight: clampedBetween(...lineHeight, ...screen),
  }
}

function clampedBetween(min, max, screenMin, screenMax) {
  const bet = between(min, max, screenMin, screenMax)
  return `clamp(${bet}, ${round(min)}, ${round(max)})`
}

/**
 * @example
 * round('24.123456789px') => '24.12px'
 */

function round(/** @type {string} */ value, places = 2) {
  const unit = (value.match(/[a-z]+$/) || [])[0] || ''
  return `${Math.round(parseInt(value), places)}${unit}`
}

module.exports = {
  plugin: msPlugin,
  getUtilities,
}
