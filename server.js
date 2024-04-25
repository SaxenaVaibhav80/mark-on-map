const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const pg= require('pg')
const ejs = require('ejs')
var marked_country
var result
var result2
var list=[]
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

// fetching all code of country in the visited table 

app.post('/',async(req,res)=>{

try{
  marked_country = req.body.country
  marked_country = marked_country.charAt(0).toUpperCase() + marked_country.slice(1);
  
  const query = ('SELECT code FROM countries WHERE country = ($1)')
  result = await db.query(query,[marked_country])
  const cod=(result.rows[0].code)
  insert_query=('INSERT INTO visited (code) VALUES ($1)')
  result2= await db.query(insert_query,[cod])
  
}catch(err){
  console.log(err)
}
res.redirect('/')
})

app.get('/',async(req,res)=>
{
  const resolve= await db.query('SELECT code FROM visited')
      row=resolve.rows
      for(var i=0;i<row.length;i++)
     {
      list[i]=row[i].code
     }

  res.render('map',{marked_country_list:list})
})
app.listen(3000)

