import {DateParser, JsonParser} from '../index'

describe('JsonParser:Should parse simple json', () => {

  const obj = {
    a: 'a',
    b: null,
    c: [1, 2, 3, 'a', 0, '1'],
    d: {
      da: 'da',
    }
  }

  test('Should parse without date', () => {

    const json = JSON.stringify(obj)

    expect(
      new JsonParser().parse(json)
    ).toEqual(obj)

  })

  test('Should parse with date', () => {
    obj.c = new Date()

    const json = JSON.stringify(obj)

    expect(
      new JsonParser().parse(json)
    ).not.toEqual(obj)

    expect(
      new JsonParser().withDateParserUTCISO8601().parse(json)
    ).toEqual(obj)

  })
})

// describe('JsonParser test Date',()=>{
//
// })
