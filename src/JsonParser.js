'use strict'
import {ReviverParserInterface} from './reviverParsers/ReviverParserInterface'
import {DateParser} from './reviverParsers/DateParser'
import {assert} from 'flexio-jshelpers'

const _reviverParser_ = Symbol('_reviverParser_')
const _nativeJSONparse_ = Symbol('_nativeJSONparse_')
const _objectParse_ = Symbol('_objectParse')

/**
 * @class
 */
export class JsonParser {
  constructor() {
    /**
     *
     * @type {Map<string, ReviverParserInterface>}
     * @private
     */
    this[_reviverParser_] = new Map()
  }

  /**
   *
   * @return {JsonParser}
   */
  withDateParserUTCISO8601() {
    this.addReviverParser(DateParser.DateParserUTCISO8601())
    return this
  }

  /**
   *
   * @param {ReviverParserInterface} parser
   * @return {Symbol} token
   */
  addReviverParser(parser) {
    assert(parser instanceof ReviverParserInterface,
      'JsonParser:addReviverParser: `parser` should be an instance of ReviverParserInterface')
    const token = Symbol(parser.constructor.name)
    this[_reviverParser_].set(token, parser)
    return token
  }

  /**
   *
   * @param {string} json
   * @return {*}
   */
  parse(json) {
    return this[_objectParse_](this[_nativeJSONparse_](json))
  }

  /**
   *
   * @param {string} json
   * @return {object}
   * @private
   */
  [_nativeJSONparse_](json) {
    return JSON.parse(json, (key, value) => {
      for (const parser of this[_reviverParser_]) {
        if (parser[1].test(key, value)) {
          return parser[1].process(key, value)
        }
      }
      return value
    })
  }

  /**
   *
   * @param obj
   * @return {*}
   * @private
   */
  [_objectParse_](obj) {
    return obj
  }
}

