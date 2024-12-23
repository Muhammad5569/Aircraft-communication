const mongoose = require('mongoose')
const validator = require('validator')

const ATCManagerSchema = new mongoose.Schema({
    name:{
            type: String,
            required: true,
        },
        age:{
            type: Number,
            required: true,
            validate(value){
                if(value < 0){
                    throw new Error('Age must be positive number')
                }
            }
        },
        role:{
            type: String,
            required: true,
        },
        airportName:{
            type: String,
            required: true,
        },
        airportAddress:{
            type: String,
            required: true,
        },
        phone:{
            type: Number,
            required: true,
            unique: true,
        },
        email:{
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Email is invalid')
                }
            }
        },
        login:{
            type: String,
            required: true,
            trim: true,
        },
        password:{
            type: String,
            required: true,
            minlength: 7,
        }
    
})
// Find ATC manager by credentials
ATCManagerSchema.statics.findByCredentials = async (login, password) => {
    const manager = await ATCManager.findOne({ login })
    if (!manager) {
        throw new Error('Unable to login')
    }
    if (password !== manager.password) {
        throw new Error('Unable to login')
    }
    return manager
}

// Hash password before saving
ATCManagerSchema.pre('save', async function (next) {
    const manager = this
    if (manager.isModified('password')) {
        manager.password = await bcrypt.hash(manager.password, 8)
    }
    next()
})
const ATCManager = mongoose.model('ATCManager', ATCManagerSchema)
module.exports = ATCManager