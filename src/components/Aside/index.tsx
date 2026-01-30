import React from "react";
import { Container, Header, LogImg, MenuContainer, MenuItemLink, Title, MenuItemButton, CloseMenuButton, Overlay } from './styles'
import logImg from '../../assets/logo.svg'
import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp,
    MdClose,
} from 'react-icons/md';

import { useAuth } from "../../hooks/auth";

interface AsideProps {
    menuIsOpen: boolean;
    onCloseMenu: () => void;
}

const Aside: React.FC<AsideProps> = ({ menuIsOpen, onCloseMenu }) => {
    const { signOut } = useAuth();

    return (
        <>
            <Overlay isVisible={menuIsOpen} onClick={onCloseMenu} />
            <Container menuIsOpen={menuIsOpen}>
            <Header>
                <LogImg src={logImg} alt="Logo Minha Carteira" />
                <Title>Minha-Carteira</Title>
            </Header>
            <MenuContainer>
                <MenuItemLink to="/">
                    <MdDashboard size={18} />
                    Dashboard
                </MenuItemLink>
                <MenuItemLink to="/list/entry-balance">
                    <MdArrowUpward size={18} />
                    Entradas
                </MenuItemLink>
                <MenuItemLink to="/list/exit-balance">
                    <MdArrowDownward size={18} />
                    Saídas
                </MenuItemLink>
                <MenuItemButton  onClick={signOut}>
                    <MdExitToApp size={18} />
                    Sair
                </MenuItemButton>
            </MenuContainer>
        </Container>
        </>
    );
}

export default Aside;
