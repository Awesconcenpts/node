exports.init = function(e) {
  Hook.addAction('edit_settings','getCountries');
  var q=db.query('SELECT * from sys_setting',function(err, rows, fields){
      e(rows)
  })
}
exports.getCountries=function(callback){
  console.log(args);
  callback("settings called");
}
exports.save = function(e) {
  

 // var im = require("imagemagick"); 
  //console.log(im)


  if(typeof(Request.file)!=='undefined' && typeof(Request.file.filename)!=='undefined'){
    /*console.log(Request.file.filename)
    im.crop({
      srcPath: "uploads/"+Request.file.filename,
      dstPath: 'uploads/[800x600]-'+Request.file.filename,
      width: 800,
      height: 600,
      quality: 1,
      gravity: "center"
    }, function(err, stdout, stderr){
      if(err){
        console.log("==== here");
        console.log(err);
      }else{
        console.log(stdout);
      } 
    });
    */
    Request.body.logo=Request.file.filename;
  }

  Object.keys(Request.body).forEach(function(key) {
    var val = Request.body[key];
    db.query('UPDATE sys_setting SET value=? WHERE name=?',[val,key])
  })

}
exports.get = function(id,callback) { 
  var data='';
  var q=db.query('SELECT * from sys_user',function(err, rows, fields){
    
  })
}