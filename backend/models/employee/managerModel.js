const mongoose = require('mongoose')

const managerSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    firstName:{
        type:String,
        required:[true,'first name is required']
    },
    lastName:{
        type:String,
        required:[true,'last name is required']
    },
    phone:{
        type:String,
        required:[true,'phone no is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    website:{
        type:String,
    },
    department:{
        type:String,
        required:[true,'department is required']
    },
    experience:{
        type:String,
        required:[true,'year of experience is required']
    },
    managerFrom:{
        type:String,
        required:[true,'manager from date is required']
    },
    status:{
        type:String,
        default:'pending'
    }
   
   },
   {timestamps: true}
)

const managerModel = mongoose.model('managers',managerSchema)
module.exports = managerModel