var http      =    require('http');
var express   =    require("express");
var mysql     =    require('mysql');
var app       =    express();

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'node',
    debug    :  false
});

function handle_database(req,res) {
    
    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("select * from sys_user",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

app.get("/",function(req,res){-
        handle_database(req,res);
});
app.get('/about', function(req, res){
  res.render('about.html', {
    title: 'About'
  });
});
app.listen(3000, '127.0.0.1');
// create a webserver
//http.createServer(function (req, res) {

    // respond to any incoming http request
    //res.writeHead(200, {'Content-Type': 'text/plain'});
    //res.end('Hello World\n');

//}).listen(1337, '127.0.0.1');