import styled from "styled-components";

interface ILegendProps {
    color: string,
}

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    margin: 10px 0;
    padding: 20px; // antes: 0px 20px
    border-radius: 7px;
`;


export const ChartContainer = styled.div`
    flex: 1;
    min-height: 300px; // melhoria para garantir visualização
`;


export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    width: 100%;

    > h2 {
        margin: 20px 0;
        padding-left: 0;
        font-size: 1.5rem;
    }
`;


export const LegendContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding-right: 16px;
    flex-wrap: wrap; // para responsividade
`;

export const Legend = styled.li<ILegendProps>`
    display: flex;
    align-items: center;
    margin-bottom: 7px;

    > div {
        background-color: ${props => props.color};
        min-width: 40px;
        height: 40px;
        border-radius: 5px;
        font-size: 14px;
        line-height: 40px;
        text-align: center;
        color: white;
        font-weight: bold;
    }

    > span {
        margin-left: 5px;
    }
`;
