import styled from "styled-components"
import {Router} from '@reach/router'
import Dashboard from "./Dashboard"
import History from "./History"
import Humid from './Humid'
import Mode from './Mode'
import Power from './Power'
import Watering from './Watering'
import Settingg from './Settingg'


const Container = styled.div`
    width: 100%;
    max-width: 400px;
    background: ${props => props.theme.color.background.primary};
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
                <History path="/history"/>
                <Humid path="humid"/>
                <Mode path="/mode" />
                <Power path="/power" />
                <Watering path="/manual-watering" />
                <Settingg path="/setting" />
            </Router>
        </Container>
    )
}

export default MainPage