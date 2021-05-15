import styled from "styled-components"
import Header from "../Header"
import NumPicker from "./NumPicker"
import React from 'react';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
   
`
const Body = styled.div`
    flex: 1;
    padding: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    
`

const Settingg = () => { 
    return (
        <Container>
            <Header text={'Điều chỉnh công suất'}/>
            <Body>
                <NumPicker value='50' />
            </Body>
        </Container>
    )
}

export default Settingg