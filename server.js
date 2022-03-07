const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

//controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require ('./controllers/image');

//database
const db = knex ({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  });




const app = express();



app.use(bodyParser.json());
app.use(cors());

//request
app.get(' /', (req, res)=> {res.send('it is working') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt ))
app.get('/profile/:id', profile.handleProfile(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', image.handleApiCall)

//port
app.listen(process.env.PORT || 3000, () => {  
  console.log(`app is running on port ${process.env.PORT}`);
}) 
/*

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET =user
/image --> PUT --> user

*/