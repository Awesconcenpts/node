exports.init = function(e) {
  console.log("saved");
  var q=db.query('SELECT * from sys_setting',function(err, rows, fields){
      e(rows)
  })
}