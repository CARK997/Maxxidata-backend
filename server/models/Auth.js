const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AuthSchema = new mongoose.Schema({
    email: String,
    password: String,
    userId: Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Auth", AuthSchema);