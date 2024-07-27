import { query, validationResult } from 'express-validator';
import { Router } from "express";
const app=Router();
var users=[{id:1,name:'ahmed',age:25},
{id:2,name:'ayman',age:26},
{id:3,name:'adam',age:28},
]
app.get('/api/users',(req,res)=>{
    res.send(users);
})
const Auth = (request, response, next) => {
   if(request.params.age<18)response.send('not allowed you are a minor')
    else next()
};

// app.use(Auth);

app.get('/',query("email").isEmail(),(req,res)=>{
    if(validationResult(req).isEmpty())res.send(users)
    else res.send(validationResult(req))
})
// app.get('/:age',Auth,(req,res)=>{
//     res.send('hello ladies and gentlmen')
// })
// CRUD
//http://localhost:3000/users
app.get('/users',Auth,(req,res)=>{
   
    res.send(users)
})
//http://localhost:3000/users/1
app.get('/users/:id',(req,res)=>{
   var user=users.filter(users=>users.id===parseInt(req.params.id,10))
   res.send(user)
})
//http://localhost:3000/user?age=25
app.get('/user',(req,res)=>{
    var user=users.filter(users=>users.age>parseInt(req.query.age,10))
   
    res.send(user)
 })
 //http://localhost:3000/users
 app.post('/users',(req,res)=>{
    
   users.push(req.body)
    res.send(users)   
 })
 //update whole querry 
  app.put('/users/:id',(req,res)=>{
    var index=users.findIndex(users=>users.id===parseInt(req.params.id))
    users[index]=req.body
   
    res.send(users)   
 })
 //update just name
 app.patch('/users/:id',(req,res)=>{
    var index=users.findIndex(users=>users.id===parseInt(req.params.id))
    users[index].name=req.body.name
   
    res.send(users)   
 })
 app.delete('/users/:id',(req,res)=>{
    var index=users.findIndex(users=>users.id===parseInt(req.params.id))
    if (index>-1)  users.splice(index,1)
   
   
    res.send(users)   
 })
 // validator

  app.get('/hello', query('person').notEmpty().withMessage('should no be empty'), (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return res.send(`Hello, ${req.query.person}!`);
    }
  else
    res.send({ errors: result.array() });
  });
  app.get('/downloadfile', (req, res) => {
   // res.send('hello here');
    res.download('./src/index.js');
  });
  
export default app;