/**
 * @interface
 */
export class ParserInterface {
  /**
   *
   * @param {*} value
   * @return {boolean}
   */
  test(value) {
    throw new Error(
      ` test should be override with this signature :
      /**
      * @param {*} value
      * @return {boolean}
      */`
    )
  }

  /**
   * @return {*}
   */
  process(value) {
    throw new Error(
      ` process should be override with this signature :
      /**
      * @param {*} value
      * @return {*}
      */`
    )
  }
}
