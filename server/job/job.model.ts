import {
  Model,
  DataTypes,
} from 'sequelize';
import sequelize from '../database/connection';

interface JobAttributes {
  id: number;
  name: string;
  position: string;
  source: string;
  link: string;
  team: string;
  remoteOption: boolean;
  fullyRemote: boolean;
  laptopProvided: boolean;
  stack: string;
  officeAddress: string;
  additionalBonuses: string;
  projectAge: number;
  comments: string;
  interested: number;
  active: boolean;
  salaryAsk: number;
  salaryOffer: number;
  timeToOffice: number;
  offer: boolean;
  testTask: string;
  interviewsCount: number;
  userId: number;
}

interface JobCreationAttributes {
  email: string;
  password: string;
}

class JobModel extends Model<JobAttributes, JobCreationAttributes>
  implements JobAttributes {
  public id!: number;
  public name: string;
  public position: string;
  public source: string;
  public link: string;
  public team: string;
  public remoteOption: boolean;
  public fullyRemote: boolean;
  public laptopProvided: boolean;
  public stack: string;
  public officeAddress: string;
  public additionalBonuses: string;
  public projectAge: number;
  public comments: string;
  public interested: number;
  public active: boolean;
  public salaryAsk: number;
  public salaryOffer: number;
  public timeToOffice: number;
  public offer: boolean;
  public testTask: string;
  public interviewsCount: number;
  public userId: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

JobModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  position: {
    type: DataTypes.STRING,
  },
  source: {
    type: DataTypes.STRING,
  },
  link: {
    type: DataTypes.STRING,
  },
  team: {
    type: DataTypes.TEXT,
  },
  remoteOption: {
    type: DataTypes.BOOLEAN,
    field: 'remote_option',
  },
  fullyRemote: {
    type: DataTypes.BOOLEAN,
    field: 'fully_remote',
  },
  laptopProvided: {
    type: DataTypes.BOOLEAN,
    field: 'laptop_provided',
  },
  stack: {
    type: DataTypes.TEXT,
  },
  officeAddress: {
    type: DataTypes.STRING,
    field: 'office_address',
  },
  additionalBonuses: {
    type: DataTypes.TEXT,
    field: 'additional_bonuses',
  },
  projectAge: {
    type: DataTypes.INTEGER,
    field: 'project_age',
  },
  comments: {
    type: DataTypes.TEXT,
  },
  interested: {
    type: DataTypes.INTEGER,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  salaryAsk: {
    type: DataTypes.INTEGER,
    field: 'salary_ask',
  },
  salaryOffer: {
    type: DataTypes.INTEGER,
    field: 'salary_offer',
  },
  timeToOffice: {
    type: DataTypes.INTEGER,
    field: 'time_to_office',
  },
  offer: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  testTask: {
    type: DataTypes.STRING,
    field: 'test_task',
  },
  interviewsCount: {
    type: DataTypes.INTEGER,
    field: 'interviews',
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
  },
}, {
  sequelize,
  underscored: true,
});

export default JobModel;
