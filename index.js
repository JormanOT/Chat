const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();

app.set('port', 3500);
const PORT = app.get('port');
app.use(express.static('public'));
app.use(cors());
const server = app.listen(PORT, () => console.log(`Server on port : ${PORT}`));

const io = socket(server);
var Usuarios = {};

io.on('connection', (socket) => {
  const _ID = socket.id;

  console.log(`Cliente ${_ID} Conectado !`);

  socket.on('createUser', (username) => {
    socket.Nombre = username;
    Usuarios[username] = username;
    socket.Canal = "test";
    socket.join('test');
    io.sockets.emit('updateUser', Usuarios);
    socket.emit('updateChat', 'INFO', 'Bienvenido al test');
    socket.broadcast.to('test').emit('updateChat', username, 'Se unio al test !!');
  });

  socket.on('Mensaje', (Data) => {
    let msg = { Name: socket.Nombre, Data: Data }
    io.sockets.emit('updateChat', 'MSJ', msg);
  });


  socket.on('disconnect', () => {
    console.log(`Cliente ${_ID} Desconectado !`);
    delete Usuarios[socket.Nombre];
    io.sockets.emit('updateUser', Usuarios);
    io.sockets.emit('updateChat', socket.Nombre, 'Se desconecto !!');
  });
});
// Software Programmer = Jorman Ortega
