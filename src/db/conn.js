const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'shopeasy.csuqbvxqtstn.us-east-1.rds.amazonaws.com',
  user: 'root',
  password: '12345678',
  database: 'shopeasy'
});

// Checking connection success or failure
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
  connection.release(); // Release the connection
});

module.exports = pool;
