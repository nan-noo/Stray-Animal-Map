const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: String,
        unique: 1,
    },
    title: {
        type: String,
        maxlength: 50,
    },
    content: {
        type: String,
    },
    img: String,
    type: Number,
    location: String,
    latLng: {
        type: Object,
    },
}, { timestamps: true});

const Post = mongoose.model('User', postSchema);

module.exports = {Post};