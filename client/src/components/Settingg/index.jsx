import { useEffect, useState } from "react"
import styled from "styled-components"
import Header from "../Header"
import NumPicker from "./NumPicker"
import React from 'react';
import axios from 'axios'
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

const Settingg = () => {
    const [setting, setSetting] = useState(50);
    
    const submitSetting = (value, e) => {        
        setSetting(value);
        postData(value);
    }    
    async function postData(value) {
        let data = { setting: value };
        const res = await axios.post("/api/setting", data);
        console.log(res.data);        
    }
    async function getData() {
        try {
            const res = await axios.get('/api/setting');
            setSetting(res.data.setting);
            console.log(res.data);  
        }
        catch (error) {
            console.error("Error fetching data: ", error);
        }
        
    }
    useEffect(() => {
        getData();

    }, []);

    return (
        <Container>
            <Header text={'Điều chỉnh công suất'} />
            <Body>                
                <NumPicker value={setting} submit={submitSetting} />
            </Body>
        </Container>
    )
}

export default Settingg