import pool from './init';

const SQL_CREATE_EXPLORE_INDEX_TABLE = `CREATE TABLE IF NOT EXISTS explore (
  id INT UNSIGNED,
  type VARCHAR(6),
  title VARCHAR(50),
  meta VARCHAR(30),
  image VARCHAR(100),
  top INT UNSIGNED,
  time DATE,
  PRIMARY KEY (id));`;
const SQL_CREATE_EXPLORE_COUNT_TABLE = `\nCREATE TABLE IF NOT EXISTS circle_index (
  id INT UNSIGNED,
  circle VARCHAR(500),
  PRIMARY KEY (id));`;
const CREATE_TABLES = [SQL_CREATE_EXPLORE_INDEX_TABLE, SQL_CREATE_EXPLORE_COUNT_TABLE];
// ALTER DATABASE nodejs DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

function createTableIfNotExists() {
  return new Promise((resolve, reject) => {
    pool.getConnection((getConnectionErr, connection) => {
      if (getConnectionErr) {
        reject(getConnectionErr);
        return;
      }
      CREATE_TABLES.forEach(sql => {
        connection.query(sql, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      connection.release();
    });
  });
}

createTableIfNotExists()
.then((value) => { console.log(value); })
.catch((err) => {console.log(err);});

export default createTableIfNotExists;
