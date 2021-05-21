import styled from "styled-components"
import {Router} from '@reach/router'
import Dashboard from "./Dashboard"
import History from "./History"
import Humid from './Humid'
import Mode from './Mode'
import Power from './Power'
import Watering from './Watering'
import Settingg from './Settingg'
import Login from "./Login"


const Container = styled.div`
    width: 24rem;
    background: ${props => props.theme.color.background.primary};
    border: 1px solid white;
    height: 100%;

    & .router-div {
        height: 100%;
    }
`

const MainPage = () => {    
    return (
        <Container>
            <Router className="router-div">
                <Dashboard path="/" />
                <History path="/history" />
                <Humid path="/humid" />
                <Mode path="/mode" />
                <Power path="/power" />
                <Watering path="/manual-watering" />
                <Settingg path="/setting" />
                <Login path="/login" />
            </Router>
        </Container>
    )
}

export default MainPage