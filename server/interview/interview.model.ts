import {
  Model,
  DataTypes,
} from 'sequelize';
import sequelize from '../database/connection';

interface InterviewAttributes {
  id: number;
  startTime: string;
  endTime: string;
  location: string;
  type: string;
  comments: string;
  jobId: number;
}

interface InterviewCreationAttributes {
  startTime: string;
  endTime: string;
  location: string;
  type: string;
  comments: string;
  jobId: number;
}

class InterviewModel extends Model<InterviewAttributes, InterviewCreationAttributes>
  implements InterviewAttributes {
  public id!: number;
  public startTime: string;
  public endTime: string;
  public location: string;
  public type: string;
  public comments: string;
  public jobId: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

InterviewModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  startTime: {
    type: DataTypes.DATE,
  },
  endTime: {
    type: DataTypes.DATE,
  },
  location: {
    type: DataTypes.STRING,
  },
  jobId: {
    type: DataTypes.INTEGER,
    references: { model: 'jobs', key: 'id' },
    onDelete: 'set null',
    onUpdate: 'cascade',
  },
  type: {
    type: DataTypes.STRING,
  },
  comments: {
    type: DataTypes.TEXT,
  },
}, {
  sequelize,
  underscored: true,
});

export default InterviewModel;
