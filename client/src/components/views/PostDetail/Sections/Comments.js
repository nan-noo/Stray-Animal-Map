import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import axios from '../../../../axios';
import styled from 'styled-components';

import { COMMENT_SERVER } from '../../../Config';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import { PrimaryButton } from '../../../../assets/Buttons';

const CommentsBox = styled.div`
    width: 80%;
    background: white;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,.05);
`;

const CommentForm = styled.form`
    display: flex;
    padding: .9em;
`;

const TextArea = styled.textarea`
    flex-grow: 1;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    outline: none;
    padding: 0.9em;

    &:focus{
        border: 1px solid #ec407a;
    }
`;

const ReplyBox = styled.div`
    padding: 0 0.9em 0.9em;
`;

function Comments({commentList, postId, refreshFunction}) {
    const user = useSelector(state => state.user);
    const [commentValue, setCommentValue] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        
        if(!user.userData.isAuth){
            alert('로그인이 필요합니다.');
            return;
        }
        if(!commentValue){
            alert('내용을 작성해주세요.');
            return;
        }

        const data = {
            content: commentValue,
            writer: user.userData._id,
            postId: postId,
        };
        axios.post(`${COMMENT_SERVER}/comment`, data)
            .then(response => {
                if(response.data.success){
                    refreshFunction(response.data.result);
                    setCommentValue('');
                }
                else alert('Failed to save comment');
            })
    };

    return (
        <CommentsBox>
            <p style={{padding: '0.9em 0.9em 0'}}>{commentList.length} Replies</p>
            <CommentForm onSubmit={onSubmit}>
                <TextArea placeholder="댓글을 작성해주세요." value={commentValue} onChange={e => setCommentValue(e.target.value)} maxLength="1000"/>
                <PrimaryButton type="submit" width="5em">Submit</PrimaryButton>
            </CommentForm>

            {/* Comment list */}
            {commentList && commentList.map((comment, index) => (
                (!comment.responseTo &&
                    <ReplyBox key={index}>
                        <SingleComment  postId={postId} comment={comment} refreshFunction={refreshFunction}/>
                        <ReplyComment parentCommentId={comment._id} commentList={commentList} postId={postId} refreshFunction={refreshFunction}/>
                    </ReplyBox>
                )  
            ))}
        </CommentsBox>
    );
}

export default Comments;