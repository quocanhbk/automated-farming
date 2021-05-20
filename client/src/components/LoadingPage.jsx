import styled from "styled-components"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`

const LoadingPage = () => {
    return (
        <Container>
            Loading
        </Container>
    )
}

export default LoadingPage