import styled from "styled-components"
import Header from "./Header"
import PowerTag from "./PowerTag"
import HumidChart from './HumidChart'
import ButtonGroup from './ButtonGroup'
import axios from "axios"
import { useState, useEffect } from 'react'
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`
const Body = styled.div`
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const Dashboard = () => {
    const [status, setStatus] = useState(true);    
    
    async function getStatus() {
        await axios("/api/power")
            .then((response) => {
                setStatus(response.data.power);
            })
            .catch((error) => {
                console.error("Error fetching power: ", error);
            });
    }
    useEffect(() => {
        getStatus()
    }, []); 
    return (
        <Container>
            <Header/>
            <Body>
                <PowerTag status={status} />
                <HumidChart/>
                <ButtonGroup/>
            </Body>
        </Container>
    )
}

export default Dashboard