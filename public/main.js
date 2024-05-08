console.log('Hello! I am client server.');

const socket = io();

const clientsTotal = document.getElementById('client-total');

const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

console.log(messageContainer);
console.log(nameInput);
console.log(messageForm);
console.log(messageInput);

socket.on('clients-total', (data) => {
    clientsTotal.innerText = `Total Client : ${data}`
});
