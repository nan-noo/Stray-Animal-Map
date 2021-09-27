import React, {useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import styled, {css} from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import {FiMenu} from 'react-icons/fi';
import {USER_SERVER} from '../../Config';

const NavBox = styled.nav`
    width: 100%;

    display: flex;
    position: relative;

    box-shadow: 0 0 30px #f3f1f1;
    border-bottom: 1px solid #e8e8e8
`;

const LogoBox = styled.div`
    padding: 0.5em 1em;

    text-align: center;

    @media only screen and (max-width: 48rem) {
        margin: auto;
    }
`;

const MenuBar = styled.div`
    display: flex;
    margin: 0 auto;
    justify-content: space-evenly;

    @media only screen and (max-width: 48rem) {
        display: none;
    }
`;

const SubMenuBar = styled.div`
    display: flex;
    justify-content: space-between;

    margin-right: 1em;

    @media only screen and (max-width: 48rem) {
        display: none;
    }
`;

const Button = styled.button`
    width: 100%;
    height: 100%;

    background: white;
    border: none;
    outline: none;
    font-size: 0.8rem;
    font-weight: 500;
    text-align: center;
    padding: 0.8em 1.5em;
    cursor: pointer;

    &:hover{
        color: #ec407a;
        border-bottom: 1px solid #ec407a;
    }
    &:active{
        background: rgba(0,0,0, .03);
    }
`;

const DrawerButton = styled.button`
    display: none;
    @media only screen and (max-width: 48rem) {
        display: inline-box;

        text-align: center;
        font-size: 0.8rem;
        font-weight: 500;
        border: none;
        outline: none;
        background: white;
        cursor: pointer;

        padding: 0.8em 1.3em;

        &:hover{
            color: #ec407a;
        }
        
    }
`;

const Drawer = styled.div`
    z-index: 5;

    display: none;

    height: 100vh;
    padding: 1em;

    background: rgba(255, 255, 255, .7);
    font-size: 1.5em;
    border-left: 1px solid #e8e8e8;
    box-shadow: 0 0 10px #f3f1f1;

    @media only screen and (max-width: 48rem) {
        display: flex;
        flex-direction: column;
        
        align-items: center;

        position: absolute;
        top: 2.5em;
        right: 0;

        max-width: 0;
        opacity: 0;
        transition: max-width 0.5s, opacity 0.4s;

        ${props => 
            props.open &&
            css`
                max-width: 100%;
                opacity: 1;
                height: 100vh;
                padding: 1em;

                background: rgba(255, 255, 255, .7);
                font-size: 1.5em;
                border-left: 1px solid #e8e8e8;
                box-shadow: 0 0 10px #f3f1f1;

                transition: max-width 0.5s, opacity 0.4s;
            `
        }
    }
`;

function NavBar() {
    const [open, setOpen] = useState(false);
    const user = useSelector(state => state.user)
    const history = useHistory();

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                history.push("/login");
            } else {
                alert('Log Out Failed')
            }
        });
    };

    return (
        <NavBox>
            {/* Logo */}
            <LogoBox>
                <Link to="/" 
                    style={{textAlign: 'center', fontSize: '1.5rem', padding: '0.5em 1em', color: '#ec407a'}}
                >Logo</Link>
            </LogoBox>
           
            {/* menu bar */}
            <MenuBar>
                <Link to="/"
                    style={{color: 'black', width: '100%'}}
                >
                    <Button>MAP</Button>
                </Link>
                <Link
                    style={{color: 'black'}}
                >
                    <Button>COMMUNITY</Button>
                </Link>
            </MenuBar>

            {/* login&register/logout */}
            <SubMenuBar>
                {user.userData && !user.userData.isAuth
                    ? <>
                        <Link to="/login"
                            style={{color: 'black'}}
                        >
                            <Button>Sign In</Button>
                        </Link>
                        <Link to="/register"
                            style={{color: 'black'}}
                        >
                            <Button>Sign Up</Button>
                        </Link>
                    </>
                    : <div>
                        <Button onClick={logoutHandler}>Log Out</Button>
                    </div>
                }
            </SubMenuBar>
            
            {/* drawer */}
            <DrawerButton onClick={() => setOpen(!open)}><FiMenu/></DrawerButton>
            <Drawer open={open}>
                <Link to="/"
                    style={{color: 'black', width: '100%'}}
                >
                    <Button>MAP</Button>
                </Link>
                <Link to="/"
                    style={{color: 'black', width: '100%'}}
                >
                    <Button>COMMUNITY</Button>
                </Link>
                {user.userData && !user.userData.isAuth
                    ? <>
                        <Link to="/login"
                            style={{color: 'black', width: '100%'}}
                        >
                            <Button>Sign In</Button>
                        </Link>
                        <Link to="/register"
                            style={{color: 'black', width: '100%'}}
                        >
                            <Button>Sign Up</Button>
                        </Link>
                    </>
                    : <div style={{width: '100%'}}>
                        <Button onClick={logoutHandler}>Log Out</Button>
                    </div>
                }
            </Drawer>
        </NavBox>
    )
}

export default NavBar;
