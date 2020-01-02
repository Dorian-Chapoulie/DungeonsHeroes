
export const displayMessage = data => {
    const chatBox = document.getElementById('conversation');
    const message = document.createElement('p');
    message.innerHTML = '<b id="chatname">' + data.name + '</b>' + ": " + data.msg;
    chatBox.appendChild(message);

}

export const displayNewUser = username => {
    const chatBox = document.getElementById('conversation');
    const message = document.createElement('p');
    message.innerHTML = '<b>' + username + '</b>' + '<i>' + "s'est connecté." + '</i>';
    chatBox.appendChild(message);
}

export const displayUserDisconnected = username => {
    const chatBox = document.getElementById('conversation');
    const message = document.createElement('p');
    message.innerHTML = '<b>' + username + '</b>' + '<i>' + "s'est déconnecté." + '</i>';
    chatBox.appendChild(message);
}