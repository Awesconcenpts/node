exports.list = function(e,c) {
 var q=db.query('SELECT * from sys_user',function(err, rows, fields){
    c(rows)
  })
}
exports.get = function(id,callback) { 
  var data='';
  var q=db.query('SELECT * from sys_user',function(err, rows, fields){
    
  })
}
