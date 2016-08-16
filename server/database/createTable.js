import pool from './init';

const SQL_CREATE_TABLE = `CREATE TABLE IF NOT EXISTS explore (
  id INT UNSIGNED ZEROFILL,
  type VARCHAR(6),
  title VARCHAR(50),
  meta VARCHAR(30),
  top INT UNSIGNED ZEROFILL,
  time DATE,
  PRIMARY KEY (id))`;

// ALTER DATABASE nodejs DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

function createTableIfNotExists() {
  return new Promise((resolve, reject) => {
    pool.getConnection((getConnectionErr, connection) => {
      if (getConnectionErr) {
        reject(getConnectionErr);
        return;
      }

      connection.query('SHOW TABLES LIKE \'explore\'', (err, rows) => {
        if (err) {
          reject(err);
        }
        if (rows.length === 0) {
          connection.query(SQL_CREATE_TABLE, (err2, rows2) => {
            if (err2) {
              reject(err2);
            }
            resolve(rows2);
          });
        } else {
          resolve('table explore exists.');
        }
      });
      connection.release();
    });
  });
}

createTableIfNotExists()
.then((value) => { console.log(value); })
.catch((err) => {console.log(err);});

export default createTableIfNotExists;
