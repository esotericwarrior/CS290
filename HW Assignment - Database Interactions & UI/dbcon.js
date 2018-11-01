var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host		  : 'classmysql.engr.oregonstate.edu',
  user		  : 'cs290_santiatr',
  password	  : 'Ts!766212005',
  database	  : 'cs290_santiatr',
  dateStrings	  : true
});

module.exports.pool = pool;

