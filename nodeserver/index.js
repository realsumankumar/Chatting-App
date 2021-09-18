// Node server which will handle socket io connection
const io = require('socket.io')(800)

// will contain list of all users
const users = {};

io.on('connection', socket =>{

    // if we got a new-user-joined event than will do this
    socket.on('new-user-joined', name =>{
        users[socket.id]=name;  // push a new user in users
        console.log("new-user",name,"has joined.");
        socket.broadcast.emit('user-joined', name);// will show a message to all old user that new user has been joined 
    });

    //
    socket.on('send', message =>{
       socket.broadcast.emit('receive', {message : message, name: users[socket.id]})
    });
    // when any client leave the chat
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
     }); 
});