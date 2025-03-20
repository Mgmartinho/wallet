import React from "react";
import { Grid } from "./style";
import MainHeader from "../MainHeader";
import Content from "../Content";
import Aside from "../Aside";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (

        <Grid>
            <Aside />         {/* Agora o Aside fica primeiro */}
            <MainHeader />    {/* O MainHeader fica depois */}
            <Content>
                {children}
            </Content>       {/* E o Content vai por último */}
        </Grid>

    );

};

export default Layout;