const express = require("express")

const app = express()

app.get(
    "/",
    function (req, res) {
        res.send("<h1> Chatbot-Whatsapp Delivery <h1> <br> STATUS: Online <br> <br> PORTA RODANDO = 0.0.0.0:8888")
    }
);

app.listen(3000, () => {
    console.log("Server running in port 3000")
    console.log("http://localhost:8888/")
})
