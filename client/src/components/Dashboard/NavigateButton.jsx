import styled from "styled-components"
import Icon from "../Icon"
import {navigate} from '@reach/router'
import { getFader } from "../../utils/color"

const Container = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 0.5rem;
    /* background: ${props => props.theme.color.fill.primary}; */
    background: ${props => "linear-gradient(to right," + props.theme.color.fill.primary + ", " + getFader(props.theme.color.fill.primary, 0.8) + ")"};
    color: ${props => props.theme.color.background.primary};
    flex: 0 0 30%;
    display: flex;
    justify-content: center;
    align-items: stretch;
    transition: background 1.5s ease-in-out;
    padding: 0.5rem;

    &:hover {
        background: ${props => "linear-gradient(to left," + props.theme.color.fill.primary + ", " + getFader(props.theme.color.fill.primary, 0.8) + ")"};
    }
    &:active {
        background: ${props => "linear-gradient(to left," + props.theme.color.fill.secondary + ", " + getFader(props.theme.color.fill.secondary, 0.8) + ")"};
    }
    &:before {
        content: "";
        display: table;
        padding-top: 100%;
    }
`
const Content = styled.div`
    flex-grow: 1;        
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;

    & p {
        font-size: 1rem;
    }
`

const NavigateButton = ({icon, path, text}) => {
    return (
        <Container onClick={() => navigate(path)}>
            <Content>
                <Icon ico={icon}/>
                <p>{text}</p>
            </Content>
        </Container>
    )
}

export default NavigateButton