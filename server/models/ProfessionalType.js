const mongoose = require('mongoose');

const ProfessionalTypeSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true
    },
    situation: {
        type: Boolean,
        default: true,
        require: true
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

module.exports = mongoose.model("ProfessionalType", ProfessionalTypeSchema);