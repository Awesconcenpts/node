var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
global.Request=req.query;
global.Session=req.session;
req.session.goback='';
if(!req.session.loggedin){
  req.session.goback=req.protocol + '://' + req.headers.host + req.originalUrl;
 return res.redirect(App.getBaseUrl()+'admin/login');
}else{
  
  App.installModules(function(){
    
        global.Module=App.getInstalledModules(App.getModuleName());
        //start config
        App.initConfig(function(){
          
          
            var ex=App.getInstalledModules();
              Object.keys(ex).forEach(function(key) {
              var val = ex[key];
            })
            
            if(Module.hasOwnProperty('name')){
                var e={title:Module.title+" | "+App.getConfig('title')};
                var module=null;
                if(Module.hasOwnProperty('module')){
                  var module = require('../plugins/'+Module.name+'/'+Module.module);
                  e[Module.name]=module;
                }
                e.module=module;
                global.LoadedModule=module; 
                module.init(function(prepared){
                  e['form']=prepared;
                  global.args=e;
                  Hook.init(function(){
                    var template = jade.compileFile(appRoot+'/'+App.getModulePath());  //compileFile
                    template=template(e);
                    
                    e['data']=template;
                    e['title']=Module.title+" | "+App.getConfig('title');
                    
                    
                    console.log("OK HERE 3");
                    res.app.set('views', appRoot + '/admin');
                    res.render(appRoot+'/admin/admin', e);
                    res.app.set('views', appRoot + '/views');
                    console.log("OK HERE 4");
                  });
                });
            }else{
              // Internal
                var e={title:App.getConfig('title')+" | Admin Panel"};
                  var p=App.getModulePath(); 
                  if(App.getUrl('page')=='home'){
                    p='admin/system/home.html';
                  }
                  var admin_module=p.replace('.html','');
                  var module = require(appRoot+'/'+admin_module);
                  e.module=module;
                  module.init(function(ars){
                    e['form']=ars;
                    global.args=e;
                    e.title=App.getConfig('name')+" | Admin Panel"
                    Hook.init(function(){
                      var template = jade.renderFile(appRoot+'/'+p,e);  //compileFile
                      res.app.set('views', appRoot + '/admin');
                      e['data']=template;
                      res.render(appRoot+'/admin/admin.jade', e);
                      res.app.set('views', appRoot + '/views');
                    })
                  })
            }
            
        })
        //end config
  });
}
});
router.get('/login', function(req, res, next) {
  req.session.loggedin=false;
  App.initConfig(function(){
    res.render(appRoot+'/admin/login', {layout:false});
  })
})
router.post('/check', function(req, res, next) {
  global.Request=req;
  App.checkUser(function(e){
    if(e){
      if(typeof(Request.session.goback)!=='undefined' && Request.session.goback!==''){
        var _back=Request.session.goback
        Request.session.goback='';
        return res.redirect(_back);
      }else{
        return res.redirect(App.getBaseUrl()+'admin');
      }
    
    }else{
    return res.redirect(App.getBaseUrl()+'admin/login');
    }
    
  })
})
router.get('/logout', function(req, res, next) {
  req.session.loggedin=false;
  res.render(appRoot+'/admin/login', {layout:false});
})
router.post('/', upload.single('logo'),function(req, res, next) {
  console.log(upload.storage.getDestination());
  global.Request=req;
  
  var url_=appRoot+'/admin/system/'+Request.query.type;
  if(typeof(Request.query)!=='undefined' && typeof(Request.query.type)!=='undefined' && fs.statSync(url_+'.js').isFile()){
    require(url_).save(function(){
      return res.redirect(App.getBaseUrl()+'admin/?page='+Request.query.page+"&type="+Request.query.type);
    });
  }
  if(typeof(Request.query)!=='undefined' && typeof(Request.query.type)!=='undefined'){
      return res.redirect(App.getBaseUrl()+'admin/?page='+Request.query.page+"&type="+Request.query.type);
  }
  
})
router.get('/test', function(req, res, next) {
  var data='';
  var contents = fs.readFileSync('db.js', 'utf8');
// this line is not reached until the read results are in
q=db.query('SELECT * from sys_user');
console.log(q);
  //res.send(JSON.stringify(q));
})
module.exports = router;