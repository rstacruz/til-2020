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
        ".rms-0",
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

  it('works (rms-1)', () => {
    expect(utils['.rms-0'].fontSize).toMatchInlineSnapshot(`
      Array [
        "16px",
      ]
    `)
    expect(utils['.rms-0'].lineHeight).toMatchInlineSnapshot(`
      Array [
        "25.6px",
      ]
    `)
  })

  it('works (rms-1)', () => {
    expect(utils['.rms-1'].fontSize).toMatchInlineSnapshot(`
      Array [
        "19px",
        "calc(17.89px + 0.11vw)",
        "min(max(18px, calc(17.89px + 0.11vw)), 19px)",
      ]
    `)
    expect(utils['.rms-1'].lineHeight).toMatchInlineSnapshot(`
      Array [
        "29px",
        "calc(27.39px + 0.17vw)",
        "min(max(27px, calc(27.39px + 0.17vw)), 29px)",
      ]
    `)
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
