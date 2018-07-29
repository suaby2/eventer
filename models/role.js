'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER,
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
  };
  return Role;
};