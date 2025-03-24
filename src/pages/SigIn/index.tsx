import React, { useState } from 'react'
import { Container, Logo, Form, FormTitle } from './style';
import logoImg from '../../assets/logo.svg'

const SignIn = () => {
    const [selectedFrequency, setSelectedFrequency] = useState(['recorrente', 'eventual']);

    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Logo" />
                <h2>Minha - Carteira</h2>    
                <span>Realize o seu Login</span>
            </Logo>

            <Form>
                <FormTitle>
                    <h1>Entrar</h1>
                </FormTitle>

                <input type="text" placeholder="Usuário" />
                <input type="password" placeholder="Senha" />
                
                <button
                    type="button"
                >
                    Entrar
                </button>
            </Form>
        </Container>
    )
}

export default SignIn;