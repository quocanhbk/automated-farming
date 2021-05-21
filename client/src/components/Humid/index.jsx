import { useEffect, useState } from 'react'
import styled from "styled-components"
import Header from "../Header"
import BoundForm from "./BoundForm"
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

const Humid = () => {
    const [top, setTop] = useState(100);
    const [bottom, setBottom] = useState(50);
    const submitHumid = (e, upper, lower) => {
        e.preventDefault();
        setTop(upper);
        setBottom(lower);
        postData(upper, lower);
    }
    async function postData(upper, lower) {
        let data = { top: upper, bottom: lower }
        const res = await axios.post("/api/humid", data);
        console.log(res.data);        
    }
    async function getData() {
        try {
            const res = await axios.get("/api/humid");
            setTop(res.data.top);
            setBottom(res.data.bottom);
            console.log(res.data);
        }
        catch(error) {
            console.error("Error fetching data: ", error);
        }            
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <Container>
            <Header text={'Cập nhật ngưỡng'} />
            <Body>
                <BoundForm upper={top} lower={bottom} submit={submitHumid} />
            </Body>
        </Container>
    )
}

export default Humid