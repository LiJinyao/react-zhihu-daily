import mysql from 'mysql';
import conf from '../config';

const connection = mysql.createConnection({
  host:     conf.host,
  user:     conf.user,
  password: conf.password,
  database: conf.database,
});
connection.connect();

function createTable() {
  console.log("Create table.");
}

connection.query('SHOW TABLES LIKE \'daily\'', (err, rows) => {
  if (err) throw err;
  if (rows.length === 0) {
    createTable();
  }
});

connection.end();
