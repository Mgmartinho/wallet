import styled from "styled-components";

export const Container = styled.input`
    width:100%;
    margin: 7px 0;
    padding: 10px;
    border-radius: 5px;

    @media(max-width: 480px) {
        padding: 8px;
        font-size: 14px;
    }
`;