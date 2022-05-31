const socket = io();

// Join chatroom
socket.emit('joinRoom');

const form = document.getElementById('form');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('userMessage', input.value);
    input.value = '';
  }
});
