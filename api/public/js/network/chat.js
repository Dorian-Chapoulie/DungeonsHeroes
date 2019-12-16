import { sendMessage } from '/js/network/socketsHandler.js';
import { getLocalPlayer } from '/js/game.js';

export const initChat = () => {
    const chatButton = document.getElementById('sendchat');
    chatButton.onclick = sendChat;
}

export const displayMessage = data => {
    const chatBox = document.getElementById('conversation');
    const message = document.createElement('p');
    message.innerHTML = '<b>' + data.name + '</b>' + ": " + data.msg;
    chatBox.appendChild(message);
    scrollToLastMsg();
}

export const displayNewUser = username => {
    const chatBox = document.getElementById('conversation');
    const message = document.createElement('p');
    message.innerHTML = '<b>' + username + '</b>' + '<i>' + "s'est connecté." + '</i>';
    chatBox.appendChild(message);
    scrollToLastMsg();
}

export const displayUserDisconnected = username => {
    const chatBox = document.getElementById('conversation');
    const message = document.createElement('p');
    message.innerHTML = '<b>' + username + '</b>' + '<i>' + "s'est déconnecté." + '</i>';
    chatBox.appendChild(message);
    scrollToLastMsg();
}

const scrollToLastMsg = () =>  {
    const chatBox = document.getElementById('conversation');
    chatBox.scrollTop = chatBox.scrollHeight;
}

const sendChat = () => {
    const text = document.getElementById("data");
    sendMessage('sendchat', {msg: text.value, name: getLocalPlayer().name});
    text.value = '';
}