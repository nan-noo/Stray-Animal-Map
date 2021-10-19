const express = require('express');
const router = express.Router();

const { Post } = require('../models/Post');

router.post('/uploadPost', (req, res) => {
    const post = new Post(req.body);
    post.save((err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    });
});

router.get('/getPosts', (req, res) => {
    Post.find()
        .exec((err, posts) => {
            if(err) return res.json({success: false, err})
            return res.status(200).json({success: true, posts})
        });
});

router.post('/getPost', (req, res) => {
    Post.findOne({_id: req.body.postId})
        .exec((err, post) => {
            console.log(post);
            if(err) return res.json({success: false, err})
            return res.status(200).json({success: true, post})
        });
});

module.exports = router;