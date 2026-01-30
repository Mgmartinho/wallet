import React, { useState } from "react";
import { Grid } from "./style";
import MainHeader from "../MainHeader";
import Content from "../Content";
import Aside from "../Aside";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const handleToggleMenu = () => {
        setMenuIsOpen(!menuIsOpen);
    };

    return (

        <Grid>
            <Aside menuIsOpen={menuIsOpen} onCloseMenu={() => setMenuIsOpen(false)} />
            <MainHeader onToggleMenu={handleToggleMenu} />
            <Content>
                {children}
            </Content>
        </Grid>

    );

};

export default Layout;