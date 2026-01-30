import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.colors.primary};
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    > h2 {
        color: ${props => props.theme.colors.white};
        margin-left: 7px;

        @media(max-width: 480px) {
            font-size: 1.3rem;
        }
    }

    > img {
        width: 50px;
        height: 50px;

        @media(max-width: 480px) {
            width: 40px;
            height: 40px;
        }
    }
`;

export const Form = styled.form`
    width: 300px;
    height: 300px;
    padding: 30px;
    border-radius: 10px;
    background-color: ${props => props.theme.colors.tertiary};
    box-shadow: 0px 0px 10px ${props => props.theme.colors.warning};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    @media(max-width: 480px) {
        width: 90%;
        max-width: 280px;
        padding: 20px;
        height: auto;
        min-height: 280px;
    }
`;

export const FormTitle = styled.h1`
    color: ${props => props.theme.colors.white};

    @media(max-width: 480px) {
        font-size: 1.5rem;
    }

    &:after {
        content: '';
        display: block;
        width: 55px;
        border-bottom: 10px solid ${props => props.theme.colors.warning};
    }
`;
