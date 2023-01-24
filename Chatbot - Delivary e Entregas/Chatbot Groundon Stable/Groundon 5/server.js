const express = require("express")

const app = express()

app.get(
    "/",
    function (req, res) {
        res.send("Hello World!")
    }
);

app.listen(3000, () => {
    console.log("server running in port 3000")
})

//rodar o docker no linux

// systemctl start docker

//sudo docker build -t chatbot-wpp .

// docker run -p 8888:80 chatbot-wpp
