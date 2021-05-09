import styled from "styled-components"
import Header from "../Header"

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
    gap: 1rem;
`

const Settingg = () => {
    return (
        <Container>
            <Header text={'Điều chỉnh công suất'}/>
            <Body>
                Điều chỉnh công suất
            </Body>
        </Container>
    )
}

export default Settingg