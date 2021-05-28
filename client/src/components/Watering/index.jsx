import styled from "styled-components"
import Header from "../Header"
import React, { useState, useEffect } from 'react';
import { getFader } from "../../utils/color";
import axios from "axios"


const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
   
`
const Body = styled.div`
    flex: 1;
    padding: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    
`
const Wrapper = styled.div`
    
    display:flex;    
    flex-direction: column;
    gap: 0.7rem;
    padding: 0.2rem;
    align-items:center;
    height:20%;
    
    & input {
        width:100%;        
        background: transparent;
        border: 1px solid ${props => props.theme.color.border.primary};
        padding: 0.5rem;
        border-radius: 0.5rem;
        outline: none;
        color: ${props => props.theme.color.text.primary};
        transition: border 0.15s ease-in-out;
        &:focus {
            border: 1px solid ${props => props.theme.color.fill.primary};
        }
        &::-ms-reveal,
        &::-ms-clear {
        display: none;        
        }
        text-align:center;
        font-size: large;
    }
`
const Button = styled.button`
    display: block;    
    width:100%;    
    background: ${props => props.theme.color.fill.primary};
    color: ${props => props.theme.color.background.primary};
    border: none;
    outline: none;
    padding: 0.5em 0.5em;
    border-radius: 0.5rem;    
    font-size: large;
    &:hover {
        background: ${props => getFader(props.theme.color.fill.primary, 0.8)}
    }
`
const ProgessBar = styled.div`
    border-radius: 0.2rem;    
    display:flex;
    height:100%;
    width: 100%;    
    justify-content: center;  
    flex-direction:row;
    border: 1px solid ${props => getFader(props.theme.color.fill.primary, 0.4)};
`
const Progess = styled.div`
    display:flex;    
    background: ${props => getFader(props.theme.color.fill.primary, 0.4)};       
    border-radius: 0.5rem;
    outline: none;    
    padding: 0.45em;
    transition: border 0.15s ease-in-out;
    flex-direction: row;
    height:100%;
    width: ${props => props.x*100}%;
    max-width: 100%;    
    justify-content: center;     
    transition: width 800ms linear;
   
`



const Watering = () => {
    const [complete, setComplete] = useState(true);   
    const [duration, setDuration] = useState(0);
    const [timeLeft, setTimeLeft] = useState(duration);    
    const [progess, setProgess] = useState(0);
    const handleStop = (e) => {
        setDuration(timeLeft);
        //let data = { duration: duration };
        //await axios.post('url',data)
        window.location.reload();
    }    
    async function getData() {
        try {
            const res = await axios.get("/api/watering");
            setDuration(res.data);            
            console.log(res.data);
        }
        catch(error) {
            console.error("Error fetching data: ", error);
        }            
    }
    useEffect(() => {
        getData()        
        if (timeLeft < 0) {   

            setComplete(true);
            return;
        }
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
            setProgess(progess => parseInt(progess) + 1 - timeLeft / duration);
            
        }, 1000);
        return () => clearInterval(intervalId);

    }, [ timeLeft, progess, duration ]);

    return (
            <Container>
                <Header text={'Tưới cây thủ công'} />
                <Body>
                    {complete ?
                        <Wrapper>
                            <input type='text' name = 'Bat dau' onChange={(e) => setDuration(parseInt(e.target.value))}  placeholder="Nhập thời gian tưới..." />
                            <Button onClick={(e) => {
                                if (duration !== 0) {
                                    setTimeLeft(duration);
                                    setProgess(0);
                                    setComplete(false);
                                } else {
                                    window.location.reload()
                                }                            
                            }} >
                                Bắt đầu
                            </Button>
                        </Wrapper>
                        :
                        <Wrapper>
                            <ProgessBar>                            
                                <Progess x={progess}><h2>{timeLeft}</h2></Progess>                            
                            </ProgessBar>
                            <Button onClick={handleStop} > Ngừng   </Button>
                        </Wrapper>
                    }
                </Body>
            </Container>
    )
}

export default Watering