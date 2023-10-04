require('dotenv').config()
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const app = express();
const bodyParser = require('body-parser');
const connect = require('./helper/sqlRequest.js')

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.post('/login', async (req, res) => {
    const login = req.body.username;
    const pass = req.body.password;

    let users = await connect({login, pass});
    users = users.recordsets;
    users.forEach(user => {
      if (user.length) {
        const token = jwt.sign(
            { user: login },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2H",
            }
        );
    
        res.send({
            token
        }
        );
      } else {
        res.send('connexion refusée')
      }
    });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080'));