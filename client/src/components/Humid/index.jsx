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

const Humid = () => {
    return (
        <Container>
            <Header text={'Cập nhật ngưỡng'}/>
            <Body>
                Cập nhật ngưỡng
            </Body>
        </Container>
    )
}

export default Humid