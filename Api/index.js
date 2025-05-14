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



app.get('/assign1', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
    (SELECT COUNT(*) FROM employees) AS emp_count,
    (SELECT COUNT(*) FROM departments) AS dep_count,
    (SELECT COUNT(*) FROM locations) AS loc_count,
    (SELECT COUNT(*) FROM countries) AS con_count,
    (SELECT COUNT(*) FROM regions) AS reg_count,
    (SELECT COUNT(*) FROM jobs) AS job_count,
    (SELECT COUNT(*) FROM job_history) AS count_jobhistory;

        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
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
