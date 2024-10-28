const express = require('express');

const PORT = 9999;


// APP
const app = express();
app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen(PORT);
console.log("server is running")