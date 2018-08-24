import {ReviverParserInterface} from './ReviverParserInterface'
import {assert, isRegex} from 'flexio-jshelpers'

/**
 * @constant
 * @type {RegExp}
 */
export const UTC_ISO8601_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/

const _DateFormatRE_ = Symbol(_DateFormatRE_)

/**
 * @implements ReviverParserInterface
 */
export class DateParser extends ReviverParserInterface {
  /**
   *
   * @param {RegExp} regex
   */
  constructor(regex) {
    super()
    assert(isRegex(regex),
      'DateParser:withFormat: `regex` argument should be a Regex')
    /**
     *
     * @type {RegExp}
     * @private
     */
    this[_DateFormatRE_] = regex
  }

  /**
   *
   * @return {DateParser}
   * @static
   */
  static DateParserUTCISO8601() {
    return new DateParser(UTC_ISO8601_RE)
  }

  /**
   *
   * @param {string} key
   * @param {*} value
   * @return {boolean}
   */
  test(key, value) {
    return this[_DateFormatRE_].test(value)
  }

  /**
   *
   * @param {string} key
   * @param {*} value
   * @return {Date}
   */
  process(key, value) {
    return new Date(value)
  }

}
