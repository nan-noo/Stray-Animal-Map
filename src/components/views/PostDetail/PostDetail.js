import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import axios from '../../../axios';
import { useSelector } from 'react-redux';
import PinkFoot from '../../../assets/images/pink_foot.svg';
import BlueFoot from '../../../assets/images/blue_foot.svg';

import { COMMENT_SERVER, POST_SERVER } from '../../Config';
import Comments from './Sections/Comments';

const PostBox = styled.div`
    display: flex;
    flex-direction: column;

    width: 80%;
    height: 40em;
    margin-bottom: 0.9em;
    padding: 1em 2em;

    background: white;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,.05);
`;

const BoxHeader = styled.div`
    display: flex;
    width: 100%;
    height: 40%;
    
    padding: 0.9em;

    border-bottom: 1px solid #eeeeee;
`;

const Image = styled.img`
    width: 50%;
    height: 100%;
    object-fit: fill;

    border-radius: 5px;
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
    overflow-y: auto;
    word-break: break-all;
`;

function PostDetail() {
    const user = useSelector(state => state.user);
    const [post, setPost] = useState(null);
    const [commentList, setCommentList] = useState([]);
    const params = useParams();

    useEffect(() => {
        axios.get(`${POST_SERVER}/post/${params.postId}`)
            .then(response => {
                response.data.success ? setPost(response.data.post) : alert('Failed to get post');
            })

        axios.get(`${COMMENT_SERVER}/allComments/${params.postId}`)
            .then(response => {
                response.data.success ? setCommentList(response.data.result) : alert('Failed to get comments');
            });

    }, [params]);

    const updateComment = newComment => {
        setCommentList(commentList.concat(newComment));
    };

    return (
        <div className="app"
            style={{
                background: '#f5f5f5',
                justifyContent: 'space-around',
                padding: '0.9em',
            }}
        >
            {post && 
                <>  
                    {/* POST DETAIL */}
                    <PostBox>
                        <BoxHeader>
                            {
                            post.img 
                                ? <Image src={post.img}/>
                                : (post.type === 'found' ?  <Image src={PinkFoot}/> : <Image src={BlueFoot}/>)
                            }
                            <TextBox>
                                <h2>{post.title}</h2>
                                <p>위치: {post.location}</p>
                                <p>종류: {post.animal_type}</p>
                                {user?.userData?.isAuth && post.contact && <p>이메일 주소: {post.contact}</p>}
                            </TextBox>
                        </BoxHeader>
                        <BoxBody>{post.content}</BoxBody>
                    </PostBox>

                    {/* COMMENTS */}
                    <Comments postId={params.postId} commentList={commentList} refreshFunction={updateComment}/>
                </>
            }
        </div>
    );
}

export default PostDetail;
