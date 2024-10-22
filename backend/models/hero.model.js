const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true,
    },
    real_name: {
        type: String,
        required: true,
        unique: true,
    },
    origin_description: {
        type: String,
        required: true,
    },
    superpowers: {
        type: String,
        required: true,
    },
    catch_phrase: {
        type: String,
        required: true,
    },
    images: {
        type: String,
        default: ''
    }
}, {
    timestamps: true,
    versionKey: false,
});

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;