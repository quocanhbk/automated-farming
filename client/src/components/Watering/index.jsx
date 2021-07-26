/* eslint-disable react-hooks/exhaustive-deps */
import styled, { css, keyframes } from "styled-components"
import Header from "../Header"
import React, { useState, useEffect } from "react"
import socket from "../../socket"
import Snackbar from "../Snackbar"
import { BsFillExclamationCircleFill } from "react-icons/bs"
import { getFader } from "../../utils/color"

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
    color: ${(props) => props.theme.color.text.primary};
    font-family: "Roboto Mono";
    outline: none;
    border: none;
    font-size: 2rem;
    text-align: center;
    font-weight: 700;
    letter-spacing: 1px;
    background: transparent;
    width: 8rem;
    height: 8rem;
    border-radius: 99px;
    z-index: 2;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`
const Button = styled.button`
    background: ${(props) =>
        "linear-gradient(to right," +
        props.theme.color.fill.primary +
        ", " +
        getFader(props.theme.color.fill.primary, 0.8) +
        ")"};
    color: ${(props) => props.theme.color.background.primary};
    border: none;
    outline: none;
    padding: 0.5rem 2rem;
    border-radius: 0.2rem;
    cursor: pointer;
    font-weight: 600;

    &:hover {
        background: ${(props) =>
            "linear-gradient(to left," +
            props.theme.color.fill.primary +
            ", " +
            getFader(props.theme.color.fill.primary, 0.8) +
            ")"};
    }
    &:active {
        background: ${(props) =>
            "linear-gradient(to left," +
            props.theme.color.fill.secondary +
            ", " +
            getFader(props.theme.color.fill.secondary, 0.8) +
            ")"};
    }
    &:disabled {
        background: ${(props) =>
            "linear-gradient(to right," +
            getFader(props.theme.color.fill.primary, 0.4) +
            ", " +
            getFader(props.theme.color.fill.primary, 0.2) +
            ")"};
    }
`
const Display = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
`

const Notify = styled.div`
    padding: 1rem;
    background: ${(props) => props.theme.color.fill.danger};
    color: ${(props) => props.theme.color.background.primary};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
`
const spin = keyframes`
    from {transform: rotate(0deg)}
    to {transform: rotate(360deg)}
`
const Loader = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    transition: background 0.25s ease-in-out;
    background: ${(props) => getFader(props.theme.color.border.primary, 0.5)};
    border-radius: 99px;
    ${(props) =>
        props.running &&
        css`
            //background: ${(props) =>
                props.odd
                    ? getFader(props.theme.color.fill.primary, 0.2)
                    : getFader(props.theme.color.fill.secondary, 0.2)};
            border-top: 5px solid ${(props) => props.theme.color.fill.primary};
            border-bottom: 5px solid
                ${(props) => props.theme.color.fill.secondary};
            border-left: 5px solid
                ${(props) => props.theme.color.fill.secondary};
            border-right: 5px solid ${(props) => props.theme.color.fill.primary};
            //background: transparent;
            animation: ${spin} 1s linear 0s infinite forwards normal;
        `}
`
const Watering = () => {
    const [duration, setDuration] = useState(0)
    const [running, setRunning] = useState(false)
    const [notify, setNotify] = useState(false)
    const handleClick = async () => {
        // stop instantly
        if (running) {
            setDuration(0)
            setRunning(false)
            socket.emit("watering", "stop")
        } else {
            if (duration <= 0) return
            else socket.emit("watering", "start")
        }
    }
    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (running) setDuration(duration - 1)
        }, 1000)
        return () => {
            clearTimeout(timeOut)
        }
    })
    useEffect(() => {
        if (duration === 0) {
            console.log("Client Stop")
            setRunning(false)
            socket.emit("watering", "stop")
        }
    }, [duration])
    useEffect(() => {
        socket.on("watering", (message) => {
            if (message === "ok") setRunning(true)
            else if (message === "rejected") setNotify(true)
            else console.log("Something went wrong")
        })
        return () => {
            socket.emit("watering", "stop")
        }
    }, [])
    return (
        <Container>
            <Header text={"Tưới cây thủ công"} />
            <Body>
                <Wrapper>
                    <Display>
                        <Input
                            readOnly={running}
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                        <Loader running={running} odd={duration % 2 !== 0} />
                    </Display>
                    <Button onClick={handleClick}>
                        {running ? "Stop" : "Start"}
                    </Button>
                </Wrapper>
            </Body>
            <Snackbar
                visible={notify}
                onClose={() => setNotify(false)}
                timeOut={1000}
            >
                <Notify>
                    <BsFillExclamationCircleFill size="1.2rem" />
                    <p>Hệ thống đang tưới nước !</p>
                </Notify>
            </Snackbar>
        </Container>
    )
}

export default Watering
