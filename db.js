var db = module.exports = require('mysql').createConnection({
     host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'node',
});
db.connect();

