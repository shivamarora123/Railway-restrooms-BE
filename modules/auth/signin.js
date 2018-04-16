const mongoose=require('mongoose')
const  Users=require(__base + 'models/users.js')
const bcrypt=require('bcrypt')



const loginuser=(req,res)=>{
Users.findOne({$or:[{"userName":req.body.username}]},(error,user)=>{
    if(error){
        console.log('Error at DB')
    }
    if(!user){
        console.log('User Not Found')
        res.status(404).json({
            message:"User not Found",
            username:req.body.username,
            password:req.body.password,

        })
    }
    if(user){
        bcrypt.compare(req.body.password,user.password,(err,result)=>{
            if(result){
              //  console.log(result)
                res.status(200).json({
                    success:true,
                    message:"Authentication successful"
                })

            }
            if(!result){

                res.status(401).json({
                    success:false,
                    message:"Authentication Failed"
                })
            }
            if(err){
                res.status(409).send('error in hashing password')
            }
        })
    }
})
}
module.exports=loginuser