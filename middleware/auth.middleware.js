import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

  export  const protect = asyncHandler( async (req,res,next)=>{
    try {
         const token = req.cookies.token; 
         if(!token){
            res.status(401);
            throw new Error("Not authenticated, please login")

         }

         //verify token
         const verify = jwt.verify(token, process.env.JWT_SECRET)
         //get user id from token
         const user = await User.findById(verify.id).select("-password")
                 if(!user){
                    res.status(401);
                    throw new Error("User not Found");
                 }
                 req.user = user
                 next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authenticated,please login")
    }
});

//Admin only
export const adminOnly = (req,res,next) =>{
    if(req.user && req.user.role === "admin"){
        next()
    }
   else{
    res.status(401);
    throw new Error("Not authorized to perfume this action")
   }

}

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) res.status(403).json("Token is not valid!");
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  };


  

