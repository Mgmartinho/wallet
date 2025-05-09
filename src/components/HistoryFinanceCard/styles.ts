//HistoryFinanceCard
import styled from "styled-components";


interface ITagProps{
    color: string;
}
export const Container = styled.li`
    background-color: ${props => props.theme.colors.tertiary};
    list-style: none;
    border-radius: 10px;
    margin: 10px 0;
    padding: 12px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all .3s;
    &:hover{
        opacity: 0.7;
        transform: translateX(10px);
    }

    position: relative;

    > div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 10px;
    }

    > div span{
        font-weight: bold;
        font-size: 22px;
    }
`;


export const Tag = styled.div<ITagProps>`

    position: absolute;
    width: 10px;
    height: 60%;

    background-color: ${props => props.color};
    left: 0;

`;