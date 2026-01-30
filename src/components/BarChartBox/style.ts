import styled from "styled-components";

interface ILegendProps {
    color: string,
}

export const Container = styled.div`
    width: 48%;
    min-height: 260px;
    margin: 10px 0;
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    border-radius: 7px;
    display: flex;

    @media(max-width: 1024px) {
        width: 100%;
        height: auto;
        flex-direction: column;
    }
`;

export const SideLeft = styled.aside`
    padding: 30px 20px;
    padding-left: 16px;
    flex: 1;


    > h2 {
        margin-bottom: 10px;
        padding-left: 16px;

        @media(max-width: 768px) {
            font-size: 1.2rem;
            padding-left: 0;
        }

        @media(max-width: 480px) {
            font-size: 1rem;
        }
    }

    @media(max-width: 1024px) {
        padding: 20px 15px;
    }
    `;

export const SideRight = styled.main`
    
    flex: 1;
    display: flex;
    justify-content: center;
    min-height: 150px;
    padding-top: 35px;

    @media(max-width: 1024px) {
        padding: 20px 15px;
        min-height: 250px;
    }
`;

export const LegendContainer = styled.ul`
    list-style: none;
    max-height: 175px;
    padding-right: 15px;
    overflow-y: scroll;
`;

export const Legend = styled.li<ILegendProps>`
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    padding-left: 16px;

    @media(max-width: 768px) {
        padding-left: 0;
    }
    

    >div{
        background-color: ${props => props.color};
        width: 40px;
        height:40px;
        border-radius: 5px;
        font-size: 14px;
        line-height: 40px;
        text-align: center;

    }

    >span{
        margin-left: 5px;
    }
`;