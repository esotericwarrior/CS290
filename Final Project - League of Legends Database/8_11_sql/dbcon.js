var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_casillaj',
  password        : '4969',
  database        : 'cs340_casillaj'
});

module.exports.pool = pool;
