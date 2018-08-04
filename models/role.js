'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    displayName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
    Role.hasMany(models.User, {foreignKey: 'id', as: 'role'});
  };
  return Role;
};
