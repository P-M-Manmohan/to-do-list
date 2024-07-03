import express from "express"
import pool from "./db.js"
import cors from "cors"
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt';
import pkg from 'jsonwebtoken';
const {jwt,verify,sign} = pkg;

const PORT= process.env.PORT ?? 4000
const app=express();

app.use(cors())
app.use(express.json())

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
    const id=uuidv4()
    try{
        const newToDo=await pool.query("INSERT INTO todos (id,user_email,title,progress,date) VALUES ($1,$2,$3,$4,$5)",[id,user_email,title,progress,date])
        res.json(newToDo)
    }catch(err){
        console.error(err)
    }
})

app.put('/todos/:id', async (req,res)=>{
    const { id }=req.params
    const { user_email,progress,title,date}=req.body
    try{
        const editTodo=await pool.query('UPDATE todos SET user_email=$1, title=$2, progress=$3, date=$4 WHERE id=$5' ,[user_email,title,progress,date,id])
        res.json(editTodo)
    }catch(err){
        console.error(err)
    }
})


//Delete todo
app.delete("/todos/:id",async(req,res)=>{
    const { id }=req.params;
    try{
        const del=await pool.query("DELETE FROM todos WHERE id=$1",[id])
        res.json(del)
    }catch(err){
        console.error(err)
    }
})

//signup
app.post('/signup',async(req,res)=>{
    const {email,password} = req.body
    const salt= bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    try{
        const result= await pool.query('INSERT INTO users (email,hashed_password) VALUES ($1,$2)',
            [email,hashedPassword]
        )
        const token= sign({email}, 'JWT_SECRET' ,{expiresIn: '1hr'})
        res.json({ email,token })
    }catch(err){
        console.error(err)
        res.json({detail: err.detail})
    }
})

//login
app.post('/login',async(req,res)=>{
    const {email,password} = req.body
    try{
        const user=await pool.query("SELECT * FROM users WHERE email=$1",[email])
        // console.log(user.rows[0])
        if(!user.rows[0]) {
            res.json({ detail: "User does not exist!" })
        }else{
        const success=await bcrypt.compare(password,user.rows[0].hashed_password)
            if (success) {
                const token= sign({email}, 'JWT_SECRET' ,{expiresIn: '1hr'})
                res.json({email : user.rows[0].email , token})
            }else{
                res.json({detail : "Login Failed"})
            }
        }
    }catch(err){
        console.error(err)
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})