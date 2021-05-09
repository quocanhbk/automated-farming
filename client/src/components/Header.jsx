import styled from "styled-components"
import Icon from "./Icon"
import {navigate} from '@reach/router'

const Container = styled.div`
    display: flex;
    padding: 0.5rem;
    align-items: center;
    background: ${props => props.theme.color.background.secondary};
    gap: 0.5rem;
    color: ${props => props.theme.color.fill.primary};
    & h3 {
        font-weight: 500;
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