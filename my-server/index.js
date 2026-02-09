const express = require("express");

const app = express();
const port = 3000;

app.get("/test", (req, res) => {
    res.send("TEST OK");
});

app.listen(port, () => {
    console.log("SERVER RUNNING ON PORT " + port);
});
