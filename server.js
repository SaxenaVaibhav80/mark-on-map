const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const pg= require('pg')
const ejs = require('ejs')
var marked_country
var row
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.use(express.static('public'));
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
    marked_country = await req.body.country;
    marked_country=marked_country.charAt(0).toUpperCase()+ marked_country.slice(1)
    Promise.resolve(marked_country)
      .then((country) => {

        // inserting into database-->

        const insertQuery =("INSERT INTO visited (country) VALUES ($1)")
        db.query(insertQuery,[country],(err,res)=>
        {
          if(err)
         {
           console.log(err)
         }
         else{
            console.log(res.rows)
         }
        })
    // fetching rows from database-->
    
        db.query('SELECT * FROM visited',(err,res)=>
      {
        if(err)
        {
           console.log(err)
        }else
        {
        row=res.rows
        }
      })

        res.redirect('/')
    }).catch((err) => {
        console.error('Error:', err);
        res.status(500).send('Error occurred');
      });
})



app.get('/',(req,res)=>
{
    if(row){
      res.render('map')
    }else{
        res.render('map')
    }
})
app.listen(3000)