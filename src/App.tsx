import React,{useMemo} from "react";
import GlobalStyles from "./styles/GlobalStyles";
import Layout from "./components/Layout";
import { ThemeProvider } from "styled-components";

import Dashboard from "./pages/Dashboard";
import List from "./pages/List";
import SignIn from "./pages/SigIn";

import Routes from "./Routes";

import { useTheme } from "./hooks/themes";

const App: React.FC = () => {
    const {theme} = useTheme();
 
    return (
        
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Routes />
            </ThemeProvider>
        
    );

};

export default App;