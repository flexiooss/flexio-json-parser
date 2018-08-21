import {DateParser, UTC_ISO8601_RE} from '../index'

describe('DateParser', () => {

  test('Should throw if no Regex at construct', () => {

    expect(() => {
      new DateParser()
    }).toThrow()

    expect(() => {
      new DateParser('anything')
    }).toThrow()

    expect(() => {
      new DateParser({})
    }).toThrow()

    expect(() => {
      new DateParser(/anything/)
    }).not.toThrow()

  })

  test('Should `test` method use Regex at construct', () => {
    expect(
      new DateParser(/anything/).test()
    ).toBe(false)

    expect(
      new DateParser(/anything/).test('anything')
    ).toBe(true)

    expect(
      new DateParser(/anything/).test('what else')
    ).toBe(false)

  })

  test('Should `process` method return Date', () => {
    const date = new Date()
    const dateJSON = date.toJSON()

    expect(
      new DateParser(/anything/).process(dateJSON)
    ).toBeInstanceOf(Date)

    expect(
      new DateParser(/anything/).process(date)
    ).toBeInstanceOf(Date)

    expect(
      new DateParser(/anything/).process('anything')
    ).toBeInstanceOf(Date)

    expect(
      new DateParser(/anything/).process({})
    ).toBeInstanceOf(Date)

    expect(
      new DateParser(/anything/).process(dateJSON)
    ).toEqual(date)

  })

})

describe('DateParser test Regexp UTC_ISO8601_RE', () => {
  test('Should test UTC_ISO8601_RE with UTC ISO8601 Date', () => {
    const date = '2018-08-21T12:14:50.939Z'
    expect(
      UTC_ISO8601_RE.test(date)
    ).toBe(true)
  })

  test('Should test UTC_ISO8601_RE, from js Date.toJSON()', () => {
    const date = new Date().toJSON()
    expect(
      UTC_ISO8601_RE.test(date)
    ).toBe(true)
  })

  test('Should test UTC_ISO8601_RE, from js Date.toISOString()', () => {
    const date = new Date().toISOString()
    expect(
      UTC_ISO8601_RE.test(date)
    ).toBe(true)
  })
})
