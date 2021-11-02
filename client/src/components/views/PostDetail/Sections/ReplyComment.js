import React, {useEffect, useState} from 'react';
import SingleComment from './SingleComment';

function ReplyComment({commentList, parentCommentId, postId, refreshFunction}) {
    const [childCommentNum, setChildCommentNum] = useState(0);
    const [openReplyComment, setOpenReplyComment] = useState(false);

    useEffect(() => {
        let commentNum = 0;
        commentList.map((comment) => {
            if(comment.responseTo === parentCommentId){
                commentNum++;
            }
        })

        setChildCommentNum(commentNum);
    }, [commentList, parentCommentId]);

    const renderReplyComment = _parentCommentId => (
        commentList.map((comment, index) => (
            <React.Fragment key={index}>
                {comment.responseTo === _parentCommentId &&
                    <div style={{width: '80%', marginLeft: '40px'}}>
                        <SingleComment postId={postId} comment={comment} refreshFunction={refreshFunction}/>
                        <ReplyComment parentCommentId={comment._id} commentList={commentList} postId={postId} refreshFunction={refreshFunction}/>
                    </div>
                }        
            </React.Fragment>
        ))
    );

    return (
        <div>
            {childCommentNum > 0 && 
                <p style={{fontSize: '14px', margin: 0, color: 'gray'}}
                onClick={() => setOpenReplyComment(!openReplyComment)}
                >
                    View {childCommentNum} more comment(s)
                </p>
            }
            {openReplyComment &&
                renderReplyComment(parentCommentId)
            }
        </div>
    );
}

export default ReplyComment;