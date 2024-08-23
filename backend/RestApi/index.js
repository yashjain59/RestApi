const express=require("express");
const fs=require('fs');
const PORT=8000;
const app=express();
const users=require("./MOCK_DATA.json");

//middleware
app.use(express.urlencoded({extended:false}));

app.get("/users",(req,res)=>{
    return res.json(users);
})

app.route("/users/:id")
.get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    return res.json(user);
})
.post((req,res)=>{
    const body=req.body;
    users.push({...body,id:users.length+1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"success",id:users.length});
    })
})
.patch((req,res)=>{
    return res.json({status:"pending"});
})



app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT} `);
})
