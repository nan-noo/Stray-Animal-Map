import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import axios from '../../../axios';
import { FaDog } from 'react-icons/fa';

import { POST_SERVER } from '../../Config';
import Comments from './Sections/Comments';

const PostBox = styled.div`
    display: flex;
    flex-direction: column;

    width: 80%;
    height: 60%;
    margint: 3em 0;
    padding: 1em 2em;

    background: white;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,.05);
`;

const BoxHeader = styled.div`
    display: flex;
    width: 100%;
    
    padding: 0.9em;

    border-bottom: 1px solid #eeeeee;
`;

const Image = styled.img`
    width: 50%;
    height: 100%;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-grow: 1;

    padding: 0.9em;
`;

const BoxBody = styled.p`
    width: 100%;
    height: auto;
    padding: 0.9em;
    font-size: 1rem;
    flex-grow: 1;
    overflow: auto;
`;

function PostDetail() {
    const [post, setPost] = useState(null);
    const [CommentList, setCommentList] = useState([]);
    const params = useParams();

    useEffect(() => {
        axios.post(`${POST_SERVER}/getPost`, {postId: params.postId})
            .then(response => {
                response.data.success ? setPost(response.data.post) : alert('Failed to get post');
            })

    }, [params]);

    const updateComment = newComment => {
        setCommentList(CommentList.concat(newComment));
    };

    return (
        <div className="app"
            style={{
                background: '#f5f5f5',
                justifyContent: 'space-around'
            }}
        >
            {post && 
                <>  
                    {/* POST DETAIL */}
                    <PostBox>
                        <BoxHeader>
                            {post.img 
                                ? <Image src={post.img}/>
                                : <FaDog style={{width: '20%', height: '100%', padding: '0.9em'}}/>
                            }
                            <TextBox>
                                <h2>{post.title}</h2>
                                <p>{post.location}</p>
                            </TextBox>
                        </BoxHeader>
                        <BoxBody>{post.content}</BoxBody>
                    </PostBox>

                    {/* COMMENTS */}
                    <Comments postId={post.id} commentList={CommentList} refreshFunction={updateComment}/>
                </>
            }
        </div>
    );
}

export default PostDetail;
