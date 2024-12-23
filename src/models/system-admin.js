const mongoose = require('mongoose')

const systemAdminSchema = new mongoose.Schema({
    name:{
        type: String
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

systemAdminSchema.statics.findByCredentials = async (login, password) => {
    const systemAdmin = await SystemAdmin.findOne({login})
    if(!systemAdmin){
        throw new Error('Unable to login')
    }  

    if(systemAdmin.password !== password){
        throw new Error('Unable to login')
    }
    return systemAdmin
}
systemAdminSchema.pre('save', async function(next){
    const systemAdmin = this
    if(systemAdmin.isModified('password')){
        systemAdmin.password = await bcrypt.hash(systemAdmin.password, 8)
    }
    next()
})
const SystemAdmin = mongoose.model('SystemAdmin', systemAdminSchema)
module.exports = SystemAdmin