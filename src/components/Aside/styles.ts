import styled from "styled-components";
import { Link } from "react-router-dom";
//ASIDE
export const Container = styled.div`
     grid-area: AS;
     background-color: ${props => props.theme.colors.secondary};
     padding-left: 20px;
     border-right: 1px solid ${props => props.theme.colors.gray};

`;

export const Header = styled.div`
display:flex;
align-items: center;
height: 70px

`;

export const LogImg = styled.img`
     height:40px;
     width: 40px;
`;

export const Title = styled.h3`
     color: ${props => props.theme.colors.white};
     margin-left: 10px;
`;


export const MenuContainer = styled.div`
     margin-top: 50px;
     flex-direction: column;
     display: flex;

`;

export const MenuItemLink = styled(Link)`
color: ${(props: { theme: { colors: { white: any; }; }; }) => props.theme.colors.white};
text-decoration: none;
transition: opacity .3s;
margin: 7px 0;
align-items: center;

&:hover{
     opacity: .7;
}

>svg{
     font-size:18px;
     margin-right: 5px;
}

`;

