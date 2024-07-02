import express from "express"
import pool from "./db.js"
import cors from "cors"
import { v4 as uuidv4 } from "uuid";


const PORT= process.env.PORT ?? 4000
const app=express();

app.use(cors())

//get all todos
app.get('/todos/:userEmail', async (req,res)=>{
    const { userEmail }= req.params

    try{
        const result=await pool.query('SELECT * FROM todos WHERE user_email=$1',[userEmail])
        res.json(result.rows)
    }catch(err){
        console.log(err)
    }
})


//create new todo
app.post('/todos',async(req,res)=>{
    const { user_email,progress,title,date}=req.body
    console.log(user_email,progress,title,date)
    const id=uuidv4()
    try{
        await pool.query("INSERT INTO todos (id,user_email,title,progress,date) VALUES ($1,$2,$3,$4,$5)",[id,user_email,title,progress,date])
    }catch(err){
        console.error(err)
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})