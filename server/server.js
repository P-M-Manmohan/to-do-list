import express from "express"
import pool from "./db.js"
import cors from "cors"

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

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})