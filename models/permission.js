'use strict';
module.exports = (sequelize, DataTypes) => {
  var Permission = sequelize.define('Permission', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    role_id: DataTypes.INTEGER
  }, {});
  Permission.associate = function(models) {
    // associations can be defined here
  };
  return Permission;
};