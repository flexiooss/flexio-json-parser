import {ParserInterface} from './ParserInterface'
import {assert, isRegex} from 'flexio-jshelpers'

export const UTC_ISO8601_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/

const _DateFormatRE_ = Symbol(_DateFormatRE_)

/**
 * @implements ParserInterface
 */
export class DateParser extends ParserInterface {
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
   * @constructor
   */
  static DateParserUTCISO8601() {
    return new DateParser(UTC_ISO8601_RE)
  }

  /**
   *
   * @param {*} value
   * @return {boolean}
   */
  test(value) {
    return this[_DateFormatRE_].test(value)
  }

  /**
   *
   * @param {*} value
   * @return {Date}
   */
  process(value) {
    return new Date(value)
  }

}
