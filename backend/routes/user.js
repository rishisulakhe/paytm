const express=require('express');
const zod=require("zod")
const router=express.Router();
const {User}=require('./../db')
const jwt=require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
//Signup and signin routes

const signupSchema=zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),

})

const signinSchema=zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post('/signup',async (req,res)=>{
const body=req.body;
const {success}=signupSchema.safeParse(body);
if(!success){
    return res.json({
        msg:"Email already exists / Incorrect inputs"
    })
}
const user= await User.findOne({
    username:body.username
})
if(user._id){
    return res.json({
        msg:"Email already exists / Incorrect inputs"
    })
}
const dbuser=await User.create(body);
const token=jwt.sign({
    userid:dbuser._id
},JWT_SECRET);

res.json({
    msg:"User Created Successfully",
    token:token
})

})
router.post('/signin',async (req,res)=>{
    const body=req.body;
    const {success}=siginSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message: "Error while logging in"
        })
    }
    const user= await User.findOne({
        username:req.body.username,
        password:req.body.password

    });
    if(user){
        const token=jwt.sign({
            userId:user._id
        },JWT_SECRET);
        res.json({
            token:token
        })
        return;
    }
    res.status(411).json({
        msg:"Error while logging in"
    })
})

module.exports=router;