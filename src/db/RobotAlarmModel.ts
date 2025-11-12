import { pedro } from '@models/index'
import { DataTypes, Model, ModelStatic, Optional, Sequelize } from 'sequelize'

type creationAttribute = Optional<pedro.IRobotAlarm, keyof pedro.IRobotAlarm>
export class RobotAlarmModel
  extends Model<pedro.IRobotAlarm, creationAttribute>
  implements pedro.IRobotAlarm
{
  declare timestamp: number
  declare code: string
  declare description: string
}
export default function (sequelize: Sequelize): ModelStatic<RobotAlarmModel> {
  RobotAlarmModel.init(
    {
      timestamp: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
      code: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
      description: { type: DataTypes.STRING, allowNull: true }
    },
    {
      sequelize,
      modelName: 'alarm_log',
      tableName: 'alarm_log',
      timestamps: false,
      indexes: [{ name: 'idx_alarm_log_timestamp_desc', fields: ['timestamp'] }]
    }
  )
  RobotAlarmModel.removeAttribute('id')
  return RobotAlarmModel
}
