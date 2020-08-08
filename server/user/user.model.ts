import {
  Model,
  DataTypes,
} from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../database/connection';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
}

interface UserCreationAttributes {
  email: string;
  password: string;
}

class UserModel extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number;
  public email: string;
  public password: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'This email is already taken',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(val: string) {
      const salt = bcrypt.genSaltSync(10);
      this.setDataValue('password', bcrypt.hash(val, salt))
    }
  },
  },
  {
    sequelize,
    underscored: true,
    tableName: "users",
  }
);

export default UserModel;
