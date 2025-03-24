import React, { use, useState } from 'react'
import { Container, Logo, Form, FormTitle } from './style';
import logoImg from '../../assets/logo.svg'
import Input from '../../components/input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

const SignIn = () => {
    
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');

    const { signIn} = useAuth();

    

    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Logo" />
                <h2>Minha - Carteira</h2>    
            </Logo>

            <Form onSubmit={() => signIn(email, password) }>
                <FormTitle>
                    <h1>Entrar</h1>
                </FormTitle>

                <Input type="email" placeholder="Email de Usuário" onChange={(e) => setEmail(e.target.value)} required/>
                <Input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} required/>
                
                <Button
                    type="submit"
                >
                    Acessar
                </Button>
            </Form>
        </Container>
    )
}

export default SignIn;