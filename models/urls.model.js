const   mongoose = require('mongoose')
const shortId = require('shortid')
const Schema = mongoose.Schema;

const shortUrlSchema = new mongoose.Schema({
    full:{
        type : String,
        required: true
    },
    short:{
        type : String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
        
    }
})


module.exports = mongoose.model('ShortUrl', shortUrlSchema)