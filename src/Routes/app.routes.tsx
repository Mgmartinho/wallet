import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '../components/Layout'

// IMPORTAÇÃO DE ROTAS
import Dashboard from '../pages/Dashboard'
import List from '../pages/List'
import SignIn from '../pages/SigIn'
// Removed Switch import as it is replaced by Routes

const AppRoutes = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/list/:type" element={<List />} />
            </Routes>
        </Layout>
    )
}

export default AppRoutes;