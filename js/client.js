
//This is different from nodeserver
const socket = io('http://localhost:800');

//get DOM element in respective javascript variable
const form = document.getElementById('send-form');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".message-container");
const audio = new Audio('notification.mp3')

// append function which is being used in user-joined section it will append all the message into message section
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message'); // set class = message
    messageElement.classList.add(position); // set class = left or right
    messageContainer.append(messageElement);
    if(position=="left")
        audio.play();
}

// whenever form get submited send the message to server so that all other user can get the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();//  event.preventDefault(); can also be used
    // is used to prevent autorefresh
    const message = messageInput.value;
    append(`You: ${message} `,'right');
    socket.emit('send', message);
    messageInput.value= '';
})

// whenever new user try to open aChat app, will ask to type name
const name = prompt("Enter your name to join this aChat app");
socket.emit('new-user-joined', name);

// if new user joined recieve his name from server
socket.on('user-joined', name =>{
    //console.log("AAAAAAAAAAA");
    append(`${name} joined the aChat`, 'left');
});

// if server sends a message with receive variable, receive it.
socket.on('receive', data =>{
    //console.log("AAAAAAAAAAA");
    append(`${data.name}: ${data.message}`, 'left');
});

// if someone left from aChat, let all know.
socket.on('left', name =>{
    //console.log("AAAAAAAAAAA");
    append(`${name} left the aChat`, 'right');
   // audio.play();
});