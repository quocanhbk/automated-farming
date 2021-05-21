import styled from "styled-components"
import Header from "../Header"
import Switch from "react-switch"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getFader } from '../../utils/color'
import Redirector from '../Redirector'
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`
const Body = styled.div`
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    & .MuiSwitch-colorSecondary.Mui-checked {
        color: ${props => props.theme.color.fill.primary};
    }
`
const Text = styled.div`
    display: flex;  
    width: 75%;
    gap: 0.5rem;
    padding: 0.5rem 1rem    ;
    border-radius: 0.5rem;
    background: ${props => getFader(props.status === true ? props.theme.color.fill.success : props.status === false ? props.theme.color.fill.danger : props.theme.color.fill.warning, 0.1)};
    color: ${props => props.status === true ? props.theme.color.fill.success : props.status === false ? props.theme.color.fill.danger : props.theme.color.fill.warning};
    & p {
        margin: 0 auto;
       
        text-align:center;
    }
`
const Power = () => {
    const [checked, setChecked] = useState(true);
    const handleChange = nextChecked => {//nextchecked===true?setChecked(1):setChecked(0);nextCheck "react-switch" 
        setChecked(nextChecked);
        postData()
    };
    async function postData() {
        let status = checked ? "on" : "off"
        let data = { power: status }
        await axios.post("/api/power", data);
    }
    async function getData() {
        await axios("/api/power")
            .then((response) => {
                setChecked(response.data.power);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }
    useEffect(() => {
        getData()
    }, []);
    return (
        <Redirector >
        <Container>
            <Header text={'Bật/tắt hệ thống'} />
            <Body>
                <Text status={checked}><p> Hệ thống đang <span>{checked ? "bật" : "tắt"}</span> </p></Text>
                <Switch
                    onChange={handleChange}
                    checked={checked}
                    className="react-switch"
                />
            </Body>
        </Container>
        </Redirector >
    )
}

export default Power