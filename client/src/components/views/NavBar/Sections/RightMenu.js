import React from 'react';
import {Menu} from 'antd';
import {withRouter, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { logoutUser } from '../../../../_actions/user_actions';

function RightMenu(props) {
    const user = useSelector(state => state.user); // a hook to access redux store's state // 여기선 root의 user에 access
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logoutUser())
            .then(response => {
                if(response.payload.logoutSuccess){
                    props.history.push("/login");
                }
                else{
                    alert('Failed to log out');
                }
            })
    }

    return (
        <>
         {user.userData && !user.userData.isAuth
            ? <Menu mode={props.mode}>
                <Menu.Item key="login">
                    <Link to="/login">Sign in</Link>
                </Menu.Item>
                <Menu.Item key="register">
                    <Link to="/register">Sign up</Link>
                </Menu.Item>
            </Menu>
            : <Menu mode={props.mode}>
                <Menu.Item key="logout">
                    <Link onClick={logoutHandler}>Log out</Link>
                </Menu.Item>
            </Menu>
         }
        </>
    );   
}

export default withRouter(RightMenu);
