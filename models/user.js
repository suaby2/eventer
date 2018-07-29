'use strict';
module.exports = (sequelize, DataTypes, bcrypt) => {
  var User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nick: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
  });
  User.associate = function(models) {
    User.belongsTo(models.Role, {foreignKey: 'role_id'});
  };
  return User;
};
