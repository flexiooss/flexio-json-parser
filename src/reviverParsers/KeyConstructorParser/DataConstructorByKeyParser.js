import {assert, isObject} from 'flexio-jshelpers'
import {ReviverParserInterface} from '../ReviverParserInterface'
import {DataConstructorByKeyInterface} from './DataConstructorByKeyInterface'
import {DataConstructorKey} from './DataConstructorKey'

const _dataConstructor_ = Symbol('_dataConstructor_')
const _constructorName_ = Symbol('_constructorName_')

export class DataConstructorByKeyParser extends ReviverParserInterface {
  /**
   *
   * @param {DataConstructorByKeyInterface} dataConstructor
   * @param {String?} constructorName
   */
  constructor(dataConstructor, constructorName) {
    super()
    assert(dataConstructor instanceof DataConstructorByKeyInterface,
      'DataConstructorByKeyParser:withFormat: `dataConstructor` argument should be an instanceof DataConstructorByKeyInterface')
    /**
     *
     * @type {DataConstructorByKeyInterface} dataConstructor
     * @private
     */
    this[_dataConstructor_] = dataConstructor.constructor
    /**
     *
     * @type {String}
     * @private
     */
    this[_constructorName_] = constructorName || dataConstructor.constructor.name
  }


  /**
   *
   * @param {string} key
   * @param {*} value
   * @return {boolean}
   */
  test(key, value) {
    console.log(value)
    console.log(DataConstructorKey.hasDataConstructorKey(value))
    console.log(this[_constructorName_] === DataConstructorKey.getDataConstructorKey(value))
    return DataConstructorKey.hasDataConstructorKey(value) && (this[_constructorName_] === DataConstructorKey.getDataConstructorKey(value))
  }

  /**
   *
   * @param {string} key
   * @param {*} value
   * @return {DataConstructorByKeyInterface}
   */
  process(key, value) {
    return this[_dataConstructor_].fromJSON(value)
  }

}
