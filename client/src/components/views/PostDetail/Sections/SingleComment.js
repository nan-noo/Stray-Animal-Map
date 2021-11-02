import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Comment, Avatar, Button, Input} from 'antd';
import axios from 'axios';
import {COMMENT_SERVER} from '../../../Config';

const {TextArea} = Input;

function SingleComment({comment, postId, refreshFunction}) { // 댓글과 대댓글작성form
    const user = useSelector(state => state.user);

    const [openReply, setOpenReply] = useState(false);
    const [commentValue, setCommentValue] = useState("");

    const actions = [
        <span onClick={() => setOpenReply(!openReply)} key="comment-basic-reply-to">Reply</span>
    ];

    const onSubmit = (event) => {
        event.preventDefault();

        const data = {
            content: commentValue,
            writer: user.userData._id,
            postId: postId,
            responseTo: comment._id,
        };

        axios.post(`${COMMENT_SERVER}/comment`, data)
            .then(response => {
                if(response.data.success){
                    refreshFunction(response.data.result);
                    setCommentValue("");
                    setOpenReply(!openReply);
                }
                else{
                    alert('failed to save comment');
                }
            });
    };

    return (
        <div>
            <Comment
                actions={actions}
                author={comment.writer.name}
                avatar={<Avatar src={comment.writer.image} alt={comment.writer.name} />}
                content={<p>{comment.content}</p>}
            />
            { openReply &&
                <form style={{display: 'flex'}} onSubmit={onSubmit}>
                    <TextArea
                        style={{width: '100%', borderRadius: '5px'}}
                        onChange={e => setCommentValue(e.currentTarget.value)}
                        value={commentValue}
                        placeholder= 'write a comment'
                    />
                    <br/>
                    <Button style={{width: '15%', height: '52px', marginLeft: '10px'}} onClick={onSubmit}>Submit</Button>
                </form>
            }
            
        </div>
    );
}

export default SingleComment;