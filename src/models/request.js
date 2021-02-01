'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Request.belongsTo(models.Key, { foreignKey: 'keyId', onDelete: 'CASCADE' });
      // define association here
    }
  }
  Request.init({
    keyId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    size: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};