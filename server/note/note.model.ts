import {
  Model,
  DataTypes,
} from 'sequelize';
import sequelize from '../database/connection';

interface NoteAttributes {
  id: number;
  title: string;
  text: string;
  frequency: number;
  userId: number;
}

interface NoteCreationAttributes {
  title: string;
  text: string;
  frequency: number;
  userId: number;
}

class NoteModel extends Model<NoteAttributes, NoteCreationAttributes>
  implements NoteAttributes {
  public id!: number;
  public title: string;
  public text: string;
  public frequency: number;
  public userId: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

NoteModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
  },
  text: {
    type: DataTypes.TEXT,
  },
  frequency: {
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
}, {
  sequelize,
  underscored: true,
});

export default NoteModel;
