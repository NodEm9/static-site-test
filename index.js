const express = require('express');
const cors = require('cors');



const app = express();
const port = 3500;

app.use(express.json());
app.use(cors());

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});