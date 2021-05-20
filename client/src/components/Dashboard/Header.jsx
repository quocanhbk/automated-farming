import { useStoreActions, useStoreState } from "easy-peasy"
import styled from "styled-components"
import Icon from "../Icon"
import axios from 'axios'
import {useState} from 'react'
import useClickOutside from '../../hooks/useClickOutside'
const Container = styled.div`
    display: flex;
    padding: 0.5rem;
    align-items: center;
    position: relative;
    background: ${props => props.theme.color.background.secondary};
    gap: 0.5rem;
    color: ${props => props.theme.color.fill.primary};
    & h3 {
        font-weight: 500;
        font-size: 1.2rem;
        margin-bottom: 0.2rem;
        font-family: "Paytone One";
    }
`
const HeaderPopup = styled.div`
    width: calc(100% - 1rem);
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, calc(100% + 0.5rem));
    background: ${props => props.theme.color.background.secondary};
    border-radius: 0.5rem;
    border: 1px solid ${props => props.theme.color.border.primary};
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
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

    }
`
const Header = () => {
    let username = useStoreState(state => state.username)
    let setUser = useStoreActions(state => state.setUsername)
    const [popup, setPopup] = useState(false)
    const logout = async () => {
        setUser(null)
        await axios.get('/api/auth/logout')
        //navigate('/')
    }
    let ref = useClickOutside(() => setPopup(false))
    return (
        <Container ref={ref}>
            <Icon ico={'burger'} onClick={() => setPopup(!popup)}/>
            <h3>Smiley Farm</h3>
            {popup &&
                <HeaderPopup>
                    <p>{`Xin chào, ${username} !`}</p>
                    <button onClick={logout}>Đăng xuất</button>
                </HeaderPopup>
            }
        </Container>
    )
}

export default Header