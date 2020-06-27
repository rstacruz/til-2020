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
  steps: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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

  /** @type { { [key: string]: ReturnType<typeof getDefinition> } } */
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
 * Returns the definition for a utility.
 * @param {number} n
 * @param {Configuration['min']} min
 * @param {Configuration['max']} max
 * @returns {{ fontSize: string, lineHeight: string }}
 *
 * @example
 *   getDefinition(2, min, max)
 */

function getDefinition(n, min, max) {
  const screen = [min.screenwidth, max.screenwidth]

  const fontSize = [
    modularScale(n, min.base, min.ratio),
    modularScale(n, min.base, max.ratio),
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

/**
 * Interpolates between `min` and `max` values, depending on the screen size.
 * Works like polished's between(), but adds a clamp().
 * @param {number | string} min
 * @param {number | string} max
 * @param {number | string} screenMin
 * @param {number | string} screenMax
 * @returns {string[]}
 */

function clampedBetween(min, max, screenMin, screenMax) {
  const bet = between(min, max, screenMin, screenMax)

  if (min === max) {
    // For simpler cases
    return [min]
  } else {
    return [
      // Fallback for browsers without calc() support (IE11)
      round(max, 0),
      // Fallback for browsers without clamp() support
      bet,
      // Full
      `clamp(${round(min, 2)}, ${bet}, ${round(max, 2)})`,
    ]
  }
}

/**
 * Rounds off a CSS value, taking units into account.
 * @param {string} value
 * @param {number} places
 * @example
 *   round('24.123456789px', 1) => '24.1px'
 */

function round(value, places) {
  const unit = (value.match(/[a-z]+$/) || [])[0] || ''
  const k = 10 ** places
  return `${Math.round(parseInt(value) * k) / k}${unit}`
}

module.exports = {
  plugin: msPlugin,
  getUtilities,
}
