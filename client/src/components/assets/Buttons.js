import styled from "styled-components";

export const PrimaryButton = styled.button`
    width: ${props => props.width};

    background: #ec407a;
    color: white;

    border: none;
    border-radius: 5px;
    outline: none;

    &:hover{
        background: #ff77a9
    }
    &:active{
        background: #ec407a;
    }
    transition: 0.125s all ease-in;
`;

export const SecondaryButton = styled.button`
    height: 100%;

    padding: 0.2em 0.9em;

    background: white;
    border-radius: 10px;
    border: none;
    outline: none;

    &:hover{
        color: #ec407a;
        border: 1px solid #ec407a;
    }
    &:active{
        color: white;
        background: #ec407a;
    }
    transition: 0.125s all ease-in;
`;

export const LinkButton = styled.button`
    background: white;
    color: #ec407a;

    border: none;
    outline: none;
    cursor: pointer;

    &:hover{
        color: #ff77a9
    }
    &:active{
        color: #ec407a;
    }
    transition: 0.125s all ease-in;
`;

export const LineButton = styled.button`
    width: 100%;
    height: 100%;

    background: transparent;
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
    transition: 0.125s all ease-in;
`;

export const DrawerButton = styled.button`
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
        transition: 0.125s all ease-in;
    }
`;