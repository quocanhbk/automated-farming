import styled from "styled-components"
import { getFader } from "../../utils/color"
import React, { useEffect, useRef, useState } from 'react';
import Slider from "../Slider";
import axios from "axios";
import Loader from '../Loader'
import {FaReact} from 'react-icons/fa'
import {BsCheckCircle} from "react-icons/bs"
import Snackbar from "../Snackbar";
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 80%;
    overflow: hidden;
`
const MainContent = styled.div`
    display: flex;  
    flex-direction: column;    
    border-radius: 0.5rem;
    gap: 1rem;
    border: 1px solid ${props => props.theme.color.fill.primary};
    background: ${props => props.theme.color.background.primary};
    position: relative;
    overflow: hidden;
`

const Button = styled.button`
    background: ${props => "linear-gradient(to right," + props.theme.color.fill.primary + ", " + getFader(props.theme.color.fill.primary, 0.8) + ")"};
    color: ${props => props.theme.color.background.primary};
    border: none;
    outline: none;
    padding: 0.5rem 2rem;
    border-radius: 0.2rem;
    cursor: pointer;
    font-weight: 600;

    &:hover {
        background: ${props => "linear-gradient(to left," + props.theme.color.fill.primary + ", " + getFader(props.theme.color.fill.primary, 0.8) + ")"};
    }
    &:active {
        background: ${props => "linear-gradient(to left," + props.theme.color.fill.secondary + ", " + getFader(props.theme.color.fill.secondary, 0.8) + ")"};
    }
    &:disabled {
        background: ${props => "linear-gradient(to right," + getFader(props.theme.color.fill.primary, 0.4) + ", " + getFader(props.theme.color.fill.primary, 0.2) + ")"};
    }
`
const LabelWrapper = styled.div`
    text-align: center;
    width: 100%;
    padding: 0.5rem;
    color: ${props => props.theme.color.fill.secondary};
    font-weight: 600;
`
const ElementWrapper = styled.div`
    padding: 1rem;
`
const ButtonWrapper = styled.div`
    display:flex;
    flex-direction: row;
    gap: 1rem;
    align-items:center;
    justify-content: space-between;
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
const BoundForm = () => {
    const originalValue = useRef({top: null, bottom: null})
    const [top, setTop] = useState(100);
    const [bottom, setBottom] = useState(0);
    const [lastFocus, setLastFocus] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notify, setNotify] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            let data = (await axios.get('/api/humid')).data
            originalValue.current = {top: parseInt(data.top), bottom: parseInt(data.bottom)}
            setTop(originalValue.current.top)
            setBottom(originalValue.current.bottom)
            setLoading(false)
        }
        fetchData()
    }, [])


    useEffect(() => {
        if (top <= bottom && lastFocus === "top") setBottom(top - 1)
        else if (bottom >= top && lastFocus === "bottom") setTop(bottom + 1)
    }, [top, bottom, lastFocus])

    const postData = async () => {
        await axios.post('/api/humid', {top, bottom})
        originalValue.current = {top, bottom}
        setNotify(true)
    }
    const reset = () => {        
        setTop(originalValue.current.top)
        setBottom(originalValue.current.bottom)
    }
    return (
        <Container >
            <MainContent>
                {loading && <Loader><FaReact size="4rem"/></Loader>}
                <LabelWrapper>Ng?????ng tr??n</LabelWrapper>
                <ElementWrapper>
                    <Slider fullWidth value={top} onMouseDown={() => setLastFocus("top")} onChange={newValue => setTop(newValue < 1 ? 1 : newValue)}/>
                </ElementWrapper>
                <LabelWrapper>Ng?????ng d?????i</LabelWrapper>
                <ElementWrapper>
                    <Slider fullWidth value={bottom} onMouseDown={() => setLastFocus("bottom")} onChange={newValue => setBottom(newValue > 99 ? 99 : newValue)}/>
                </ElementWrapper>
            </MainContent>
            <ButtonWrapper>
                <Button onClick={postData} disabled={originalValue.current.top === top && originalValue.current.bottom === bottom}>L??u</Button>
                <Button onClick={reset} disabled={originalValue.current.top === top && originalValue.current.bottom === bottom}>H???y</Button>
            </ButtonWrapper>
            <Snackbar visible={notify} onClose={() => setNotify(false)} timeOut={1500}>
                <Notify>
                    <BsCheckCircle size="1.2rem"/>
                    <p>C???p nh???t ng?????ng th??nh c??ng !</p>
                </Notify>
            </Snackbar>
        </Container>
        

    );
}
export default BoundForm