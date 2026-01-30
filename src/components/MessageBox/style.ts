import styled from "styled-components";

export const Container = styled.div`
    width: 48%;
    height: 260px;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    border-radius: 7px;

    margin: 10px 0;
    padding: 30px 20px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media(max-width: 1024px) {
        width: 100%;
        height: auto;
        min-height: 200px;
    }

    @media(max-width: 768px) {
        padding: 20px 15px;
    }

    > header img{
        width: 35px;
        margin-left: 7px;

    }

    > header p{
        font-size: 18px;
        
    }

    
`;