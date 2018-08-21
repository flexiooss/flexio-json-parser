import {JsonParser} from '../index'

test('Should parse simple json', () => {

  const obj = {
    a: 'a',
    b: null,
    c: [1, 2, 3, 'a', 0, '1'],
    d: {
      da: 'da'
    }
  }

  const json = JSON.stringify(obj)

  expect(
    new JsonParser().parse(json)
  ).toEqual(obj)

})

// test('Should handling assertion with environment', () => {
//   expect(process.env.NODE_ENV).toBe('test')
//   expect.anything(() => {
//     assert(true, 'do nothing ? %s', 'yes')
//   })
//   expect(() => {
//     assert(false, 'do nothing ? %s', 'no')
//   }).toThrow()
// })
