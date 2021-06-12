import styled from "styled-components"
import Header from "./Header"
import PowerTag from "./PowerTag"
import HumidChart from './HumidChart'
import ButtonGroup from './ButtonGroup'
import { useStoreActions, useStoreState } from "easy-peasy"
import Login from '../Login'
import { useEffect } from "react"
import axios from "axios"
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
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
    let power = useStoreState(state => state.power)
    let setPower = useStoreActions(state => state.setPower)
    useEffect(() => {
        const getData = async () => {        
            try {
                const res = await axios.get("/api/power");
                setPower(res.data.power === "on")
            } catch (error) {
                setPower(false)
            }
        }
        getData();
    }, [setPower]);
    return (
        username === null ? <Login/> :
        <Container>
            <Header/>
            <Body>
                <PowerTag status={power}/>
                <HumidChart/>
                <ButtonGroup/>
            </Body>
        </Container>
    )
}

export default Dashboard