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
    let [top, setTop] = useState(100);
    let [bottom, setBottom] = useState(50);
    const submitHumid = (upper, lower) => {
        setTop(upper)
        setBottom(lower)
        postData();
    }
    async function postData() {
        let data = { top: top, bottom: bottom }
        await axios.post("/api/humid", data);
    }
    async function getData() {
        await axios("/api/humid")
            .then((response) => {
                setTop(response.data.top);
                setBottom(response.data.bottom);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }
    useEffect(() => {
        getData()
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