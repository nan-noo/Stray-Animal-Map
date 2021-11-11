const express = require('express');
const router = express.Router();

const { Comment } = require('../models/Comment');

router.post('/comment', (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, comment) => {
        if(err) return res.json({success: false, err});

        Comment.find({_id: comment._id})
            .populate('writer')
            .exec((err, result) => {
                if(err) return res.status(400).json({success: false, err});
                return res.status(200).json({success: true, result});
            });
    });
});

router.get('/allComments', (req, res) => {
    Comment.find({postId: req.query.postId})
        .populate('writer')
        .exec((err, result) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success: true, result});
        });
});

module.exports = router;