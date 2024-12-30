const express=require('express');
const zod=require("zod")
const router=express.Router();
const {User, Account}=require('./../db')
const jwt=require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
const authmiddleware=require('./../middleware')
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

const updateBody=zod.object({
    password:zod.string().min(6),
    firstName:zod.string,
    lastName:zod.string()
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
    username:req.body.username
})
if(user){
    return res.json({
        msg:"Email already exists / Incorrect inputs"
    })
}
const dbuser=await User.create(body);

const userId=dbuser._id;

await Account.create({
    userId,
    balance:1+Math.random()*1000
})

const token=jwt.sign({
    userId
},JWT_SECRET);

res.json({
    msg:"User Created Successfully",
    token:token
})

})
router.post('/signin',async (req,res)=>{ 
    const body=req.body;
    const {success}=signinSchema.safeParse(body);
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
router.put('/update', authmiddleware, async (req, res) => {
    const body = req.body;

    // Validate the request body
    const { success } = updateBody.safeParse(body);
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    try {
        // Update user information in the database
        await User.updateOne(
            { _id: req.userId }, // Query
            body                 // Update data
        );

        // Respond with success
        res.json({
            msg: "Updated successfully"
        });
    } catch (error) {
        // Handle potential errors
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
});


router.get('/bulk', async (req,res)=>{
    const filter=req.query.filter || "";

    const users=await User.find({
        $or: [{
            firstName:{"$regex":filter}
        },{
            lastName:{"$regex":filter}
        }]
    })
    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})




module.exports=router;