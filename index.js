const express = require('express');
const cors = require('cors');



const app = express();
const port = 3500;

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3500', 'https://static-site-test-77pb.onrender.com'];

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors(
    {
        origin: {
            origin: allowedOrigins.indexOf('*') !== -1 ? '*' : function (origin, callback) {
                if (!origin) return callback(null, true);
                if (allowedOrigins.indexOf(origin) === -1) {
                    var msg = 'The CORS policy for this site does not ' +
                        'allow access from the specified Origin.';
                    return callback(new Error(msg), false);
                }
                return callback(null, true);

            },
            credentials: true
        }
}
));

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