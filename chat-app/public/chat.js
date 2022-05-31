// Client

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

/**
 * Methods
 */

 const appendUserMessage = (msg) => {
  const same = socket.id === msg.sender.id;

  const li = document.createElement('li');
  li.classList.add('msg', `${same ? 'right-msg' : 'left-msg'}`);

  const img = document.createElement('div');
  img.classList.add('msg-img');
  img.style.backgroundImage = `url(${msg.sender.profile})`;

  const bubble = document.createElement('div');
  bubble.classList.add('msg-bubble');

  const info = document.createElement('div');
  info.classList.add('msg-info');

  const infoName = document.createElement('div');
  infoName.classList.add('msg-info-name');
  infoName.textContent = msg.sender.username;

  const infoTime = document.createElement('div');
  infoTime.classList.add('msg-info-time');
  infoTime.textContent = msg.time;

  const messageText = document.createElement('div');
  messageText.classList.add('msg-text');
  messageText.textContent = msg.text;

  bubble.appendChild(info);
  bubble.appendChild(messageText);
  info.appendChild(infoName);
  info.appendChild(infoTime);
  li.appendChild(img);
  li.appendChild(bubble);
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
};

const appendServerMessage = (msg) => {
  const li = document.createElement('li');
  li.classList.add('center-msg');
  li.innerHTML = `${msg.text}<br>${msg.time}`;

  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
};

/**
 * Socket events
 */

 socket.on('userMessage', (data) => { appendUserMessage(data); });
 socket.on('serverMessage', (data) => { appendServerMessage(data); });
