import styled from "styled-components"
import Header from "../Header"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getFader } from '../../utils/color'
import BigToggle from '../BigToggle'
import Loader from '../Loader'
import {FaReact} from 'react-icons/fa'
import Snackbar from '../Snackbar'
import { BsCheckCircle } from "react-icons/bs"
import { useStoreActions, useStoreState } from "easy-peasy"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: ${props => getFader(props.theme.color.fill.primary, 0.2)};
`
const Body = styled.div`
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`
const Text = styled.p`
    color: ${props => props.mode ? props.theme.color.fill.success : props.theme.color.fill.danger};
    font-weight: 600;
    padding: 0.5rem;
`
const Wrapper = styled.div`
    display: flex;  
    flex-direction: column;    
    border-radius: 0.5rem;
    width: 80%;
    gap: 1rem;
    border: 1px solid ${props => props.theme.color.fill.primary};
    background: ${props => props.theme.color.background.primary};
    align-items: center;
    position: relative;
    overflow: hidden;
`
const Notify = styled.div`
    padding: 1rem;
    background: ${props => props.theme.color.fill.success};
    color: ${props => props.theme.color.background.primary};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
`
const ToggleContainer = styled.div`
    padding-bottom: 0.5rem;
`

const Mode = () => {
    const [loading, setLoading] = useState(true)
    const [notify, setNotify] = useState(false)
    const [postLoading, setPostLoading] = useState(false)
    let power = useStoreState(state => state.power)
    let setPower = useStoreActions(state => state.setPower)
    const  postData = async () => {
        if (!postLoading) {
            setPostLoading(true)
            setPower(!power)
            await axios.post('/api/power')
            setNotify(true)
            setPostLoading(false)
        }
    }

    const getData = async () => {        
        try {
            const res = await axios.get("/api/power");
            setPower(res.data.power === "on")
        } catch (error) {
            setPower(false)
        }
        setTimeout(() => setLoading(false), 400) 
    }
    useEffect(() => {
        getData();
    }, []);
    
    return (
        <Container>
            <Header text={'Bật/tắt hệ thống'} />
                <Body>
                    <Wrapper>
                        {loading && <Loader><FaReact size="4rem"/></Loader>}
                        <Text mode={power}>
                            Hệ thống đang 
                            {power ? " bật" : " tắt"}
                        </Text>
                        <ToggleContainer>
                            <BigToggle value={power} onChange={() => postData()}/>
                        </ToggleContainer>
                    </Wrapper>
                </Body>
                <Snackbar visible={notify} onClose={() => setNotify(false)} timeOut={1500}>
                    <Notify>
                        <BsCheckCircle size="1.2rem"/>
                        <p>{power ? "Bật " : "Tắt "} hệ thống thành công !</p>
                    </Notify>
                </Snackbar>
            </Container>
    )
}

export default Mode