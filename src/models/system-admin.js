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