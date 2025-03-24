import React from "react";
import { Container, Header, LogImg, MenuContainer, MenuItemLink, Title,MenuItemButton } from './styles'
import logImg from '../../assets/logo.svg'
import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp,
} from 'react-icons/md';

import { useAuth } from "../../hooks/auth";

const Aside: React.FC = () => {
    const handleLogout = () => {
        console.log("Usuário saiu"); // Substitua pela lógica de logout real
    };

    const { signOut } = useAuth();

    return (
        <Container>
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
    );
}

export default Aside;
