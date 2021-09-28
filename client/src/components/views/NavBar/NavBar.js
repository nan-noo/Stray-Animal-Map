import React, {useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import styled, {css} from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import {FiMenu} from 'react-icons/fi';

import { LineButton, DrawerButton } from '../../assets/Buttons';
import {USER_SERVER} from '../../Config';

const NavBox = styled.nav`
    width: 100%;
    z-index: 5;

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

const Drawer = styled.div`
    z-index: 10;
    display: none;
    height: 100vh;

    background: rgba(255, 255, 255, .9);
    font-size: 1.5em;
    border-left: 1px solid #e8e8e8;
    box-shadow: 0 0 5px #f3f1f1;

    @media only screen and (max-width: 48rem) {
        display: flex;
        flex-direction: column;
        align-items: center;

        position: absolute;
        top: 2.5em;
        right: 0;

        padding: 1em 0;
        max-width: 0;
        opacity: 0;

        ${LineButton}{
            display: none;
        }
        transition: max-width 0.3s, opacity 0.3s, padding 0.2s;

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

                transition: max-width 0.3s, opacity 0.3s, padding 0.3s;

                ${LineButton}{
                    display: initial;
                }
            `
        }
    }
`;

function NavBar() {
    const [open, setOpen] = useState(true);
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
                    <LineButton>MAP</LineButton>
                </Link>
                <Link to="/"
                    style={{color: 'black'}}
                >
                    <LineButton>COMMUNITY</LineButton>
                </Link>
            </MenuBar>

            {/* login&register/logout */}
            <SubMenuBar>
                {user.userData && !user.userData.isAuth
                    ? <>
                        <Link to="/login"
                            style={{color: 'black'}}
                        >
                            <LineButton>Sign In</LineButton>
                        </Link>
                        <Link to="/register"
                            style={{color: 'black'}}
                        >
                            <LineButton>Sign Up</LineButton>
                        </Link>
                    </>
                    : <div>
                        <LineButton onClick={logoutHandler}>Log Out</LineButton>
                    </div>
                }
            </SubMenuBar>
            
            {/* drawer */}
            <DrawerButton onClick={() => setOpen(!open)}><FiMenu/></DrawerButton>
            <Drawer open={open}>
                <Link to="/"
                    style={{color: 'black', width: '100%'}}
                >
                    <LineButton>MAP</LineButton>
                </Link>
                <Link to="/"
                    style={{color: 'black', width: '100%'}}
                >
                    <LineButton>COMMUNITY</LineButton>
                </Link>
                {user.userData && !user.userData.isAuth
                    ? <>
                        <Link to="/login"
                            style={{color: 'black', width: '100%'}}
                        >
                            <LineButton>Sign In</LineButton>
                        </Link>
                        <Link to="/register"
                            style={{color: 'black', width: '100%'}}
                        >
                            <LineButton>Sign Up</LineButton>
                        </Link>
                    </>
                    : <div style={{width: '100%'}}>
                        <LineButton onClick={logoutHandler}>Log Out</LineButton>
                    </div>
                }
            </Drawer>
        </NavBox>
    )
}

export default NavBar;
