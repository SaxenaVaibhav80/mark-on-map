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
app.post('/', async(req,res)=>
{
    const marked_country = await req.body.country;

    Promise.resolve(marked_country)
      .then((country) => {
        const insertQuery =("INSERT INTO visited (country) VALUES ($1)")
        db.query(insertQuery,[country],(err,res)=>
        {
          if(err)
         {
           console.log(err)
         }
        })

        res.redirect('/')
    })
      .catch((err) => {
        console.error('Error:', err);
        res.status(500).send('Error occurred');
      });
})

app.get('/',(req,res)=>
{
    res.render('map')
})
app.listen(3000)