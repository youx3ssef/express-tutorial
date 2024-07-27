import { query, validationResult } from 'express-validator';
import { Router } from 'express';
import express from 'express'
import mysql from 'mysql';
const app = Router();
app.use(express.json());
var sql2 = 'SELECT * FROM products';

const db = mysql.createConnection({
    host: 'localhost', // MySQL server host
    port: 3306, // MySQL server port
    user: 'root', // your MySQL username
    password: 'password', // your MySQL password
    database: 'mydatabase'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

app.get('/products', (req, res) => {
    db.query(sql2, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/products', (req, res) => {
    const { name, price } = req.body; // Adjust fields based on your table schema
    const sql = 'INSERT INTO products (name, price) VALUES (?, ?)';
    const values = [name, price];

    db.query(sql, values, (err, results) => {
        if (err) throw err;
        db.query(sql2, (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
});
app.put('/products/:id', (req, res) => {
    const { name, price } = req.body;
    const sql = 'UPDATE products SET name=?,price=? where id=?';
    const values = [name, price,req.params.id];
   

    db.query(sql, values, (err, results) => {
        if (err) throw err;
        db.query(sql2, (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
  
});
app.delete('/products/:id', (req, res) => {
    
    const sql = 'DELETE FROM products where id=?';
    const values = [req.params.id];
   

    db.query(sql, values, (err, results) => {
        if (err) throw err;
        db.query(sql2, (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
  
});
app.get('/products/:id',(req,res)=>{
const sql = "SELECT * FROM products WHERE id=?";
const values =[req.params.id];
db.query(sql,values,(err,results)=>{
    if(err) throw err;
    res.send(results);
})
})
export default app;
