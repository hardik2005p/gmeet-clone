const { User } = require(".");

async function signup(req,res){    //function nees to be async as findOne is awaited
    try{
        const email=req.body.email;
        const password=req.body.password;

    if(!email||!password)
    {
        return res.status(400).json({
        message: "Email and password are required"
      });
    }

    if(await User.findOne({email:email})!=null)  //findOne is async function, returns a promise
    {
        return res.status(409).json({
        message: "Email already exists"
      });

    }
    await User.create({
        email:email,
        password:password
    })
    return res.status(201).json({
      message: "User created successfully"
    });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error"
        })

    }



    
}
module.exports=signup

