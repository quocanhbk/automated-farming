import styled from "styled-components"
import Header from "./Header"
import PowerTag from "./PowerTag"
import HumidChart from './HumidChart'
import ButtonGroup from './ButtonGroup'

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
    return (
        <Container>
            <Header/>
            <Body>
                <PowerTag status="offf"/>
                <HumidChart/>
                <ButtonGroup/>
            </Body>
        </Container>
    )
}

export default Dashboard