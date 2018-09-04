import {isObject} from 'flexio-jshelpers'

export const keyConstructor = '__@constructor@__'

export class DataConstructorKey {
  /**
   *
   * @param {Object} obj
   * @param {string?} constructorName
   * @return {Object}
   * @static
   */
  static addDataConstructorKey(obj, constructorName) {
    return
    Object
      .defineProperty(keyConstructor, {
          configurable: false,
          writable: false,
          enumerable: true,
          value: constructorName || obj.constructor.name
        }
      )
  }

  /**
   *
   * @param {Object} obj
   * @return {boolean}
   * @static
   */
  static hasDataConstructorKey(obj) {
    return isObject(obj) && (keyConstructor in obj) && obj.hasOwnProperty(keyConstructor)
  }

  /**
   *
   * @param {Object} obj
   * @return {string}
   * @static
   */
  static getDataConstructorKey(obj) {
    try {
      return obj[keyConstructor]
    }
    catch (e) {
      console.log(e)
    }
    return ''
  }

}
