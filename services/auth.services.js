import User from "../models/user.model.js";


export const checkExistingUser = async ({email})=>{
  const userExists = await User.findOne({email});
  return userExists
};

export const createUser = async ({name,email,password,role }) => {
   
    const newUser = await User({ name,email,password,role });
    return newUser;
};

export const checkUserEmailExist = async ({email }) => {
    const exists = await User.findOne({ email});
    return exists;
};

export const loginUser = async ({email})=>{
  const user = await User.findOne({email});
  return user;
};