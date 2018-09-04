/**
 * @interface
 */
export class DataConstructorByKeyInterface {

  /**
   *
   * @param {object} obj
   * @return {this}
   * @constructor
   * @static
   */
  static fromJSON(obj) {
    throw Error('`fromJSON` fromJSON method should be override')
  }
}
