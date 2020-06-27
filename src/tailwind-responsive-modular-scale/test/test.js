const { getUtilities } = require('../index')
let utils

describe('default settings', () => {
  beforeEach(() => {
    utils = getUtilities({})
  })

  it('has negative utilities', () => {
    expect(typeof utils['.-rms-1']).toEqual('object')
  })

  it('has utilities', () => {
    expect(Object.keys(utils)).toMatchInlineSnapshot(`
      Array [
        ".-rms-1",
        ".rms-1",
        ".rms-2",
        ".rms-3",
        ".rms-4",
        ".rms-5",
        ".rms-6",
        ".rms-7",
        ".rms-8",
        ".rms-9",
      ]
    `)
  })

  it('works', () => {
    expect(utils['.rms-1'].fontSize).toMatchInlineSnapshot(
      `"clamp(calc(17.64px + 0.11vw), 18px, 19px)"`
    )
    expect(utils['.rms-1'].lineHeight).toMatchInlineSnapshot(
      `"clamp(calc(27.00px + 0.17vw), 27px, 29px)"`
    )
  })
})

describe('custom prefix and steps', () => {
  beforeEach(() => {
    utils = getUtilities({ prefix: 'xyzabc', steps: [-1, 1, 2] })
  })

  it('has utilities', () => {
    expect(Object.keys(utils)).toMatchInlineSnapshot(`
      Array [
        ".-xyzabc-1",
        ".xyzabc-1",
        ".xyzabc-2",
      ]
    `)
  })
})
