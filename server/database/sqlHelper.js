import pool from './init';

function query(sql) {
  return new Promise((resolve, reject) => {
    pool.getConnection((getConnectionErr, connection) => {
      if (getConnectionErr) {
        reject(getConnectionErr);
        return;
      }
      connection.query(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
}

export default query;
