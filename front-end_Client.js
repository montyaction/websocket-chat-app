import { WebSocket } from 'ws';

const socket = new WebSocket('ws://localhost:8080');

// Event listener for when the WebSocket connection is established
socket.onopen = () => {
	console.log('WebSocket connection established established.');
	socket.send('Hello Server!');	// Example: Sending a message to the server
};

// Event listener for incoming message from the server
socket.onmessage = (event) => {
	console.log('Message from server:', event.data);
};

// Event listener for WebSocket errors
socket.onerror = () => {
	console.error('WebSocket error:', error);
};

socket.onclose = () => {
	console.log('WebSocket connection closed.');
};