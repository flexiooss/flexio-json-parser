'use strict'
import {ParserInterface} from './parsers/ParserInterface'
import {DateParser} from './parsers/DateParser'
import {assert} from 'flexio-jshelpers'

const _parser_ = Symbol('_parser_')

/**
 * @class
 */
export class JsonParser {
  constructor() {
    /**
     *
     * @type {Map<string, ParserInterface>}
     * @private
     */
    this[_parser_] = new Map()
  }

  /**
   *
   * @return {JsonParser}
   */
  withDateParserUTCISO8601() {
    this.addParser(DateParser.DateParserUTCISO8601())
    return this
  }

  /**
   *
   * @param {ParserInterface} parser
   * @return {Symbol} token
   */
  addParser(parser) {
    assert(parser instanceof ParserInterface,
      'JsonParser:addParser: `parser` should be an instance of ParserInterface')
    const token = Symbol(parser.constructor.name)
    this[_parser_].set(token, parser)
    return token
  }

  /**
   *
   * @param {string} json
   * @return {*}
   */
  parse(json) {
    return JSON.parse(json, (key, value) => {
      for (const parser of this[_parser_]) {
        if (parser[1].test(value)) {
          return parser[1].process(value)
        }
      }
      return value
    })
  }
}

