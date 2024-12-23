const mongoose   = require('mongoose')
const validator  = require('validator')

const airportManagerSchema = new mongoose.Schema({
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

airportManagerSchema.statics.findByCredentials = async (login, password) => {
    const airportManager = await AirportManager.findOne({ login })

    if (!airportManager) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, airportManager.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return airportManager
}

airportManagerSchema.pre('save', async function (next) {
    const airportManager = this

    if (airportManager.isModified('password')) {
        airportManager.password = await bcrypt.hash(airportManager.password, 8)
    }

    next()
})
const AirportManager = mongoose.model('AirportManager', airportManagerSchema)
module.exports = AirportManager