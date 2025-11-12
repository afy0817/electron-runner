/*eslint-disable no-prototype-builtins*/
import * as $protobuf from 'protobufjs/minimal'

// Common aliases
const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util

// Exported root namespace
const $root = $protobuf.roots['default'] || ($protobuf.roots['default'] = {})

export const pedro = ($root.pedro = (() => {
  /**
   * Namespace pedro.
   * @exports pedro
   * @namespace
   */
  const pedro = {}

  pedro.RobotAlarm = (function () {
    /**
     * Properties of a RobotAlarm.
     * @memberof pedro
     * @interface IRobotAlarm
     * @property {number|Long|null} [timestamp] RobotAlarm timestamp
     * @property {string|null} [code] RobotAlarm code
     * @property {string|null} [description] RobotAlarm description
     */

    /**
     * Constructs a new RobotAlarm.
     * @memberof pedro
     * @classdesc Represents a RobotAlarm.
     * @implements IRobotAlarm
     * @constructor
     * @param {pedro.IRobotAlarm=} [properties] Properties to set
     */
    function RobotAlarm(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * RobotAlarm timestamp.
     * @member {number|Long} timestamp
     * @memberof pedro.RobotAlarm
     * @instance
     */
    RobotAlarm.prototype.timestamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0

    /**
     * RobotAlarm code.
     * @member {string} code
     * @memberof pedro.RobotAlarm
     * @instance
     */
    RobotAlarm.prototype.code = ''

    /**
     * RobotAlarm description.
     * @member {string} description
     * @memberof pedro.RobotAlarm
     * @instance
     */
    RobotAlarm.prototype.description = ''

    /**
     * Creates a new RobotAlarm instance using the specified properties.
     * @function create
     * @memberof pedro.RobotAlarm
     * @static
     * @param {pedro.IRobotAlarm=} [properties] Properties to set
     * @returns {pedro.RobotAlarm} RobotAlarm instance
     */
    RobotAlarm.create = function create(properties) {
      return new RobotAlarm(properties)
    }

    /**
     * Encodes the specified RobotAlarm message. Does not implicitly {@link pedro.RobotAlarm.verify|verify} messages.
     * @function encode
     * @memberof pedro.RobotAlarm
     * @static
     * @param {pedro.IRobotAlarm} message RobotAlarm message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RobotAlarm.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.timestamp != null && Object.hasOwnProperty.call(message, 'timestamp'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.timestamp)
      if (message.code != null && Object.hasOwnProperty.call(message, 'code'))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.code)
      if (message.description != null && Object.hasOwnProperty.call(message, 'description'))
        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.description)
      return writer
    }

    /**
     * Encodes the specified RobotAlarm message, length delimited. Does not implicitly {@link pedro.RobotAlarm.verify|verify} messages.
     * @function encodeDelimited
     * @memberof pedro.RobotAlarm
     * @static
     * @param {pedro.IRobotAlarm} message RobotAlarm message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RobotAlarm.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim()
    }

    /**
     * Decodes a RobotAlarm message from the specified reader or buffer.
     * @function decode
     * @memberof pedro.RobotAlarm
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {pedro.RobotAlarm} RobotAlarm
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RobotAlarm.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.pedro.RobotAlarm()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            message.timestamp = reader.int64()
            break
          }
          case 2: {
            message.code = reader.string()
            break
          }
          case 3: {
            message.description = reader.string()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
     * Decodes a RobotAlarm message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof pedro.RobotAlarm
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {pedro.RobotAlarm} RobotAlarm
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RobotAlarm.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader)
      return this.decode(reader, reader.uint32())
    }

    /**
     * Verifies a RobotAlarm message.
     * @function verify
     * @memberof pedro.RobotAlarm
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RobotAlarm.verify = function verify(message) {
      if (typeof message !== 'object' || message === null) return 'object expected'
      if (message.timestamp != null && message.hasOwnProperty('timestamp'))
        if (
          !$util.isInteger(message.timestamp) &&
          !(
            message.timestamp &&
            $util.isInteger(message.timestamp.low) &&
            $util.isInteger(message.timestamp.high)
          )
        )
          return 'timestamp: integer|Long expected'
      if (message.code != null && message.hasOwnProperty('code'))
        if (!$util.isString(message.code)) return 'code: string expected'
      if (message.description != null && message.hasOwnProperty('description'))
        if (!$util.isString(message.description)) return 'description: string expected'
      return null
    }

    /**
     * Creates a RobotAlarm message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof pedro.RobotAlarm
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {pedro.RobotAlarm} RobotAlarm
     */
    RobotAlarm.fromObject = function fromObject(object) {
      if (object instanceof $root.pedro.RobotAlarm) return object
      let message = new $root.pedro.RobotAlarm()
      if (object.timestamp != null)
        if ($util.Long)
          (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false
        else if (typeof object.timestamp === 'string')
          message.timestamp = parseInt(object.timestamp, 10)
        else if (typeof object.timestamp === 'number') message.timestamp = object.timestamp
        else if (typeof object.timestamp === 'object')
          message.timestamp = new $util.LongBits(
            object.timestamp.low >>> 0,
            object.timestamp.high >>> 0
          ).toNumber()
      if (object.code != null) message.code = String(object.code)
      if (object.description != null) message.description = String(object.description)
      return message
    }

    /**
     * Creates a plain object from a RobotAlarm message. Also converts values to other types if specified.
     * @function toObject
     * @memberof pedro.RobotAlarm
     * @static
     * @param {pedro.RobotAlarm} message RobotAlarm
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RobotAlarm.toObject = function toObject(message, options) {
      if (!options) options = {}
      let object = {}
      if (options.defaults) {
        if ($util.Long) {
          let long = new $util.Long(0, 0, false)
          object.timestamp =
            options.longs === String
              ? long.toString()
              : options.longs === Number
                ? long.toNumber()
                : long
        } else object.timestamp = options.longs === String ? '0' : 0
        object.code = ''
        object.description = ''
      }
      if (message.timestamp != null && message.hasOwnProperty('timestamp'))
        if (typeof message.timestamp === 'number')
          object.timestamp =
            options.longs === String ? String(message.timestamp) : message.timestamp
        else
          object.timestamp =
            options.longs === String
              ? $util.Long.prototype.toString.call(message.timestamp)
              : options.longs === Number
                ? new $util.LongBits(
                    message.timestamp.low >>> 0,
                    message.timestamp.high >>> 0
                  ).toNumber()
                : message.timestamp
      if (message.code != null && message.hasOwnProperty('code')) object.code = message.code
      if (message.description != null && message.hasOwnProperty('description'))
        object.description = message.description
      return object
    }

    /**
     * Converts this RobotAlarm to JSON.
     * @function toJSON
     * @memberof pedro.RobotAlarm
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RobotAlarm.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }

    /**
     * Gets the default type url for RobotAlarm
     * @function getTypeUrl
     * @memberof pedro.RobotAlarm
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RobotAlarm.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = 'type.googleapis.com'
      }
      return typeUrlPrefix + '/pedro.RobotAlarm'
    }

    return RobotAlarm
  })()

  pedro.RobotAlarmList = (function () {
    /**
     * Properties of a RobotAlarmList.
     * @memberof pedro
     * @interface IRobotAlarmList
     * @property {Array.<pedro.IRobotAlarm>|null} [list] RobotAlarmList list
     */

    /**
     * Constructs a new RobotAlarmList.
     * @memberof pedro
     * @classdesc Represents a RobotAlarmList.
     * @implements IRobotAlarmList
     * @constructor
     * @param {pedro.IRobotAlarmList=} [properties] Properties to set
     */
    function RobotAlarmList(properties) {
      this.list = []
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * RobotAlarmList list.
     * @member {Array.<pedro.IRobotAlarm>} list
     * @memberof pedro.RobotAlarmList
     * @instance
     */
    RobotAlarmList.prototype.list = $util.emptyArray

    /**
     * Creates a new RobotAlarmList instance using the specified properties.
     * @function create
     * @memberof pedro.RobotAlarmList
     * @static
     * @param {pedro.IRobotAlarmList=} [properties] Properties to set
     * @returns {pedro.RobotAlarmList} RobotAlarmList instance
     */
    RobotAlarmList.create = function create(properties) {
      return new RobotAlarmList(properties)
    }

    /**
     * Encodes the specified RobotAlarmList message. Does not implicitly {@link pedro.RobotAlarmList.verify|verify} messages.
     * @function encode
     * @memberof pedro.RobotAlarmList
     * @static
     * @param {pedro.IRobotAlarmList} message RobotAlarmList message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RobotAlarmList.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.list != null && message.list.length)
        for (let i = 0; i < message.list.length; ++i)
          $root.pedro.RobotAlarm.encode(
            message.list[i],
            writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
          ).ldelim()
      return writer
    }

    /**
     * Encodes the specified RobotAlarmList message, length delimited. Does not implicitly {@link pedro.RobotAlarmList.verify|verify} messages.
     * @function encodeDelimited
     * @memberof pedro.RobotAlarmList
     * @static
     * @param {pedro.IRobotAlarmList} message RobotAlarmList message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RobotAlarmList.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim()
    }

    /**
     * Decodes a RobotAlarmList message from the specified reader or buffer.
     * @function decode
     * @memberof pedro.RobotAlarmList
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {pedro.RobotAlarmList} RobotAlarmList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RobotAlarmList.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.pedro.RobotAlarmList()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            if (!(message.list && message.list.length)) message.list = []
            message.list.push($root.pedro.RobotAlarm.decode(reader, reader.uint32()))
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
     * Decodes a RobotAlarmList message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof pedro.RobotAlarmList
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {pedro.RobotAlarmList} RobotAlarmList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RobotAlarmList.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader)
      return this.decode(reader, reader.uint32())
    }

    /**
     * Verifies a RobotAlarmList message.
     * @function verify
     * @memberof pedro.RobotAlarmList
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RobotAlarmList.verify = function verify(message) {
      if (typeof message !== 'object' || message === null) return 'object expected'
      if (message.list != null && message.hasOwnProperty('list')) {
        if (!Array.isArray(message.list)) return 'list: array expected'
        for (let i = 0; i < message.list.length; ++i) {
          let error = $root.pedro.RobotAlarm.verify(message.list[i])
          if (error) return 'list.' + error
        }
      }
      return null
    }

    /**
     * Creates a RobotAlarmList message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof pedro.RobotAlarmList
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {pedro.RobotAlarmList} RobotAlarmList
     */
    RobotAlarmList.fromObject = function fromObject(object) {
      if (object instanceof $root.pedro.RobotAlarmList) return object
      let message = new $root.pedro.RobotAlarmList()
      if (object.list) {
        if (!Array.isArray(object.list))
          throw TypeError('.pedro.RobotAlarmList.list: array expected')
        message.list = []
        for (let i = 0; i < object.list.length; ++i) {
          if (typeof object.list[i] !== 'object')
            throw TypeError('.pedro.RobotAlarmList.list: object expected')
          message.list[i] = $root.pedro.RobotAlarm.fromObject(object.list[i])
        }
      }
      return message
    }

    /**
     * Creates a plain object from a RobotAlarmList message. Also converts values to other types if specified.
     * @function toObject
     * @memberof pedro.RobotAlarmList
     * @static
     * @param {pedro.RobotAlarmList} message RobotAlarmList
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RobotAlarmList.toObject = function toObject(message, options) {
      if (!options) options = {}
      let object = {}
      if (options.arrays || options.defaults) object.list = []
      if (message.list && message.list.length) {
        object.list = []
        for (let j = 0; j < message.list.length; ++j)
          object.list[j] = $root.pedro.RobotAlarm.toObject(message.list[j], options)
      }
      return object
    }

    /**
     * Converts this RobotAlarmList to JSON.
     * @function toJSON
     * @memberof pedro.RobotAlarmList
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RobotAlarmList.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }

    /**
     * Gets the default type url for RobotAlarmList
     * @function getTypeUrl
     * @memberof pedro.RobotAlarmList
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RobotAlarmList.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = 'type.googleapis.com'
      }
      return typeUrlPrefix + '/pedro.RobotAlarmList'
    }

    return RobotAlarmList
  })()

  pedro.REQ = (function () {
    /**
     * Properties of a REQ.
     * @memberof pedro
     * @interface IREQ
     * @property {string|null} [uuid] REQ uuid
     * @property {string|null} [action] REQ action
     * @property {string|null} [jsonData] REQ jsonData
     * @property {string|null} [from] REQ from
     */

    /**
     * Constructs a new REQ.
     * @memberof pedro
     * @classdesc Represents a REQ.
     * @implements IREQ
     * @constructor
     * @param {pedro.IREQ=} [properties] Properties to set
     */
    function REQ(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * REQ uuid.
     * @member {string} uuid
     * @memberof pedro.REQ
     * @instance
     */
    REQ.prototype.uuid = ''

    /**
     * REQ action.
     * @member {string} action
     * @memberof pedro.REQ
     * @instance
     */
    REQ.prototype.action = ''

    /**
     * REQ jsonData.
     * @member {string} jsonData
     * @memberof pedro.REQ
     * @instance
     */
    REQ.prototype.jsonData = ''

    /**
     * REQ from.
     * @member {string} from
     * @memberof pedro.REQ
     * @instance
     */
    REQ.prototype.from = ''

    /**
     * Creates a new REQ instance using the specified properties.
     * @function create
     * @memberof pedro.REQ
     * @static
     * @param {pedro.IREQ=} [properties] Properties to set
     * @returns {pedro.REQ} REQ instance
     */
    REQ.create = function create(properties) {
      return new REQ(properties)
    }

    /**
     * Encodes the specified REQ message. Does not implicitly {@link pedro.REQ.verify|verify} messages.
     * @function encode
     * @memberof pedro.REQ
     * @static
     * @param {pedro.IREQ} message REQ message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    REQ.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.uuid != null && Object.hasOwnProperty.call(message, 'uuid'))
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.uuid)
      if (message.action != null && Object.hasOwnProperty.call(message, 'action'))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.action)
      if (message.jsonData != null && Object.hasOwnProperty.call(message, 'jsonData'))
        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.jsonData)
      if (message.from != null && Object.hasOwnProperty.call(message, 'from'))
        writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.from)
      return writer
    }

    /**
     * Encodes the specified REQ message, length delimited. Does not implicitly {@link pedro.REQ.verify|verify} messages.
     * @function encodeDelimited
     * @memberof pedro.REQ
     * @static
     * @param {pedro.IREQ} message REQ message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    REQ.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim()
    }

    /**
     * Decodes a REQ message from the specified reader or buffer.
     * @function decode
     * @memberof pedro.REQ
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {pedro.REQ} REQ
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    REQ.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.pedro.REQ()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            message.uuid = reader.string()
            break
          }
          case 2: {
            message.action = reader.string()
            break
          }
          case 3: {
            message.jsonData = reader.string()
            break
          }
          case 4: {
            message.from = reader.string()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
     * Decodes a REQ message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof pedro.REQ
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {pedro.REQ} REQ
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    REQ.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader)
      return this.decode(reader, reader.uint32())
    }

    /**
     * Verifies a REQ message.
     * @function verify
     * @memberof pedro.REQ
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    REQ.verify = function verify(message) {
      if (typeof message !== 'object' || message === null) return 'object expected'
      if (message.uuid != null && message.hasOwnProperty('uuid'))
        if (!$util.isString(message.uuid)) return 'uuid: string expected'
      if (message.action != null && message.hasOwnProperty('action'))
        if (!$util.isString(message.action)) return 'action: string expected'
      if (message.jsonData != null && message.hasOwnProperty('jsonData'))
        if (!$util.isString(message.jsonData)) return 'jsonData: string expected'
      if (message.from != null && message.hasOwnProperty('from'))
        if (!$util.isString(message.from)) return 'from: string expected'
      return null
    }

    /**
     * Creates a REQ message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof pedro.REQ
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {pedro.REQ} REQ
     */
    REQ.fromObject = function fromObject(object) {
      if (object instanceof $root.pedro.REQ) return object
      let message = new $root.pedro.REQ()
      if (object.uuid != null) message.uuid = String(object.uuid)
      if (object.action != null) message.action = String(object.action)
      if (object.jsonData != null) message.jsonData = String(object.jsonData)
      if (object.from != null) message.from = String(object.from)
      return message
    }

    /**
     * Creates a plain object from a REQ message. Also converts values to other types if specified.
     * @function toObject
     * @memberof pedro.REQ
     * @static
     * @param {pedro.REQ} message REQ
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    REQ.toObject = function toObject(message, options) {
      if (!options) options = {}
      let object = {}
      if (options.defaults) {
        object.uuid = ''
        object.action = ''
        object.jsonData = ''
        object.from = ''
      }
      if (message.uuid != null && message.hasOwnProperty('uuid')) object.uuid = message.uuid
      if (message.action != null && message.hasOwnProperty('action')) object.action = message.action
      if (message.jsonData != null && message.hasOwnProperty('jsonData'))
        object.jsonData = message.jsonData
      if (message.from != null && message.hasOwnProperty('from')) object.from = message.from
      return object
    }

    /**
     * Converts this REQ to JSON.
     * @function toJSON
     * @memberof pedro.REQ
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    REQ.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }

    /**
     * Gets the default type url for REQ
     * @function getTypeUrl
     * @memberof pedro.REQ
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    REQ.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = 'type.googleapis.com'
      }
      return typeUrlPrefix + '/pedro.REQ'
    }

    return REQ
  })()

  pedro.REP = (function () {
    /**
     * Properties of a REP.
     * @memberof pedro
     * @interface IREP
     * @property {string|null} [uuid] REP uuid
     * @property {string|null} [result] REP result
     * @property {string|null} [jsonData] REP jsonData
     */

    /**
     * Constructs a new REP.
     * @memberof pedro
     * @classdesc Represents a REP.
     * @implements IREP
     * @constructor
     * @param {pedro.IREP=} [properties] Properties to set
     */
    function REP(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * REP uuid.
     * @member {string} uuid
     * @memberof pedro.REP
     * @instance
     */
    REP.prototype.uuid = ''

    /**
     * REP result.
     * @member {string} result
     * @memberof pedro.REP
     * @instance
     */
    REP.prototype.result = ''

    /**
     * REP jsonData.
     * @member {string} jsonData
     * @memberof pedro.REP
     * @instance
     */
    REP.prototype.jsonData = ''

    /**
     * Creates a new REP instance using the specified properties.
     * @function create
     * @memberof pedro.REP
     * @static
     * @param {pedro.IREP=} [properties] Properties to set
     * @returns {pedro.REP} REP instance
     */
    REP.create = function create(properties) {
      return new REP(properties)
    }

    /**
     * Encodes the specified REP message. Does not implicitly {@link pedro.REP.verify|verify} messages.
     * @function encode
     * @memberof pedro.REP
     * @static
     * @param {pedro.IREP} message REP message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    REP.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.uuid != null && Object.hasOwnProperty.call(message, 'uuid'))
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.uuid)
      if (message.result != null && Object.hasOwnProperty.call(message, 'result'))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.result)
      if (message.jsonData != null && Object.hasOwnProperty.call(message, 'jsonData'))
        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.jsonData)
      return writer
    }

    /**
     * Encodes the specified REP message, length delimited. Does not implicitly {@link pedro.REP.verify|verify} messages.
     * @function encodeDelimited
     * @memberof pedro.REP
     * @static
     * @param {pedro.IREP} message REP message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    REP.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim()
    }

    /**
     * Decodes a REP message from the specified reader or buffer.
     * @function decode
     * @memberof pedro.REP
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {pedro.REP} REP
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    REP.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.pedro.REP()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            message.uuid = reader.string()
            break
          }
          case 2: {
            message.result = reader.string()
            break
          }
          case 3: {
            message.jsonData = reader.string()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
     * Decodes a REP message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof pedro.REP
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {pedro.REP} REP
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    REP.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader)
      return this.decode(reader, reader.uint32())
    }

    /**
     * Verifies a REP message.
     * @function verify
     * @memberof pedro.REP
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    REP.verify = function verify(message) {
      if (typeof message !== 'object' || message === null) return 'object expected'
      if (message.uuid != null && message.hasOwnProperty('uuid'))
        if (!$util.isString(message.uuid)) return 'uuid: string expected'
      if (message.result != null && message.hasOwnProperty('result'))
        if (!$util.isString(message.result)) return 'result: string expected'
      if (message.jsonData != null && message.hasOwnProperty('jsonData'))
        if (!$util.isString(message.jsonData)) return 'jsonData: string expected'
      return null
    }

    /**
     * Creates a REP message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof pedro.REP
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {pedro.REP} REP
     */
    REP.fromObject = function fromObject(object) {
      if (object instanceof $root.pedro.REP) return object
      let message = new $root.pedro.REP()
      if (object.uuid != null) message.uuid = String(object.uuid)
      if (object.result != null) message.result = String(object.result)
      if (object.jsonData != null) message.jsonData = String(object.jsonData)
      return message
    }

    /**
     * Creates a plain object from a REP message. Also converts values to other types if specified.
     * @function toObject
     * @memberof pedro.REP
     * @static
     * @param {pedro.REP} message REP
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    REP.toObject = function toObject(message, options) {
      if (!options) options = {}
      let object = {}
      if (options.defaults) {
        object.uuid = ''
        object.result = ''
        object.jsonData = ''
      }
      if (message.uuid != null && message.hasOwnProperty('uuid')) object.uuid = message.uuid
      if (message.result != null && message.hasOwnProperty('result')) object.result = message.result
      if (message.jsonData != null && message.hasOwnProperty('jsonData'))
        object.jsonData = message.jsonData
      return object
    }

    /**
     * Converts this REP to JSON.
     * @function toJSON
     * @memberof pedro.REP
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    REP.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }

    /**
     * Gets the default type url for REP
     * @function getTypeUrl
     * @memberof pedro.REP
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    REP.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = 'type.googleapis.com'
      }
      return typeUrlPrefix + '/pedro.REP'
    }

    return REP
  })()

  return pedro
})())

export { $root as default }
