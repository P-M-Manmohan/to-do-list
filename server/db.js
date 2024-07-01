import pg from 'pg'
const {Pool} =pg;
import dotenv from "dotenv/config"

const pool=new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host:process.env.HOST,
    port:process.env.DBPORT,
    database:'todolist'
})

export default pool