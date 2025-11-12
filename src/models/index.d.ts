import * as $protobuf from 'protobufjs'
import Long = require('long')
/** Namespace pedro. */
export namespace pedro {
  /** Properties of a RobotAlarm. */
  interface IRobotAlarm {
    /** RobotAlarm timestamp */
    timestamp?: number | Long | null

    /** RobotAlarm code */
    code?: string | null

    /** RobotAlarm description */
    description?: string | null
  }

  /** Represents a RobotAlarm. */
  class RobotAlarm implements IRobotAlarm {
    /**
     * Constructs a new RobotAlarm.
     * @param [properties] Properties to set
     */
    constructor(properties?: pedro.IRobotAlarm)

    /** RobotAlarm timestamp. */
    public timestamp: number | Long

    /** RobotAlarm code. */
    public code: string

    /** RobotAlarm description. */
    public description: string

    /**
     * Creates a new RobotAlarm instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RobotAlarm instance
     */
    public static create(properties?: pedro.IRobotAlarm): pedro.RobotAlarm

    /**
     * Encodes the specified RobotAlarm message. Does not implicitly {@link pedro.RobotAlarm.verify|verify} messages.
     * @param message RobotAlarm message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: pedro.IRobotAlarm, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified RobotAlarm message, length delimited. Does not implicitly {@link pedro.RobotAlarm.verify|verify} messages.
     * @param message RobotAlarm message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: pedro.IRobotAlarm,
      writer?: $protobuf.Writer
    ): $protobuf.Writer

    /**
     * Decodes a RobotAlarm message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RobotAlarm
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): pedro.RobotAlarm

    /**
     * Decodes a RobotAlarm message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RobotAlarm
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): pedro.RobotAlarm

    /**
     * Verifies a RobotAlarm message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null

    /**
     * Creates a RobotAlarm message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RobotAlarm
     */
    public static fromObject(object: { [k: string]: any }): pedro.RobotAlarm

    /**
     * Creates a plain object from a RobotAlarm message. Also converts values to other types if specified.
     * @param message RobotAlarm
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: pedro.RobotAlarm,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any }

    /**
     * Converts this RobotAlarm to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any }

    /**
     * Gets the default type url for RobotAlarm
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string
  }

  /** Properties of a RobotAlarmList. */
  interface IRobotAlarmList {
    /** RobotAlarmList list */
    list?: pedro.IRobotAlarm[] | null
  }

  /** Represents a RobotAlarmList. */
  class RobotAlarmList implements IRobotAlarmList {
    /**
     * Constructs a new RobotAlarmList.
     * @param [properties] Properties to set
     */
    constructor(properties?: pedro.IRobotAlarmList)

    /** RobotAlarmList list. */
    public list: pedro.IRobotAlarm[]

    /**
     * Creates a new RobotAlarmList instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RobotAlarmList instance
     */
    public static create(properties?: pedro.IRobotAlarmList): pedro.RobotAlarmList

    /**
     * Encodes the specified RobotAlarmList message. Does not implicitly {@link pedro.RobotAlarmList.verify|verify} messages.
     * @param message RobotAlarmList message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: pedro.IRobotAlarmList,
      writer?: $protobuf.Writer
    ): $protobuf.Writer

    /**
     * Encodes the specified RobotAlarmList message, length delimited. Does not implicitly {@link pedro.RobotAlarmList.verify|verify} messages.
     * @param message RobotAlarmList message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: pedro.IRobotAlarmList,
      writer?: $protobuf.Writer
    ): $protobuf.Writer

    /**
     * Decodes a RobotAlarmList message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RobotAlarmList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): pedro.RobotAlarmList

    /**
     * Decodes a RobotAlarmList message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RobotAlarmList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): pedro.RobotAlarmList

    /**
     * Verifies a RobotAlarmList message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null

    /**
     * Creates a RobotAlarmList message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RobotAlarmList
     */
    public static fromObject(object: { [k: string]: any }): pedro.RobotAlarmList

    /**
     * Creates a plain object from a RobotAlarmList message. Also converts values to other types if specified.
     * @param message RobotAlarmList
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: pedro.RobotAlarmList,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any }

    /**
     * Converts this RobotAlarmList to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any }

    /**
     * Gets the default type url for RobotAlarmList
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string
  }

  /** Properties of a REQ. */
  interface IREQ {
    /** REQ uuid */
    uuid?: string | null

    /** REQ action */
    action?: string | null

    /** REQ jsonData */
    jsonData?: string | null

    /** REQ from */
    from?: string | null
  }

  /** Represents a REQ. */
  class REQ implements IREQ {
    /**
     * Constructs a new REQ.
     * @param [properties] Properties to set
     */
    constructor(properties?: pedro.IREQ)

    /** REQ uuid. */
    public uuid: string

    /** REQ action. */
    public action: string

    /** REQ jsonData. */
    public jsonData: string

    /** REQ from. */
    public from: string

    /**
     * Creates a new REQ instance using the specified properties.
     * @param [properties] Properties to set
     * @returns REQ instance
     */
    public static create(properties?: pedro.IREQ): pedro.REQ

    /**
     * Encodes the specified REQ message. Does not implicitly {@link pedro.REQ.verify|verify} messages.
     * @param message REQ message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: pedro.IREQ, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified REQ message, length delimited. Does not implicitly {@link pedro.REQ.verify|verify} messages.
     * @param message REQ message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: pedro.IREQ, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a REQ message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns REQ
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): pedro.REQ

    /**
     * Decodes a REQ message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns REQ
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): pedro.REQ

    /**
     * Verifies a REQ message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null

    /**
     * Creates a REQ message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns REQ
     */
    public static fromObject(object: { [k: string]: any }): pedro.REQ

    /**
     * Creates a plain object from a REQ message. Also converts values to other types if specified.
     * @param message REQ
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: pedro.REQ,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any }

    /**
     * Converts this REQ to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any }

    /**
     * Gets the default type url for REQ
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string
  }

  /** Properties of a REP. */
  interface IREP {
    /** REP uuid */
    uuid?: string | null

    /** REP result */
    result?: string | null

    /** REP jsonData */
    jsonData?: string | null
  }

  /** Represents a REP. */
  class REP implements IREP {
    /**
     * Constructs a new REP.
     * @param [properties] Properties to set
     */
    constructor(properties?: pedro.IREP)

    /** REP uuid. */
    public uuid: string

    /** REP result. */
    public result: string

    /** REP jsonData. */
    public jsonData: string

    /**
     * Creates a new REP instance using the specified properties.
     * @param [properties] Properties to set
     * @returns REP instance
     */
    public static create(properties?: pedro.IREP): pedro.REP

    /**
     * Encodes the specified REP message. Does not implicitly {@link pedro.REP.verify|verify} messages.
     * @param message REP message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: pedro.IREP, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified REP message, length delimited. Does not implicitly {@link pedro.REP.verify|verify} messages.
     * @param message REP message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: pedro.IREP, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a REP message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns REP
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): pedro.REP

    /**
     * Decodes a REP message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns REP
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): pedro.REP

    /**
     * Verifies a REP message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null

    /**
     * Creates a REP message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns REP
     */
    public static fromObject(object: { [k: string]: any }): pedro.REP

    /**
     * Creates a plain object from a REP message. Also converts values to other types if specified.
     * @param message REP
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: pedro.REP,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any }

    /**
     * Converts this REP to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any }

    /**
     * Gets the default type url for REP
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string
  }
}
