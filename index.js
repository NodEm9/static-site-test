const express = require('express');
const cors = require('cors');



const app = express();
const port = 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile('index.html');
});

// Error handling
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500).send("Something is broken!")
    res.render('error', { error: err })
  }
  
  // Error handling middleware
  app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});