const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'ROOT',
    user: 'root',
    password: 'ROOT',
    database: 'SAMPLE',
	port :3306
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;