import styled from "styled-components"
import Icon from "../Icon"
import {navigate} from '@reach/router'
const Container = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 0.5rem;
    background: ${props => props.theme.color.fill.primary};
    color: ${props => props.theme.color.background.primary};
    flex: 0 0 30%;
    display: flex;
    justify-content: center;
    align-items: stretch;
    padding: 0.5rem;
    
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