import {DataConstructorByKeyParser} from '../index'
import {
  DataConstructorByKeyInterface,
  keyConstructor
} from '../src/reviverParsers/KeyConstructorParser/DataConstructorByKeyInterface'

class Data extends DataConstructorByKeyInterface {
  constructor(a, b) {
    super()
    this.a = a
    this.b = b
  }

  toJSON() {
    return {
      [keyConstructor]: Data.constructor.name,
      a: this.a,
      b: this.b
    }
  }

  static fromJSON(obj) {
    return new Data(obj.a, obj.b)
  }
}

class DataBis extends DataConstructorByKeyInterface {
  constructor(a, b) {
    super()
    this.aa = a
    this.ba = b
  }

  toJSON() {
    return {
      [keyConstructor]: Data.constructor.name,
      aa: this.a,
      ba: this.b
    }
  }

  static fromJSON(obj) {
    return new Data(obj.a, obj.b)
  }
}

describe('DataConstructorByKeyParser', () => {

  test('Should throw if no DataConstructorByKeyInterface argument at construct', () => {

    expect(() => {
      new DataConstructorByKeyParser()
    }).toThrow()

    expect(() => {
      new DataConstructorByKeyParser('anything')
    }).toThrow()

    expect(() => {
      new DataConstructorByKeyParser({})
    }).toThrow()

    expect(() => {
      new DataConstructorByKeyParser(new Data('aa', 'bb'))
    }).not.toThrow()

  })

  test('Should `test` method find constructor name from key', () => {
    const instanceDataArgument = new Data('aa', 'bb')
    const dataToTest = new Data('aaaa', 'bbbb')
    const dataToTestWithoutPrototype = new Data('aaaa', 'bbbb').toJSON()
    const dataBisToTest = new DataBis('aaaa', 'bbbb').toJSON()

    expect(
      new DataConstructorByKeyParser(instanceDataArgument).test()
    ).toBe(false)

    expect(
      new DataConstructorByKeyParser(instanceDataArgument).test('', dataToTest)
    ).toBe(true)

    expect(
      new DataConstructorByKeyParser(instanceDataArgument).test('', {})
    ).toBe(false)

    expect(
      new DataConstructorByKeyParser(instanceDataArgument).test('', dataBisToTest)
    ).toBe(false)

  })

  test('Should `process` method return instance of constructor argument', () => {
    const instanceDataArgument = new Data('aa', 'bb')
    const dataToTest = new Data('aaaa', 'bbbb')
    const dataToTestWithoutPrototype = dataToTest.toJSON()
    const dataBisToTest = new DataBis('aaaa', 'bbbb').toJSON()

    expect(
      new DataConstructorByKeyParser(instanceDataArgument).process('', dataToTestWithoutPrototype)
    ).toBeInstanceOf(Data)

    expect(
      new DataConstructorByKeyParser(instanceDataArgument).process('', dataBisToTest)
    ).not.toBeInstanceOf(DataBis)

    expect(
      new DataConstructorByKeyParser(instanceDataArgument).process('', dataBisToTest)
    ).toBeInstanceOf(Data)

    expect(
      new DataConstructorByKeyParser(instanceDataArgument).process('', dataToTestWithoutPrototype)
    ).toEqual(dataToTest)

  })

})

