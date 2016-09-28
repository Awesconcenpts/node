var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  
  
  //console.log(req.query.page);
    //db.query('SELECT * from sys_user', function(err, rows, fields) {
        //if (err) throw err;
        //console.log('The solution is: ', rows);
   // });
    
    
    
    //var template = jade.compile(fs.readFileSync(appRoot+'/views/test.jade', 'utf8'));

  res.render('index', {title:'test'});
  
  
  
  
  
  
  
});

module.exports = router;
