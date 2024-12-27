const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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
    airwaysName:{     
            type: String,
            required: true,
    },
    airwaysAddress:{
        type:String,
        required: true,
    },
    phone :{
        type: Number,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
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
        unique: true,
    },
    password:{
        type:String,
        required: true,
        minlength: 7, 
    },
    
})
pilotSchema.statics.findByCredentials = async (login, password) => {
    const pilot = await Pilot.findOne({ login })
    if (!pilot) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, pilot.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return pilot
}

pilotSchema.pre('save', async function (next) {
    const pilot = this
    if (pilot.isModified('password')) {
        pilot.password = await bcrypt.hash(pilot.password, 8)
    }
    next()
})
const Pilot = mongoose.model('Pilot', pilotSchema)

module.exports = Pilot