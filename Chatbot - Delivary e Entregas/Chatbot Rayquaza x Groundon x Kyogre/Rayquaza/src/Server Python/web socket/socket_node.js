const io = require("socket.io-client");

const socket = io("http://localhost:8000/chatbot");

const linkedList = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: null
        }
    }
};

socket.on("connect", () => {
    console.log("Connected to server");
    
    // Enviar a lista encadeada para o servidor
    socket.send(JSON.stringify(linkedList));
});

socket.on("message", (data) => {
    console.log("Received response from server:", data);
});

// Outras ações do chatbot...

