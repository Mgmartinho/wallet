//ROUTES

import React from 'react'
// import App from './app.routes'
import { BrowserRouter } from 'react-router-dom'
import Auth from './auth.routes'


const Routes: React.FC = () => (
    <BrowserRouter>
        <Auth/>
    </BrowserRouter>

)


export default Routes;