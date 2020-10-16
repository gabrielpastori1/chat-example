var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/src',express.static(__dirname+'/public'));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('emergencial', function(msg){
    io.emit('meet', socket.id);
    console.log(msg);
    setTimeout(()=>{
      io.emit('new-meet',true);
    }, 10000);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});