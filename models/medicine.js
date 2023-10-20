const mongoose = require('mongoose')

let medicineSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    price:{
        type:String,
        required: true
    }

})

let Medicine = mongoose.model('Medicine',medicineSchema)
module.exports = { Medicine, medicineSchema }