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

module.exports = router;