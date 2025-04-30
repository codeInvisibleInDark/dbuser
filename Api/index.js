const express=require('express');
const cors=require('cors');
const pool=require('./db');
require('dotenv').config();

const app=express();
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    try{
        res.json(`welcome to hr api`);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});
app.get('/region',async(req,res)=>{
    try{
        const result=await pool.query('SELECT COUNT(*) FROM employees');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});







const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Connected sucessfully.... on port ${PORT}`)
});
