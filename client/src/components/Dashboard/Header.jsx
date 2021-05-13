import styled from "styled-components"
import Icon from "../Icon"

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

const Header = () => {
    return (
        <Container>
                <Icon ico={'burger'}/>
            <h3>Hexagon Farming System</h3>
        </Container>
    )
}

export default Header