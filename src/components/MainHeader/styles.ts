import styled from "styled-components";

//MAINHEADER
export const Container = styled.div`
   grid-area: MH;
   background-color: ${props => props.theme.colors.secondary};

   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 10px;   
   border-bottom: 1px solid ${props => props.theme.colors.gray};

   @media(max-width: 768px) {
      padding: 0 15px;
   }
`;

export const MenuButton = styled.button`
   display: none;
   background: none;
   border: none;
   color: ${props => props.theme.colors.white};
   font-size: 24px;
   cursor: pointer;
   transition: opacity 0.3s;

   &:hover {
      opacity: 0.7;
   }

   @media(max-width: 768px) {
      display: flex;
      align-items: center;
   }
`;

export const Profile = styled.div`
   color: ${props => props.theme.colors.white}

`;

export const Welcome = styled.h3`
   @media(max-width: 768px) {
      font-size: 16px;
   }

   @media(max-width: 480px) {
      font-size: 14px;
   }
`;

export const UserName = styled.span`
   @media(max-width: 768px) {
      font-size: 14px;
   }

   @media(max-width: 480px) {
      font-size: 12px;
   }
`;