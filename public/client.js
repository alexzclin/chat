const socket = io("http://localhost:3000");
const msgContainer = document.getElementById("message-container");
const msgForm = document.getElementById("send-container");
const msgInput = document.getElementById("message-input");
const username = prompt("What is your username?");
socket.emit("new-user", username);

socket.on("chat-message", data => {
    appendMessage(`${data.name} ${data.time}\n ${data.message}`);
});

socket.on("self-message", data => {
    appendMessage(`${data.name} ${data.time}\n ${data.message}`);
});

socket.on("user-connected", name => {
    appendMessage(`${name} joined!`);
});

socket.on("user-disconnected", name => {
    appendMessage(`${name} left!`);
});

msgForm.addEventListener("submit", e => {
    e.preventDefault();
    const message = msgInput.value;
    if (message != "" && message.trim().length != 0) {
        socket.emit("send-chat", message);
        socket.emit("send-own", message);
        msgInput.value = "";
    }
})

function appendMessage(message) {
    const msgElement = document.createElement("div");
    msgElement.innerText = message;
    msgContainer.append(msgElement);
    msgContainer.scrollTop = msgContainer.scrollHeight;
}

msgForm.addEventListener("keypress", submitOnEnter);

function submitOnEnter(event){
    if(event.which === 13 && !event.shiftKey){
        event.preventDefault();
        event.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
        event.target.value = "";
    }
}
