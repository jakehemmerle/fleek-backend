'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Key extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Key.hasMany(models.Request, { foreignKey: 'keyId', onDelete: 'CASCADE' });
      // define association here
    }
  }
  Key.init({
    key: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN,
    requestCount: DataTypes.INTEGER,
    totalBytesTransfered: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Key',
  });
  return Key;
};