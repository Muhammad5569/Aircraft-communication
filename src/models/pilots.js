const mongoose = require('mongoose')
const validator = require('validator')

const pilotSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    age:{
        type:  Number,
        required: true,
        validate(value){
            if(value < 0){
                throw new Error('Age must be positive number')
            }
        }
    },
    role:{
        type: String,
    },
    airway:{
        name:{
            type: String,
            required: true,
        },
        address:{
            type:String,
            required: true,
        }
    },
    phone:{
        type: Number,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        trim:true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    login:{
        type:String,
        required: true,
        trim: true,
    },
    password:{
        type:String,
        required: true,
        minlength: 7, 
    },
    
})

const Pilot = mongoose.model('Pilot', pilotSchema)

module.exports = Pilot