import styled from "styled-components"
import Header from "../Header"
import Switch from "react-switch"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getFader } from '../../utils/color'
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
    background: ${props => getFader(props.mode === true ? props.theme.color.fill.success : props.mode === false ? props.theme.color.fill.danger : props.theme.color.fill.warning, 0.1)};
    color: ${props => props.mode === true ? props.theme.color.fill.success : props.mode === false ? props.theme.color.fill.danger : props.theme.color.fill.warning};
    & p {
        margin: 0 auto;
       
        text-align:center;
    }
`

const Mode = () => {
    const [checked, setChecked] = useState(true);
    const handleChange = nextChecked => {
        setChecked(nextChecked);
        postData()
    };
    async function postData() {
        let mode = checked?"auto":"handle"
        let data = { mode: mode }//
        await axios.post("/api/mode", data);
    }
    async function getData() {
        await axios("/api/mode")
            .then((response) => {
                setChecked(response.data.mode);
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
            <Header text={'Đổi chế độ tưới'} />
            <Body>
                <Text mode={checked}><p> Chế độ tưới: <span>{checked ? "Tự động" : "Thủ công"}</span> </p></Text>
                <Switch
                    onChange={handleChange}
                    checked={checked}
                    className="react-switch"
                />
            </Body>
        </Container>
    )
}

export default Mode