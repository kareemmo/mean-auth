const express=require('express');
const bodyparser=require('body-parser');
const path=require('path');
const passport=require('passport');
const cors=require('cors');
const mongoose=require('mongoose');
const config=require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected',()=>{
    console.log('connected to database'+config.database)
});
mongoose.connection.on('error',()=>{
    console.log('database connection error'+error);
});


const app=express();

const users=require('./routes/users');

const port=7000;
//cors middlware
app.use(cors());

app.use(express.static(path.join(__dirname,'/public')));
//body parser 
app.use(bodyparser.json());
//passport middlware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

//index route
app.get('/',(req,res)=>{
    res.send('invalid request');

});
//start server
app.listen(port ,()=>{
  console.log('server started at port '+port);
    
});