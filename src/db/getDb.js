const mysql = require("mysql2/promise");

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

let pool;

const getDb = async () => {
  try {
    if (!pool) {
      const connection = await mysql.createConnection({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
      });

      await connection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DB,
        timezone: "Z",
      });
    }

    return pool.getConnection();
  } catch (err) {
    console.error(err);
  }
};

module.exports = getDb;
