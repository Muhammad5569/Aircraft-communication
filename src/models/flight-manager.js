const mongoose = require('mongoose');
const validator = require('validator');

const flightManagerSchema = new mongoose.Schema({
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
    airlineName:{
        type: String,
        required: true,
    },
    airlineAddress:{
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

flightManegerSchema.static.findByCredentials = async (login, password) => {
    const flightManager = await FlightManager.findOne({login})

    if(!flightManager){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, flightManager.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
}

flightManagerSchema.pre('save', async function(next){
    const flightManager = this
    if(flightManager.isModified('password')){
        flightManager.password = await bcrypt.hash(flightManager.password, 8)
    }
})

const FlightManager = mongoose.model('FlightManager', flightManagerSchema)
module.exports = FlightManager