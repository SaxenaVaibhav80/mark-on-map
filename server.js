const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const pg= require('pg')
const ejs = require('ejs')
var marked_country
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.use(express.static('public'));
var data
const db = new pg.Client({
    user:'postgres',
    host:'localhost',
    database:'world',
    password:'vaibhav',
    port:5432
});

db.connect();

db.query("SELECT * FROM countries", (err,res)=>
{
    if(err){
        console.log('error found , no data recieved')
    }
    else{
        data=res.rows;
    }

    db.end();
});

app.post('/',(req,res)=>
{
  marked_country=req.body.country
  res.redirect('/')
})

app.get('/',(req,res)=>
{
    res.render('map')
})
app.listen(3000)