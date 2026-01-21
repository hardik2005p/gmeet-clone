const {User}=require(".");
const jwt=require("jsonwebtoken");



const JWT_Secret=process.env.JWT_Secret;

async function login(req,res)
{
    try{

        const email=req.body.email;
        const password=req.body.password;

        if(!email||!password)
        {
            return res.status(400).json({
                message:"Email and Password are Required"
            })
        }
        const user=await User.findOne({email:email});
        if(!user)
        {
            return res.status(404).json({
                message:"User/Email Not found"
            })
        }
        if(user.password!=password)
        {
            return res.status(401).json({
                message:"Incorrect Password"
            })
        }
        const token=jwt.sign(user.email,JWT_Secret);
        res.status(201).json({
            message:"Login Successfull",
            token
        })
        
       



        


    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error"
        })

    }

}
module.exports=login;

    