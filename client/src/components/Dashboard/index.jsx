import styled from "styled-components"
import Header from "./Header"
import PowerTag from "./PowerTag"
import HumidChart from './HumidChart'
import ButtonGroup from './ButtonGroup'
import { useStoreState } from "easy-peasy"
import Login from '../Login'
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
    let username = useStoreState(state => state.username)
    return (
        username === null ? <Login/> :
        <Container>
            <Header/>
            <Body>
                <PowerTag status="on"/>
                <HumidChart/>
                <ButtonGroup/>
            </Body>
        </Container>
    )
}

export default Dashboard