const socket = io.connect('http://127.0.0.1:3500');
let Usuarios = document.getElementById("usuarios");
let Mensajes = document.getElementById('msg');
let Boton = document.getElementById('send');
let Mensaje = document.getElementById('message');


Boton.addEventListener('click', ()=>{
  if(Mensaje.value){
    socket.emit('Mensaje', Mensaje.value);
  }else{
    alert('Escriba un mensaje primero.....');
  }
  Mensaje.value = '';
});

socket.on('connect', () => {
  socket.emit('createUser', prompt('Indique su Usuario :'));
});

socket.on('updateUser', (Data) => {
  Usuarios.innerHTML = "";
  for (let user in Data) {
    Usuarios.innerHTML += `<li>${user}</li> <hr>`;
  }
});

socket.on('updateChat', (Name, Msg) => {

  switch (Name) {
    case 'INFO':
      Mensajes.innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    ${Msg}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
      break;
    case 'MSJ':
      Mensajes.innerHTML += `<p class="text-white"><strong class="text-danger text-left">${Msg.Name} : </strong> ${Msg.Data}</p>`;
      break;
    default:
      Mensajes.innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>${Name} </strong>${Msg}<button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
      break;
  }
});