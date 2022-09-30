const express = require('express');
const mysql = require('mysql');


// create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: '',
    database: 'nodemysql'
});

//connect
db.connect((err)=>{
  if(err){
   throw err;
  }
   console.log("Mysql connected....");
});

const app = express();

// create db
app.get('/createdb',(req, res)=>{
    var sql = 'CREATE DATABASE nodemysql';
    db.query(sql,(err,result)=>{
        if(err){ 
            throw err;
        }
        res.send('database created...');
        console.log(result);
    })
});


// create table
app.get('/createposttable',(req,res)=>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255)  , body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.send("table created successfully....");
        console.log(result);
    })
})

// Insert post 1
app.get('/addpost1', (req, res)=>{
    let post1 = {title:'Post One', body: 'This is a post one'}
    let sql = 'INSERT INTO posts SET ?'
    let query = db.query(sql,post1 , (err, result)=>{
        if (err) throw err;
        res.send("Inserted post1...")
        console.log(result)
    });
});

// Insert post 2
app.get('/addpost2', (req, res)=>{
    let post2 = {title:'Post Two', body: 'This is a post two'}
    let sql = 'INSERT INTO posts SET ?'
    let query = db.query(sql,post2 , (err, result)=>{
        if (err) throw err;
        res.send("Inserted post2...")
        console.log(result)
    });
});

// select from post
app.get('/getposts',(req, res)=>{
    let sql = 'SELECT * FROM posts';
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        res.send("posts fetched successfully...")
        console.log(result);
    })

});

// select single post
app.get('/getposts/:id',(req, res)=>{
    let sql = `SELECT * FROM posts WHERE id= ${req.params.id}`;
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        res.send("posts fetched successfully...")
        console.log(result);
    })

});

// update single post
app.get('/updateposts/:id',(req, res)=>{
    let newtitle = `updated title ${req.params.id}`
    let sql = `UPDATE posts SET title= '${newtitle}' WHERE id= ${req.params.id}`;
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        res.send("posts fetched successfully...")
        console.log(result);
    })
});

// delete single post
app.get('/deleteposts/:id',(req, res)=>{
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        res.send(`posts ${req.params.id} deleted successfully...`)
        console.log(result);
    })

});

app.listen('3000',(err)=>{
    console.log("listening on port 3000");
})