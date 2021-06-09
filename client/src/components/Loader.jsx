import styled, { keyframes } from "styled-components"

const spin = keyframes`
    from {transform: rotate(0deg)}
    to {transform: rotate(360deg)}
`
const Container = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    color: ${props => props.theme.color.fill.secondary};
    background: ${props => props.theme.color.background[props.background || "primary"]};
    z-index: 5;
    & .auth-spin {
        animation: ${spin} 2s linear 0s infinite normal forwards;
        display: grid;
        place-items: center;
    }
`

const Loader = ({children}) => {
    return (
        <Container>
            <div className="auth-spin">{children}</div>
        </Container>
    )
}

export default Loader