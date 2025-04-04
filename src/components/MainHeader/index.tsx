import React,{useMemo, useState}from "react";
import { Container, UserName, Welcome, Profile } from './styles'
import emojis from "../../utils/emojis";
import Toggle from "../Toggle";

import { useTheme } from "../../hooks/themes";



const MainHeader: React.FC = () => {

    const {toggleTheme,theme} = useTheme();
    const [darkTheme,setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

       const emoji = useMemo(() =>{
            const indice = Math.floor(Math.random()* emojis.length);
            return emojis[indice];
        },[]);

        const handleChangeTheme = () => {
            setDarkTheme(!darkTheme);
            toggleTheme();
        }
    
    return (
        <Container>
            <Toggle 
                labelLeft="light"
                labelRight="dark"
                checked={darkTheme}
                onChange={handleChangeTheme}
            />

            <Profile>
                <Welcome>Olá, {emoji} </Welcome>
                <UserName>Marcelo Martinho</UserName>
            </Profile>
        </Container>

    );

};

export default MainHeader;