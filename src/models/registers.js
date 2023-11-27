const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirmPassword:{
        type: String,
        required: true
    }
})
const Register=new mongoose.model("Register",userSchema);
module.exports=Register;

//=>
