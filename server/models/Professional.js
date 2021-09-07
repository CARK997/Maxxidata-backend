const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfessionalSchema = new mongoose.Schema({
    name:  {
        type: String,
        require: true
    },
    phone: String,
    email: String,
    situation: {
        type: Boolean,
        default: true,
        require: true
    },
    professionalType: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'ProfessionalType'
    },    
    createdAt: {
        type: Date,
        default: Date.now,
        require: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        require: true
    },
});

module.exports = mongoose.model("Professional", ProfessionalSchema);