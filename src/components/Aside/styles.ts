import styled from "styled-components";
import { Link } from "react-router-dom";

interface IContainerProps {
    menuIsOpen: boolean;
}

interface IOverlayProps {
    isVisible: boolean;
}

//ASIDE
export const Container = styled.div<IContainerProps>`
     grid-area: AS;
     background-color: ${props => props.theme.colors.secondary};
     padding-left: 20px;
     border-right: 1px solid ${props => props.theme.colors.gray};

     @media(max-width: 768px) {
          position: fixed;
          z-index: 2;
          width: 250px;
          height: 100vh;
          left: ${props => props.menuIsOpen ? '0' : '-250px'};
          transition: left 0.3s ease-in-out;
     }
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

export const MenuItemButton = styled.button`
     color: ${props => props.theme.colors.white};
     font-size: 16px;
     transition: opacity .3s;
     margin: 7px 0; // Adiciona um pequeno padding para melhor alinhamento
     display: flex;  // Adiciona flex para alinhamento adequado
     align-items: center;  // Alinha o ícone e o texto verticalmente
     justify-content: flex-start;  // Garante que o conteúdo comece à esquerda
     border: none;
     background: none;

     &:hover{
          opacity: .7;
     }

     >svg{
          font-size:18px;
          margin-right: 5px;
     }
`;

export const Overlay = styled.div<IOverlayProps>`
     display: none;

     @media(max-width: 768px) {
          display: ${props => props.isVisible ? 'block' : 'none'};
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1;
     }
`;

export const CloseMenuButton = styled.button`
     display: none;

     @media(max-width: 768px) {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: 10px;
          top: 20px;
          background: none;
          border: none;
          color: ${props => props.theme.colors.white};
          font-size: 24px;
          cursor: pointer;
          transition: opacity 0.3s;

          &:hover {
               opacity: 0.7;
          }
     }
`;
