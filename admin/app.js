exports.getAction = function() {
 if(typeof(Request.action)=='undefined'){
   return 'list';
 }
 if(typeof(Request.action)!=='undefined' && Request.action=='edit' && Request.action=='new' && Request.action=='delete'){
   return Request.action;
 }
 return false;
};
exports.getModuleName = function() {
 if(typeof(Request.page)!=='undefined'){
   var p=Request.page.split('/');
   if(typeof(p[1])!='undefined'){
     var n=p[1].split('.');
     return (typeof(n[0])!=='undefined')?n[0]:'home';
   }
 }
 return 'home';
};
exports.getBaseUrl = function() {
return 'http://localhost:3000/';

};

exports.getModulePath = function() {
 if(typeof(Request.page)!=='undefined'){
   return Request.page;
   var p=Request.page.replace('html','jade',Request.page)
   if(p!='')return p;
 }
 return 'home';
};
exports.registerModule=function(name,args){
  args['name']=name;
  installedModules[name]=args;
}
exports.getUrl=function(e){
 if(typeof(Request[e])=='undefined'){
   return 'home';
 }
 return Request[e];
}

exports.getInstalledModules=function(e){
  if(e!=='' && installedModules.hasOwnProperty(e)) return installedModules[e];
  if(typeof(e)!=='undefined')return false;
  return installedModules
}
exports.getUsers=function(e){
  if(e!=='' && Session.user.hasOwnProperty(e)) return Session.user[e];
  if(typeof(e)!=='undefined')return false;
  return Session.user;
}
exports.initConfig=function(callback){
  global.config={};
  var settings={};
    db.query('SELECT * from sys_setting',function(err, settings, fields){
    settings.forEach(function(value){
     settings[value.name]=value;
    });
    global.config=settings;
    callback();
  })
}
exports.getConfig=function(e){
  if(e!=='' && global.config.hasOwnProperty(e)){
    return global.config[e].value;
  }else if(typeof(e)!=='undefined'){
   return ''; 
  }
  return global.config;
}
exports.getAdminLogo=function(e){
  return '/images/'+ exports.getConfig('logo');
  var logo=function(callback){
    var paths=exports.getConfig('logo'); 
    
    if(paths!=''){
      fs.stat('uploads/images/'+paths,function(err, stat){
        if(err == null) {
          var logo='/images/1474868589672.jpg';//+paths;
            callback(logo);
        }else{
           var logo= '/images/logoadmin.png';
            callback(logo);
        }
      })
    }else{
      var logo= '/images/logoadmin.png';
      callback(logo);
    }
   // return deferred.promise;
  }
  console.log("root");
  logo(function(e){
    console.log("--in");
    return e;
  });
}
exports.installModules= function(callback) {
  var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          if(file.match(/index\.js$/) !== null){
            results.push(file);
          }
          if (!--pending) done(null, results);
        }
      });
    });
  });
  };
  
  walk(appRoot+"/plugins/",function(e,files){
    files.forEach(function (name) {
      require(name);
    })
    callback()
  })
};
exports.checkUser=function(callback){
  var pasword=crypto.createHash('md5').update(Request.body.password).digest('hex');
  var q=db.query('SELECT * from sys_user WHERE user_name=? AND password=?',[Request.body.username,pasword],function(err, results, fields){
    if(typeof(results[0])!=='undefined' && typeof(results[0].user_id)!=='undefined'){
      Request.session.user=results[0];
      Request.session.loggedin=true;
      callback(true);
    }else{
      callback(false);
    }
  })
};
var Hook={
  actions:new Array(),
  actions_objs:{},
  actions_loop:new Array(),
  actions_objs_loop:{},
  addAction:function(_action,_callback,_short){
    _short_=_short;
    if(typeof(_short)=='undefined'){
      _short_=20;
    }
    if(typeof(Hook.actions_objs)!=='undefined' && !Hook.actions_objs.hasOwnProperty(_action)){
       Hook.actions_objs[_action]=true;
       Hook.actions.push({action:_action,callback:_callback,short:_short_});
    }
  },
  addLoopAction:function(_action,_callback,_short){
    _short_=_short;
    if(typeof(_short)=='undefined'){
      _short_=20;
    }
    if(typeof(Hook.actions_objs_loop)!=='undefined' && !Hook.actions_objs_loop.hasOwnProperty(_action)){
       Hook.actions_objs_loop[_action]=true;
       Hook.actions_loop.push({action:_action,callback:_callback,short:_short_});
    }
  },
  doLoopAction:function(_action,loop){
    var deta='';
    if(Hook.actions_loop.length!==0){
      Hook.actions_loop.forEach(function(a){ 
      console.log("calling");
      console.log(loop);
        if(typeof(args.module[a.callback])!=='undefined' && _action==a.action){
          args.module[a.callback](loop,function(e){
            //Corr
           deta=e;
            // end
          }); 
        }
      });
      return deta;
    }else{
      return deta;
    }
  },
  doAction:function(_action){ 
    if(typeof(hooks[_action])!=='undefined'){
        var str=hooks[_action];
        hooks[_action]='';
        return str;
    }else{
      return ''; 
    }
  },
  init(call){
    var counter=0;
    if(Hook.actions.length!==0){
      Hook.actions.forEach(function(a,indx){
        counter++;
        args.module[a.callback](function(e){
          var str='';
          if(typeof(hooks[a.action])!=='undefined'){
            str=hooks[a.action];
          }
          hooks[a.action]=str+e;
          if(counter==Hook.actions.length){
                Hook.actions=new Array();
                call();
          }
        }); 
      })
    }else{
      call();
    }
  }
}

exports.getHook=function(){
  return Hook;
}
//














