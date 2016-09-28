exports.init = function(callback) {
 Hook.addAction('user_grid_header','getHeaderFirstName');
 Hook.addLoopAction('user_grid_body','getBodyFirstName');
 var q=db.query('SELECT * from sys_user',function(err, rows, fields){
    callback(rows)
  })
}
exports.getHeaderFirstName = function(callback){
  callback("<th>First Name</th>");
}
exports.getBodyFirstName = function(item,callback){
  callback("<td>"+item.first_name+"</td>");
}
exports.get = function(id,callback) { 
  var data='';
  var q=db.query('SELECT * from sys_user',function(err, rows, fields){
    
  })
}
