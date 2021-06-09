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
    const originalValue = useRef()
    const [setting, setSetting] = useState(0);
    const [loading, setLoading] = useState(true)
    const [notify, setNotify] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            let data = (await axios.get('/api/setting')).data
            originalValue.current = parseInt(data.setting)
            setSetting(originalValue.current)
            setLoading(false)
        }
        fetchData()
    }, [])

    const postData = async () => {
        await axios.post('/api/setting', {setting})
        originalValue.current = setting
        setNotify(true)
    }
    const reset = () => {        
        setSetting(originalValue.current)
    }
    return (
        <Container >
            <MainContent>
                {loading && <Loader><FaReact size="4rem"/></Loader>}
                <LabelWrapper>Ngưỡng trên</LabelWrapper>
                <ElementWrapper>
                    <Slider fullWidth value={setting} onChange={newValue => setSetting(newValue)}/>
                </ElementWrapper>
            </MainContent>
            <ButtonWrapper>
                <Button onClick={postData} disabled={originalValue.current === setting}>Lưu</Button>
                <Button onClick={reset} disabled={originalValue.current === setting}>Hủy</Button>
            </ButtonWrapper>
            <Snackbar visible={notify} onClose={() => setNotify(false)} timeOut={1500}>
                <Notify>
                    <BsCheckCircle size="1.2rem"/>
                    <p>Điều chỉnh công suất thành công !</p>
                </Notify>
            </Snackbar>
        </Container>
        

    );
}
export default BoundForm