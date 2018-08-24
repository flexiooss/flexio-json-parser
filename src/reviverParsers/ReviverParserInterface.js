/**
 * @interface
 */
export class ReviverParserInterface {
  /**
   *
   * @param {string} key
   * @param {*} value
   * @return {boolean}
   */
  test(key, value) {
    throw new Error(
      ` test should be override`
    )
  }

  /**
   *
   * @param {string} key
   * @param {*} value
   * @return {*}
   */
  process(key, value) {
    throw new Error(
      ` process should be override`
    )
  }
}
