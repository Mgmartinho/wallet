import styled from "styled-components";

interface ITitleContainerProps{
    lineColor: string;
};


export const Container = styled.div`
width:100%;
display:flex;
justify-content: space-between;
margin-bottom:25px;
flex-wrap: wrap;
gap: 15px;

@media(max-width: 768px) {
    flex-direction: column;
    margin-bottom: 15px;
}
`;


export const TitleContainer = styled.div<ITitleContainerProps>`
>h1{
        color: ${props => props.theme.colors.white};

    @media(max-width: 768px) {
        font-size: 24px;
    }

    @media(max-width: 480px) {
        font-size: 20px;
    }

    &::after{
        content: "";
        display:block;
        width: 55px;
        border-bottom: 10px solid ${props => props.lineColor}
    }

};

`;


export const Controllers = styled.div`
display: flex;
flex-wrap: wrap;
gap: 10px;

button{
    margin: 0;
}

@media(max-width: 768px) {
    width: 100%;
    justify-content: space-around;
}
`;