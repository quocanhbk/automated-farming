/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components"
import Header from "../Header"
import React, { useState, useEffect } from 'react';
import { getFader } from "../../utils/color";
import socket from '../../socket'
import axios from "axios";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
   
`
const Body = styled.div`
    flex: 1;
    display: grid;
    place-items: center;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const Input = styled.input`
    border: 1px solid ${props => props.theme.color.border.primary};
    outline: none;
    padding: 0.5em 0em;
    font-size: 1.2rem;
    text-align: center;
    font-weight: 700;
    letter-spacing: 2px;
    background: transparent;
    width: 5rem;
    height: 5rem;
    border-radius: 99px;
    z-index: 2;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`
const Button = styled.button`
    border: none;
    padding: 0.4em 0.8em;
    background: ${props => props.theme.color.fill.primary};
    color: ${props => props.theme.color.background.primary};
`
const Display = styled.div`
    position: relative;
`
const Loader = styled.div`
    position: absolute;
    height: 100%;
    width: 50%;
    top: 0;
    background: yellow;
    z-index: 1;
`
const Watering = () => {
    const [duration, setDuration] = useState(0)
    const [running, setRunning] = useState(false)
    const handleClick = async () => {
        // stop instantly
        if (running){
            setDuration(0)
            setRunning(false)
            socket.emit("watering", "stop")
        }
        else {
            if (duration <= 0) alert("Nah")
            else {
                let systemMode = (await axios.get('/api/watering')).data
                if (systemMode === "IDLE") {
                    setRunning(true)
                    socket.emit("watering", "start")
                } else {
                    alert("The system is already watering")
                }
            }
        }
    }
    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (running)
                setDuration(duration - 1)
                if (duration === 1) {
                    setRunning(false)
                    socket.emit("watering", "stop")
                }
        }, 1000)
        return (() => {
            clearTimeout(timeOut)
        })
    })
    useEffect(() => {
        return (() => {
            if (running) {
                setRunning(false)
                socket.emit("watering", "stop")
            }
        })
    }, [])
    return (
            <Container>
                <Header text={'Tưới cây thủ công'} />
                <Body>
                    <Wrapper>
                        <Display>
                            <Input readOnly={running} type="number" value={duration} onChange={e => setDuration(e.target.value)}/>
                            <Loader/>
                        </Display>
                        <Button onClick={handleClick}>{running ? "Stop" : "Start"}</Button>
                    </Wrapper>
                </Body>
            </Container>
    )
}

export default Watering