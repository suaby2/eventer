const fs = require('fs');

module.exports = {
    development: {
        username: 'postgres',
        password: 'postgres',
        database: 'eventer',
        host: '127.0.0.1',
        dialect: 'postgres'
    },
    test: {
        username: 'database_test',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql'
    }
}