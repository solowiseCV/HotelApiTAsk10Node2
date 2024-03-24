
import bcryptjs from "bcryptjs";
import jwt  from "jsonwebtoken";
import asyncHandler from"express-async-handler";
import User from "../models/user.model.js";


const generateToken = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn: "1d"
  })
}
//Register
export const signUp = asyncHandler(async (req,res) =>{
 const {email,name,password} = req.body;
 //validation
 if(!email || !name || !password ,email ==="",name === "",password==="" ){
    res.status(400)
    throw new Error("please fill all required fields")
 }
 const hashedPassword = bcryptjs.hashSync(password,10)

 const existingUser = await User.findOne({email});
 if(existingUser){
  res.status(409);
  throw new Error("User Already exists,signIn")
 }
 
 //create a user
const user = await  User({
    name,
    email,
   password:hashedPassword,
});

// generate a token

const token = generateToken(user._id)
if(user){
    const {_id, name, email}= user;
  res.cookie("token", token,{
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now()+ 1000 * 86400),
    //secure:true,
    //sameSite: none,
  })
  try {
    await user.save()
    res.status(201).json({
       _id, name, email,
      })
  } catch (error) {
    res.status(500).json(err)
  }
 
    res.status(400);
    throw new Error("Invalid user data")
}

})

//login user
export const signIn = asyncHandler( async(req,res)=>{
  const { email, password} = req.body
  if(!email || !password || email ==="" || password ===""){
    res.status(400)
    throw new Error("Fill all fields...")
  }
  
    
  const user = await User.findOne({email});
  if(!user){
    res.status(404)
    throw new Error("User not found")
  }
  const validPassword = await bcryptjs.compare( password, user.password);

  const token = generateToken(user._id)
  if(validPassword){
  const newUser = await User.findOne({email}).select("-password");

    res.cookie("token", token,{
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now()+ 1000 * 86400),
      //secure:true,
      //sameSite: none,
    });
    res.status(200).json(newUser);
   
  }else{
    res.status(404)
    throw new Error("Invalid credential")
  }
  
}) ;

//logout
export const logoutUser = asyncHandler(async (req,res)=>{
  
  res.cookie("token", "",{
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    //secure:true,
    //sameSite: none,
  });
  res.status(200).json({message: "Succesfully logged out..."})
});


