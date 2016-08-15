import mysql from 'mysql';
import conf from '../config';

const pool = mysql.createPool({
  connectionLimit: 10,
  host:            conf.host,
  user:            conf.user,
  password:        conf.password,
  database:        conf.database,
});

export default pool;
