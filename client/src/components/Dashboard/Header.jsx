import { useStoreActions, useStoreState } from "easy-peasy"
import styled, { keyframes } from "styled-components"
import Icon from "../Icon"
import axios from 'axios'
import {useEffect, useState} from 'react'
import useClickOutside from '../../hooks/useClickOutside'
import { getFader } from "../../utils/color"
import ThemeToggle from '../Toggle'
const Container = styled.div`
    display: flex;
    padding: 0.5rem;
    align-items: center;
    position: relative;
    background: ${props => props.theme.color.fill.primary};
    background: ${props => "linear-gradient(to right," + props.theme.color.fill.primary + ", " + getFader(props.theme.color.fill.primary, 0.8) + ")"};
    gap: 0.5rem;
    z-index: 5;
    color: ${props => props.theme.color.background.primary};
    & h3 {
        font-weight: 500;
        font-size: 1.2rem;
        margin-bottom: 0.2rem;
        font-family: "Paytone One";
    }
`
const ani = keyframes`
    from {transform: translate(-50%, calc(100% - 1rem)); opacity: 0;}
    to {transform: translate(-50%, calc(100% + 0.5rem)); opacity: 1;}
`
const out = keyframes`
    from {transform: translate(-50%, calc(100% + 0.5rem)); opacity: 1;}
    to {transform: translate(-50%, calc(100% - 1rem)); opacity: 0;}
`
const HeaderPopup = styled.div`
    width: calc(100% - 2rem);
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, calc(100% + 0.5rem));
    background: ${props => props.theme.color.background.secondary};
    color: ${props => props.theme.color.fill.primary};
    border-radius: 0.5rem;
    border: 1px solid ${props => props.theme.color.border.primary};
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: ${props => props.isOut ? out : ani} 0.15s ease-in-out 0s 1 normal forwards;
    & p {
        font-size: 1.1rem;
        font-style: italic;
    }

    & button {
        background: transparent;
        outline: none;
        border: none;
        color: ${props => props.theme.color.fill.danger};
        border-radius: 0.2rem;
        padding: 0.2rem 0rem;
        cursor: pointer;
        font-family: Quicksand;
    }
`
const Header = () => {
    let username = useStoreState(state => state.username)
    let setUser = useStoreActions(state => state.setUsername)
    let theme = useStoreState(state => state.isDark)
    let setTheme = useStoreActions(state => state.setTheme)

    const [popup, setPopup] = useState(false)
    const [turnOn, setTurnOn] = useState(false)

    const logout = async () => {
        setUser(null)
        await axios.get('/api/auth/logout')
        //navigate('/')
    }
    useEffect(() => {
        if (turnOn) setPopup(true)
        else setTimeout(() => setPopup(false), 150)
    }, [turnOn])

    let ref = useClickOutside(() => setTurnOn(false))
    return (
        <Container ref={ref}>
            <Icon ico={'burger'} onClick={() => setTurnOn(!popup)}/>
            <h3>Smiley Farm</h3>
            <div style={{marginLeft: "auto"}}>
                <ThemeToggle value={theme} onChange={v => setTheme(v)}/>
            </div>
            
            {popup &&
                <HeaderPopup isOut={!turnOn}>
                    <p>{`Xin chào, ${username} !`}</p>
                    <button onClick={logout}>Đăng xuất</button>
                </HeaderPopup>
            }
        </Container>
    )
}

export default Header