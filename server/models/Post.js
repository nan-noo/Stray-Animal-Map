const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Number,
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
    type: String,
    location: String,
    latLng: {
        type: Object,
    },
}, { timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = {Post};