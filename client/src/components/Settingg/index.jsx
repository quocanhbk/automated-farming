import styled from "styled-components"
import Header from "../Header"
import NumPicker from "./NumPicker"
import React from 'react';
import Redirector from '../Redirector'
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
        <Redirector>
            <Container>
                <Header text={'Điều chỉnh công suất'}/>
                <Body>
                    <NumPicker value='50' />
                </Body>
            </Container>
        </Redirector>
    )
}

export default Settingg