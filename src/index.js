import express from'express'
import usersRouter from "./routes/users.mjs"
import productsRouter from "./routes/products.mjs"

const app=express();
const port =3000
//routers
app.use(usersRouter);
app.use(productsRouter);
//MIDDLEWARE
app.use(express.json())

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})