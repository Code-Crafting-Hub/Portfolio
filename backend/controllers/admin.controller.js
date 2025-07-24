const config = require("../config");
const adminModel = require("../models/admin.model");
const z = require('zod')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const signup = async (req,res)=>{
    const {firstName, lastName, phoneNo, email, password} = req.body
    const existingNumber = await adminModel.findOne({phoneNo})
    if(existingNumber){
        return res.status(400).json({errors:"Admin already exist on this number"})
    }
    const existingMail = await adminModel.findOne({email})
    if(existingMail){
        return res.status(400).json({errors:"Admin already exist on this mail"})
    }
    const adminValidate = z.object({
        firstName: z.string().min(1, { message: "First name is required" }),
        lastName: z.string().min(1, { message: "Last name is required" }),
        phoneNo: z.number().min(10, { message: "Phone number must be at least 10 digits" }),
        email: z.string().email({message:"Invalid email"}),
        password: z.string().min(8,{message:"Password must be atleast 8 char long"})
    })
    const validateData = adminValidate.safeParse(req.body)
    if(!validateData.success){
        return res.status(400).json({errors: validateData.error.issues.map((err) => err.message)})
    }
    const salt = 10
    const hashedPassword = await bcrypt.hash(password,salt)
    
    try{
        const data =new adminModel({
        firstName:firstName,
        lastName:lastName,
        phoneNo:phoneNo,
        email:email,
        password:hashedPassword
    })
        data.save()
        res.status(200).json({message:"Signup successfully"})
    }catch(error){
        console.log("Error while sighup",error)
        res.status(401).json({errors:"Error while signing up"})
    }
}

const login = async (req, res) => {
  const {email, password} = req.body
    try{
        const admin =await adminModel.findOne({email})
        if(!admin){
            return res.status(401).json({errors:"Invalid email"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, admin.password)
        if(!isPasswordCorrect){
            return res.status(401).json({errors:"Invalid password"})
        }
        const token = jwt.sign(
            {
                id: admin._id
            },
            config.JWT_ADMIN_PASSWORD,
            {
                expiresIn: "1d"
            }
        );
      
        res.cookie("jwt",token);
        res.status(201).json({message:"Login successfully", token, success: true});

    }catch(error){
        console.log("error in login",error)
        res.status(400).json({errors:"error while login"})
    }
};

const logout = async (req, res) => {
  try {
    if (!req.cookies.jwt) {
      return res.status(401).json({ errors: "Kindly login first" });
    }
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log("error in logout", error);
    res.status(500).json({ errors: "Error in logout" });
  }
};

const adminController = { login, logout, signup};

module.exports = adminController;