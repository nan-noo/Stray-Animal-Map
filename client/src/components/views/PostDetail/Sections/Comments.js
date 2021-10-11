import React from 'react';
import styled from 'styled-components';

const CommentsBox = styled.div`
    width: 80%;
    background: white;
`;

function Comments() {
    return (
        <CommentsBox>
            comments
        </CommentsBox>
    )
}

export default Comments

// <div>
//             <br/>
//             <p>{commentList.length} Replies</p>
//             <hr/>
//             {/* Root Comment Form */}
//             <form style={{display: 'flex'}} onSubmit={onSubmit}>
//                 <TextArea
//                     style={{width: '100%', borderRadius: '5px'}}
//                     onChange={(event) => setCommentValue(event.currentTarget.value)}
//                     value={CommentValue}
//                     placeholder= 'write a comment'
//                 />
//                 <br/>
//                 <Button style={{width: '15%', height: '52px', marginLeft: '10px'}} onClick={onSubmit}>Submit</Button>
//             </form>

//             {/* Comments List */}
//             {commentList && commentList.map((comment, index) => (
//                 (!comment.responseTo &&
//                     <React.Fragment key={index}>
//                         <SingleComment  movieId={movieId} comment={comment} refreshFunction={props.refreshFunction}/>
//                         <ReplyComment parentCommentId={comment._id} commentList={commentList} movieId={movieId} refreshFunction={props.refreshFunction}/>
//                     </React.Fragment>
//                 )  
//             ))}
//         </div>