const client = require("./client");

const path = require("path");
const express = require("express");

const app = express();
app.get("/", (req, res) => {
    client.ListarTodos(null, (err, data) => {
        if (!err) {
            res.status(200).send({produtos:data})
            }
        })
    });




app.listen(3001, () => {
    console.log("Server running at port 3001");
});