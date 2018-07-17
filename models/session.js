'use strict';
module.exports = function(sequelize, DataTypes) {
    var Session = sequelize.define('Session', {
        sid: DataTypes.STRING(500),
        expires: DataTypes.DATE,
        data: DataTypes.STRING(500)
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Session;
};