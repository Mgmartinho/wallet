import React,{useMemo}from "react";
import { Container, UserName, Welcome, Profile } from './styles'
import emojis from "../../utils/emojis";
import Toggle from "../Toggle";
const MainHeader: React.FC = () => {

       const emoji = useMemo(() =>{
            const indice = Math.floor(Math.random()* emojis.length);
            return emojis[indice];
        },[]);
    
    return (


        <Container>
            <Toggle />


            <Profile>
                <Welcome>Olá, {emoji} </Welcome>
                <UserName>Marcelo Martinho</UserName>
            </Profile>
        </Container>

    );

};

export default MainHeader;