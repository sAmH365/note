import express from 'express';

const PORT = 9999;


// APP
const app = express();
app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen(PORT);