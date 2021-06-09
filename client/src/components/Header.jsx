import styled from "styled-components"
import Icon from "./Icon"
import {navigate} from '@reach/router'
import { getFader } from "../utils/color"

const Container = styled.div`
    display: flex;
    padding: 0.5rem;
    align-items: center;
    background: ${props => "linear-gradient(to right," + props.theme.color.fill.primary + ", " + getFader(props.theme.color.fill.primary, 0.8) + ")"};
    gap: 0.5rem;
    font-weight: 700;
    color: ${props => props.theme.color.background.primary};
    & h3 {
        font-weight: 700;
        font-size: 1.2rem;
        margin-bottom: 0.2rem;
    }
`

const Header = ({text}) => {
    return (
        <Container>
            <Icon ico={'chevron-left'} onClick={() => navigate('/')}/>
            <h3>{text}</h3>
        </Container>
    )
}

export default Header