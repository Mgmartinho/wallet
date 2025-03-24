import React from "react";

import ReactSwitch from "react-switch";
import { Route, Routes, BrowserRouter,  } from "react-router-dom";

import SignIn from "../pages/SigIn";

const AuthRoutes: React.FC = () => (
    <Routes>
            <Route path="/" Component={SignIn}/>
    </Routes>
);

export default AuthRoutes;